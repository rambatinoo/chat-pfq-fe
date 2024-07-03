import { useState } from 'react'
import './App.css'
import { Login } from './components/Login'
import { MainScreen } from './components/MainScreen';
import { io } from "socket.io-client";

const socket = io("https://chat-pfq-server.onrender.com");

function App() {
  const [username, setUsername] = useState("");
  return (
    <div className='app-container'>
      {username ? (<MainScreen username={username} socket={socket}/>) : ( <Login setUsername={setUsername}/>)}
    </div>
  )
}

export default App
