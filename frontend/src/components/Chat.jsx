import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import PropTypes from "prop-types";

function Chat({ user, room }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("http://localhost:5225/chat")
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.invoke("JoinRoom", user, room);
          /*  fetchHistoricalMessages(room); */
          connection.on("ReceiveMessage", (user, message) => {
            setMessages((messages) => [...messages, { user, message }]);
          });
        })
        .catch((err) => console.error("Connection failed: ", err));
    }
  }, [connection]);

  /* const fetchHistoricalMessages = async (room) => {
    try {
      const response = await fetch(
        `http://localhost:7079/api/Messages/${room}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch historical messages");
      }
      const historicalMessages = await response.json();
      setMessages(historicalMessages);
    } catch (error) {
      console.error("Error fetching historical messages:", error);
    }
  }; */

  const sendMessage = async () => {
    if (message && connection) {
      await connection.invoke("SendMessage", user, room, message);
      setMessage("");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        Room: {room}
      </Typography>
      <Box sx={{ overflow: "auto", mb: 2 }}>
        <List>
          {messages.map((m, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${m.user}: ${m.message}`} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          sx={{ mb: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={sendMessage}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
}

Chat.propTypes = {
  user: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
};

export default Chat;
