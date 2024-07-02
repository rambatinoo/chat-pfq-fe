export const addCategory = async (msg) => {
  msg.category = "Service";
  console.log(msg, "this is the message from the machine learning");
  return msg;
};
