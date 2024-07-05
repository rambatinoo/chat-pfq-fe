import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { timeSince } from "../utils/TimeAgo";
import { Avatar } from "@mui/material";
import { AvatarContainer } from "./AvatarContainer";

export const MessagePreview = ({ msg, category, setTalkingTo, talkingTo }) => {
  console.log(talkingTo, "fromMessagePreview")

  const handleClick = (from) => {
    setTalkingTo(from);
  };

  if (msg.category === category || category === "All") {
    return <div 
      id='preview-container'
      onClick={() => handleClick(msg.from)}
      >
        <div id='preview-avatar'>
          <Avatar sx={{ bgcolor: 'secondary.main'}}>{talkingTo}</Avatar>
        </div>
        <div id='message-preview'>
          <p>{msg.body}</p>
        </div>
        <div id='message-preview-timestamp'>
          <p>{timeSince(msg.created_at)}</p>
        </div>
    </div>

    ;
  }
};
