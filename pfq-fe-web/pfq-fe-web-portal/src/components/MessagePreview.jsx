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
      <Avatar>{talkingTo}</Avatar>
      <p>{msg.body.length > 30 ? msg.body.slice(0, 25) + "..." : msg.body}</p>
      <p>{timeSince(msg.created_at)}</p>
    </div>

    ;
  }
};
