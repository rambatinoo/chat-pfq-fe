import { MessagePreview } from "../components/MessagePreview";

export function PreviewsView({ nonAdminMessages, setTalkingTo, category }) {
    return <div id="column-3" style={{ overflow: "scroll" }}>
    {nonAdminMessages.map((msg) => {
      return (
        <MessagePreview
          key={msg.created_at}
          msg={msg}
          setTalkingTo={setTalkingTo}
          category={category}
        />
      );
    })}
  </div>
}