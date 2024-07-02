export const filterMessagesByUsername = (messageArr, username) => {
  const filteredMessages = [];
  console.log(
    messageArr,
    "this is the array from the filter messages function"
  );
  messageArr.forEach((message) => {
    if (
      message.from.toLowerCase() === username.toLowerCase() ||
      message.to.toLowerCase() === username.toLowerCase()
    ) {
      filteredMessages.push(message);
    }
  });
  return filteredMessages;
};
