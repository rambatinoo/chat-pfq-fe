import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Skeleton,
  Avatar,
} from "@mui/material";
import { timeSince } from "../utils/TimeAgo";

export const MessagePreview = ({ msg, category, setTalkingTo, talkingTo }) => {
  const handleClick = (from) => {
    setTalkingTo(from);
  };

  if (msg.category === category || category === "All") {
    return (
      <div id="preview-container" onClick={() => handleClick(msg.from)}>
        <div id="preview-avatar">
          <Avatar
            sx={
              msg.sentiment === "positive"
                ? { bgcolor: "positive.main" }
                : { bgcolor: "error.main" }
            }
          >
            {msg.from[0].toUpperCase()}
          </Avatar>
        </div>
        <div id="message-preview">
          <p>{msg.body}</p>
        </div>
        <div id="message-preview-timestamp">
          <p>{timeSince(msg.created_at)}</p>
        </div>
      </div>
    );
  }

  return null;
};
