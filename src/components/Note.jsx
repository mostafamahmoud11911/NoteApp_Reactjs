import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  IconButton,
  Typography,
  Tooltip,
  Modal,
  TextField,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNote,
  getAllNotes,
  updateNote,
  deleteNote,
} from "../redux/noteSlice";
import NoteItems from "./NoteItems";
import Loading from "./Loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #fff",
  boxShadow: 24,
  p: 4,
  borderRadius: "4px",
};

function Note() {
  // show modals
  const [openAddNote, setOpenAddNote] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const handleOpenAdd = () => setOpenAddNote(true);
  const handleCloseAdd = () => setOpenAddNote(false);
  // --------------------------

  // note

  const dispatch = useDispatch();
  const state = useSelector((state) => state.notes);
  const [note, setNote] = useState({ title: "", content: "" });
  const [update, setUpdateNote] = useState({ title: "", content: "" });
  const [id, setId] = useState("");

  function getNote(e) {
    const myNote = { ...note };
    myNote[e.target.name] = e.target.value;
    setNote(myNote);
  }

  function getUpdate(e) {
    const myNote = { ...update };
    myNote[e.target.name] = e.target.value;
    setUpdateNote(myNote);
  }

  function prevData(notes) {
    setUpdateNote({ ...notes, title: notes.title, content: notes.content });
  }

  useEffect(() => {
    dispatch(getAllNotes());
  }, []);

  function addMyNote(e) {
    e.preventDefault();
    dispatch(addNote({ title: note.title, content: note.content }));
    handleCloseAdd();
  }

  function submitUpdate(e) {
    e.preventDefault();
    dispatch(
      updateNote({
        _id: update._id,
        updatedData: { title: update.title, content: update.content },
      })
    );
    handleCloseUpdate();
  }

  function deleteMynote() {
    dispatch(deleteNote(id));
    handleCloseDelete();
  }

  return (
    <Container sx={{ mt: "2rem" }}>
      {state.loading ? (
        <Loading />
      ) : (
        <>
          <Button
            onClick={handleOpenAdd}
            variant="outlined"
            sx={{ my: "1rem" }}
          >
            Add New Note
          </Button>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
          >
            {state.notes.length > 0 ? (
              state.notes?.map((note) => (
                <NoteItems
                  key={note._id}
                  note={note}
                  handleOpenDelete={handleOpenDelete}
                  handleOpenUpdate={handleOpenUpdate}
                  prevData={prevData}
                  setId={setId}
                />
              ))
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  fontSize: "50px",
                }}
                component="h2"
              >
                No Notes Found
              </Box>
            )}
          </Grid>
        </>
      )}

      {/* add note */}
      <Modal
        open={openAddNote}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>Add new note</h1>
          <Box
            component="form"
            onSubmit={addMyNote}
            sx={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
          >
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              fullWidth
              name="title"
              onChange={getNote}
              required
            />
            <TextField
              id="outlined-basic"
              label="Content"
              variant="outlined"
              fullWidth
              name="content"
              onChange={getNote}
              required
            />
            <Button variant="outlined" type="submit">
              Add Note
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            color="error.main"
            variant="h6"
            component="h2"
          >
            Delete a Note
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: "2rem" }}>
            Do you want delete this note?
          </Typography>
          <Button
            onClick={deleteMynote}
            variant="outlined"
            color="error"
            sx={{ my: ".5rem" }}
          >
            Delete
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>Update note</h1>
          <Box
            component="form"
            onSubmit={submitUpdate}
            sx={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
          >
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              fullWidth
              name="title"
              value={update.title}
              onChange={getUpdate}
              required
            />
            <TextField
              id="outlined-basic"
              label="Content"
              variant="outlined"
              fullWidth
              name="content"
              value={update.content}
              onChange={getUpdate}
              required
            />
            <Button
              type="submit"
              variant="outlined"
              color="warning"
              sx={{ my: ".5rem" }}
            >
              Add Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
export default Note;
