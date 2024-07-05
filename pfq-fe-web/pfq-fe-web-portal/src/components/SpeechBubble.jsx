import { Chip } from "@mui/material";
import { timeSince } from "../utils/TimeAgo";

export function SpeechBubble({ userType, msg }) {

    const formattedCategory = msg.category
    ? `${msg.category[0]}${msg.category.slice(1, msg.category.length)}`
    : undefined;

    if (userType === "admin") {

    }

    return <div id="bubble">
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
              color={userType === "admin" ? "info" : "primary"}
            />
          </div>
          {userType === 'admin' ? (
            <div id="category-container">
            {msg.category ? (
              <p className="bubble-info">{formattedCategory}</p>
            ) : (
              <p className="bubble-info">Category unknown</p>
            )}
          </div>
          ) : (
            null
          )}
          <div id="timestamp-container">
            {msg.created_at ? (
              <p className="bubble-info">{timeSince(msg.created_at)}</p>
            ) : (
              <p className="bubble-info">Time unknown</p>
            )}
          </div>
        </div>
}