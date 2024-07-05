import { SpeechBubble } from "./SpeechBubble";

export function Message({ msg }) {

    let userType

    if (msg) {
        userType = msg.to === "admin" ? "admin" : "user"
    } else {
        userType = ''
    }

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
        <SpeechBubble userType={userType} msg={msg}/>
      </div>
    </div>
  );
}
