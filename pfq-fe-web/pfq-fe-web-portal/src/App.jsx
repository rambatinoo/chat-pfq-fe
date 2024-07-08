import { useState } from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { Login } from "./components/Login";
import { MainScreen } from "./components/MainScreen";
import { io } from "socket.io-client";
import { green } from "@mui/material/colors";

const socket = io("https://chat-pfq-server.onrender.com");

const theme = createTheme({
  palette: {
    primary: {
      main: "#21409a",
    },
    secondary: {
      main: "#C1BFA7",
    },
    error: {
      main: "#E34C4C",
    },
    info: {
      main: "#E7E7E7",
    },
    success: {
      main: "#42D094",
    },
    warning: {
      main: "#F9D4AC",
    },
    positive: {
      main: "#07C404",
    },
  },
});

function App() {
  const [username, setUsername] = useState("");
  return (
    <ThemeProvider theme={theme}>

      <div className="app-container">
        {username ? (
          <MainScreen
            username={username}
            setUsername={setUsername}
            socket={socket}
          />
        ) : (
          <Login setUsername={setUsername} />
        )}

      </div>
    </ThemeProvider>
  );
}

export default App;
