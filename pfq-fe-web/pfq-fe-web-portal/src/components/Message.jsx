import { Chip } from "@mui/material";
import { timeSince } from "../utils/TimeAgo";

export function Message({ msg }) {
  const formattedCategory = msg.category
    ? `${msg.category[0]}${msg.category.slice(1, msg.category.length)}`
    : undefined;

  return (
    <div
      id="message"
      key={msg.created_at}
      className="admin-message"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        id="bubble-container"
        style={{
          display: "flex",
          justifyContent: msg.to === "admin" ? "flex-start" : "flex-end",
        }}
      >
        <div id="bubble">
          <div id="speech-bubble">
            <Chip
              sx={{
                height: "auto",
                "& .MuiChip-label": {
                  display: "block",
                  whiteSpace: "normal",
                  padding: "0.5rem",
                },
                fontSize: "1.25rem",
                maxWidth: "33vw",
                padding: "0.25vh 0.5vw",
              }}
              label={msg.body}
            />
          </div>
          <div id="category-container">
            {msg.category ? (
              <p className="bubble-info">
                about <p id="message-category">{formattedCategory}</p>
              </p>
            ) : (
              <p className="bubble-info">Category unknown</p>
            )}
          </div>
          <div id="timestamp-container">
            {msg.created_at ? (
              <p className="bubble-info">{timeSince(msg.created_at)}</p>
            ) : (
              <p className="bubble-info">Time unknown</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
