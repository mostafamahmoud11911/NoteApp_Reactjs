import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// get All Note
export const getAllNotes = createAsyncThunk(
  "notes/getAllNotes",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        {
          headers: {
            token: localStorage.getItem("user"),
          },
        }
      );
      return data?.notes;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// add Note
export const addNote = createAsyncThunk(
  "notes/addNote",
  async (notesData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        notesData,
        {
          headers: {
            token: localStorage.getItem("user"),
          },
        }
      );

      return data.note;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// delete note
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (noteId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
        {
          headers: {
            token: localStorage.getItem("user"),
          },
        }
      );
      return { re: data, id: noteId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// update note
export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ _id, updatedData }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axios.put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${_id}`,
        updatedData,
        {
          headers: {
            token: localStorage.getItem("user"),
          },
        }
      );
      return data.note;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  notes: [],
  loading: false,
  error: "",
};

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllNotes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = action.payload;
      state.error = "";
    });
    builder.addCase(getAllNotes.rejected, (state, action) => {
      state.loading = false;
      state.notes = [];
      state.error = action.error.message;
    });
    builder.addCase(addNote.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.loading = false;
      state.notes.push(action.payload);
      state.error = "";
    });
    builder.addCase(addNote.rejected, (state, action) => {
      state.loading = false;
      state.notes = [];
      state.error = action.error.message;
    });
    builder.addCase(deleteNote.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = state.notes.filter(
        (note) => note._id !== action.payload.id
      );
      state.error = "";
    });
    builder.addCase(deleteNote.rejected, (state, action) => {
      state.loading = false;
      state.notes = [];
      state.error = action.error.message;
    });
    builder.addCase(updateNote.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      state.loading = false;
      const noteIndex = state.notes.findIndex(
        (note) => note._id === action.payload._id
      );
      if (noteIndex !== -1) {
        state.notes[noteIndex] = action.payload;
      }
      state.error = "";
    });
    builder.addCase(updateNote.rejected, (state, action) => {
      state.loading = false;
      state.notes = [];
      state.error = action.error.message;
    });
  },
});

export const notesReducer = noteSlice.reducer;
