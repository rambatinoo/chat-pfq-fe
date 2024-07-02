import { useState } from 'react'
import './App.css'
import { Login } from './components/Login'
import { MainScreen } from './components/MainScreen';
import { io } from "socket.io-client";

const socket = io("http://localhost:6969");

function App() {
  const [username, setUsername] = useState("");
  return (
    <div className='app-container'>
      {username ? (<MainScreen username={username} socket={socket}/>) : ( <Login setUsername={setUsername}/>)}
    </div>
  )
}

export default App
