import { useEffect, useState } from "react";

import { getRequest } from "../../../../pfq-fe-native/src/utils/api";
import { sampleMessages } from "../../messagesData";
import { MessagePreview } from "./MessagePreview";


export const MainScreen = ({ username, socket }) => {
  const [AllMessages, setAllMessages] = useState(sampleMessages);
  const [conversationMessages, setConversationMessages] = useState([]);
  const [category, setCategory] = useState("All");
  const [talkingTo, setTalkingTo] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const getMessageThread = async () => {
      try {
        const messages = await getRequest("messages")
        const updatedMessages = messages.map((message) => {
          if (message.from === username.toLowerCase()) {
            message.sender = true
            return message
          } else {
            return message
          }
        })
        setAllMessages(updatedMessages)
      } catch (err) {
        console.log("Error:", err)
        throw err
      }
    }

    getMessageThread()
  }, [])

  useEffect(() => {
    socket.emit("register", username);
  }, [username]);

  useEffect(() => {
    socket.on("receive-message", (msg) => {
      console.log(msg);
      setAllMessages((prevMessages) => {
        return [msg, ...prevMessages];
      });
    });
    return () => {
      socket.off("receive-message");
    };
  }, [socket]);

  useEffect(() => {
    const filteredMessages = AllMessages.filter(
      (msg) => msg.from === talkingTo || msg.to === talkingTo
    );
    console.log(filteredMessages, "filtered messages");
    setConversationMessages(filteredMessages);
  }, [talkingTo, AllMessages]);

  console.log(conversationMessages);

  const handleClick = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
    setConversationMessages([]);
  };
  console.log(talkingTo);

  const sendMessage = () => {



    const replyingTo = conversationMessages[0].from;

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
    <div className="parent">
      <div id="column-1"></div>
      <div id="column-2">
        <button onClick={handleClick} value={"All"}>
          All
        </button>
        <button onClick={handleClick} value={"Service"}>
          Service
        </button>
        <button onClick={handleClick} value={"Food Quality"}>
          Food Quality
        </button>
        <button onClick={handleClick} value={"Staff"}>
          Staff
        </button>
        <button onClick={handleClick} value={"Price"}>
          Price
        </button>
        <button onClick={handleClick} value={"Ambience"}>
          Ambience
        </button>
        <button onClick={handleClick} value={"Cleanliness"}>
          Cleanliness
        </button>
        <button onClick={handleClick} value={"Location"}>
          Location
        </button>
        <button onClick={handleClick} value={"Menu"}>
          Menu
        </button>
        <button onClick={handleClick} value={"Drinks"}>
          Drinks
        </button>
        <button onClick={handleClick} value={"Waiting Time"}>
          Waiting Time
        </button>
        <button onClick={handleClick} value={"Reservation Process"}>
          Reservation Process
        </button>
        <button onClick={handleClick} value={"Outdoor Seating"}>
          Outdoor Seating
        </button>
        <button onClick={handleClick} value={"Events & Catering"}>
          Events & Catering
        </button>
        <button onClick={handleClick} value={"Special Dietary Needs"}>
          Special Dietary Needs
        </button>
      </div>
      <div id="column-3">
        {AllMessages.map((msg) => {
          return (
            <MessagePreview
              key={msg.created_at}
              msg={msg}
              setTalkingTo={setTalkingTo}
              category={category}
            />
          );
        })}
      </div>
      <div id="column-4">
        <h1>RESPOND</h1>
        {conversationMessages.map((msg) => {
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
    </div>
  );
};
