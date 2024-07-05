export function MessageComposer({sendMessage, body, setBody}) {
    return <form id='message-composer'>
    <input
      placeholder="Message"
      onChange={(e) => {
        setBody(e.target.value);
      }}
      value={body}
    ></input>
    <button type='submit' onClick={sendMessage}>Send</button>
  </form>
}