import { useEffect, useState } from "react";
import React from "react";
import { getRequest } from "../../../../pfq-fe-native/src/utils/api";
import { sampleMessages } from "../../messagesData";
import { MessagePreview } from "./MessagePreview";
import { ButtonGroup, Chip } from "@mui/material";
import { Button } from "@mui/material";

export const MainScreen = ({ username, socket }) => {
  const [AllMessages, setAllMessages] = useState([]);
  const [conversationMessages, setConversationMessages] = useState([]);
  const [category, setCategory] = useState("All");
  const [talkingTo, setTalkingTo] = useState("");
  const [body, setBody] = useState("");
  const [nonAdminMessages, setNonAdminMessages] = useState([]);
  const [allCategorys, setAllCategorys] = useState([]);

  useEffect(() => {
    const getMessageThread = async () => {
      try {
        const messages = await getRequest("messages");
        const updatedMessages = messages.map((message) => {
          if (message.from === username.toLowerCase()) {
            message.sender = true;
            return message;
          } else {
            return message;
          }
        });
        setAllMessages(updatedMessages);
      } catch (err) {
        console.log("Error:", err);
        throw err;
      }
    };

    getMessageThread();
  }, []);

  useEffect(() => {
    socket.emit("register", username);
  }, [username]);

  useEffect(() => {
    socket.on("receive-message", (msg) => {
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
    setConversationMessages(filteredMessages);
  }, [talkingTo, AllMessages]);

  useEffect(() => {
    const filteredMessages = AllMessages.filter((msg) => msg.from !== "admin");
    setNonAdminMessages(filteredMessages);
  }, [AllMessages]);

  const handleClick = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
    setTalkingTo("");
  };

  const sendMessage = () => {
    const replyingTo = conversationMessages[0].from;

    if (body.trim() !== "") {
      socket.emit("send-admin-message", {
        body,
        replyingTo,
        sender: false,
        created_at: new Date(),
      });
      setBody("");
    }
  };
  useEffect(() => {
    let categoryList = AllMessages.reduce((acc, message) => {
      if (message.category) {
        if (!acc[message.category]) {
          acc[message.category] = 0;
        }
        acc[message.category]++;
      }
      return acc;
    }, {});
    setAllCategorys(Object.keys(categoryList));
    console.log(categoryList);
  }, [AllMessages]);

  console.log(AllMessages);
  return (
    <div className="parent" style={{ height: "95vh" }}>
      <div id="column-1">

    
    <img
    src=""
    >
    
    </img>


      </div>
      <div id="column-2">
        <Button
          onClick={handleClick}
          value={"All"}
          variant={category === "All" ? "contained" : "outlined"}
          sx={{
            margin: "5px",
            padding: "5px",
            color: category === "All" ? "white" : "black",
            backgroundColor:
              category === "All" ? "#21409a" : "transparent",
          }}
        >
          All
        </Button>
        {allCategorys.map((categoryItem) => {
          return (
            <Button
              key={categoryItem}
              variant={category === categoryItem ? "contained" : "outlined"}
              onClick={handleClick}
              value={categoryItem}
              sx={{
                margin: "5px",
                padding: "5px",
                color: category === categoryItem ? "white" : "black",
                backgroundColor:
                  category === categoryItem ? "#21409a" : "transparent",
              }}
            >
              {categoryItem}
            </Button>
          );
        })}
      </div>
      <div id="column-3" style={{ overflow: "scroll" }}>
        {nonAdminMessages.map((msg) => {
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
        <h1>Replying to {talkingTo}</h1>
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
        <div style={{ height: "80vh", overflow: "scroll" }}>
          {conversationMessages.map((msg) => {
            return (
              <div
                key={msg.created_at}
                className="admin-message"
                style={{
                  display: "flex",
                  justifyContent:
                    msg.to === "admin" ? "flex-start" : "flex-end",
                }}
              >
                <div>
                  <Chip
                    sx={{
                      height: "auto",
                      "& .MuiChip-label": {
                        display: "block",
                        whiteSpace: "normal",
                        padding: "0.5rem",
                      },
                      maxWidth: "60%",
                    }}
                    label={msg.body}
                  />
                </div>
                <div style={{ display: "flex" }}>
                  {msg.category ? <p>Category: {msg.category}</p> : null}
                  {msg.tableNum ? <p>Table No: {msg.tableNum}</p> : null}
                  {msg.table ? <p>Table No: {msg.table}</p> : null}
                </div>
                <p>Time: {msg.created_at}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
