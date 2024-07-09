import { useEffect, useRef } from "react";
import { Message } from "./Message";

export function MessageThread({ conversationMessages }) {
  const messageThreadRef = useRef(null);

  useEffect(() => {
    if (messageThreadRef.current) {
      messageThreadRef.current.scrollTop =
        messageThreadRef.current.scrollHeight;
    }
  }, [conversationMessages]);

  return (
    <div id="message-thread" ref={messageThreadRef}>
      {conversationMessages.map((msg) => {
        return (
          <div key={msg.created_at}>
            <Message msg={msg} />
          </div>
        );
      })}
    </div>
  );
}
