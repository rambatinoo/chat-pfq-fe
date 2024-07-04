import { Avatar, Chip } from "@mui/material";
import { AvatarContainer } from "../components/AvatarContainer";
import { MessageComposer } from "../components/MessageComposer";

export function MessageView({
  talkingTo,
  body,
  sendMessage,
  conversationMessages,
  setBody,
}) {
  return (
    <div id="column-4">
      <AvatarContainer talkingTo={talkingTo} />
      <div style={{ height: "91vh", overflow: "scroll" }}>
        {conversationMessages.map((msg) => {
          return (
            <div
              key={msg.created_at}
              className="admin-message"
              style={{
                display: "flex",
                justifyContent: msg.to === "admin" ? "flex-start" : "flex-end",
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
      <MessageComposer
        sendMessage={sendMessage}
        body={body}
        setBody={setBody}
      />
    </div>
  );
}
