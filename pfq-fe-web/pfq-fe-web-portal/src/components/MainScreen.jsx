import { useEffect, useState } from "react";

export const MainScreen = ({username, socket}) => {
  const [messages, setMessages] = useState([]);
  const [body, setBody] = useState("");

  useEffect(() => {
    socket.emit("register", username);
  }, [username]);

  useEffect(() => {
    socket.on("receive-message", (msg) => {
      console.log(msg);
      setMessages((prevMessages) => {
        return [msg, ...prevMessages];
      });
    });
    return () => {
      socket.off("receive-message");
    };
  }, [socket]);

  const sendMessage = () => {
    if (body.trim() !== "") {
      socket.emit("send-admin-message", {
        body,
        username,
        sender: true,
      });
      setBody("");
    }
  };

  return (
    <div>
        <h1>RESPOND</h1>
        {messages.map((msg) => {
            return (<div key={msg.created_at}><p>{msg.body}</p>
            {msg.tableNum ? <p>Table No: {msg.tableNum}</p> : null}
            </div>)
        })}
      <div></div>
      <div>
        <textarea
          placeholder="Message"
          onChange={(e) => {
            setBody(e.target.value);
          }}
          value={body}
        ></textarea>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};
