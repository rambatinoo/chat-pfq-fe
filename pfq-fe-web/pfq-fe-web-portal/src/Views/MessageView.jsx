import { Avatar, Chip } from "@mui/material";
import { AvatarContainer } from "../components/AvatarContainer";
import { MessageComposer } from "../components/MessageComposer";
import { MessageThread } from "../components/MessageThread";

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
      <MessageThread conversationMessages={conversationMessages}/>
      <MessageComposer
        sendMessage={sendMessage}
        body={body}
        setBody={setBody}
      />
    </div>
  );
}
