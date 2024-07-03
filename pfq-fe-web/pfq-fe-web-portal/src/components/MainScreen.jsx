import { useEffect, useState } from "react";

export const MainScreen = ({ username, socket }) => {
  const [messages, setMessages] = useState([]);
  const [body, setBody] = useState("");

  useEffect(() => {
    socket.emit("register", username);
  }, [username]);

  useEffect(() => {
    socket.on("receive-message", (msg) => {
      console.log(msg);
      setMessages((prevMessages) => {
        return [...prevMessages, msg];
      });
    });
    return () => {
      socket.off("receive-message");
    };
  }, [socket]);

  const sendMessage = () => {
    console.log(messages, "<<<<<<<<<<")
    const replyingTo = messages[0].from;
    if (body.trim() !== "") {
      socket.emit("send-admin-message", {
        body,
        replyingTo,
        sender: false,
        created_at: new Date().toLocaleTimeString(),
      });
      setBody("");
    }
  };

  return (
    <div>
      <h1>RESPOND</h1>
      {messages.map((msg) => {
        return (
          <div key={msg.created_at} className="admin-message">
            <p>Message: {msg.body}</p>
            <p>From: {msg.username ? msg.username : msg.from}</p>
            <p>Time: {msg.created_at}</p>
            {msg.category ? <p>Category: {msg.category}</p> : null}
            {msg.tableNum ? <p>Table No: {msg.tableNum}</p> : null}
          </div>
        );
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
