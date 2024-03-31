import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";

function JoinChat({ onJoin }) {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Join Chat
      </Typography>
      <TextField
        label="User Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <TextField
        label="Room Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => onJoin(user, room)}
        style={{ marginTop: "20px" }}
      >
        Join
      </Button>
    </>
  );
}

JoinChat.propTypes = {
  onJoin: PropTypes.func.isRequired,
};

export default JoinChat;
