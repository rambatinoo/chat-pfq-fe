import { Message } from "./Message";

export function MessageThread({ conversationMessages }) {
    return <div id="message-thread">
        {conversationMessages.map((msg) => {
          return (
              <div>
                <Message msg={msg}/>
              </div>
          );
        })}
      </div>
}