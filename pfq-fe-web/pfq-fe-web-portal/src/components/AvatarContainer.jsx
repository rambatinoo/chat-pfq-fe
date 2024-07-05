import { Avatar } from "@mui/material";

export function AvatarContainer({talkingTo}) {
    return <div id='avatar-container'>
        <div id='customer-avatar'>
            <Avatar sx={{ bgcolor: 'primary.main'}}>{talkingTo ? talkingTo[0]: ''}</Avatar>
            <h1>{talkingTo}</h1>
        </div>
    </div>
}