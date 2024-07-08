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
          <Avatar sx={{ bgcolor: "secondary.main" }}>{talkingTo}</Avatar>
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
