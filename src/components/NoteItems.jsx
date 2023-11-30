import React from "react";
import {
  Box,
  Grid,
  Paper,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function NoteItems({
  note,
  handleOpenDelete,
  prevData,
  handleOpenUpdate,
  setId,
}) {
  return (
    <Grid item md={3}>
      <Paper
        sx={{
          p: "1rem",
          backgroundColor: "#2196f3",
          color: "#fff",
          wordBreak: "break-all",
          overflow: "auto",
          height: "250px",
        }}
      >
        <Box sx={{ textAlign: "end" }}>
          <Tooltip title="Update">
            <IconButton
              color="inherit"
              onClick={() => {
                prevData(note);
                handleOpenUpdate();
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              color="inherit"
              onClick={() => {
                handleOpenDelete();
                setId(note._id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography mb={2} variant="h4">
          {note.title}
        </Typography>
        <Typography variant="h6">{note.content}</Typography>
      </Paper>
    </Grid>
  );
}

export default React.memo(NoteItems);
