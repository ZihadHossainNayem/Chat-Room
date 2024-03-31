import { useState } from "react";
import Chat from "./components/Chat";
import JoinChat from "./components/JoinChat";
import { CssBaseline, Container, Box } from "@mui/material";

function App() {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = (userName, roomName) => {
    setUser(userName);
    setRoom(roomName);
    setJoined(true);
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          background: "linear-gradient(to right, #e6f7ff, #ffffff)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container component="main" maxWidth="sm">
          {!joined ? (
            <JoinChat onJoin={handleJoin} />
          ) : (
            <Chat user={user} room={room} />
          )}
        </Container>
      </Box>
    </>
  );
}

export default App;
