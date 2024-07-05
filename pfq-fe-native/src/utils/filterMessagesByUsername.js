export const filterMessagesByUsername = (messageArr, username) => {
  const filteredMessages = [];

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
