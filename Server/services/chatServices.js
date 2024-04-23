const Chat = require("../model/Chat");
const Messages = require("../model/Messages");

const createchatroom = (uid, to) => {
  return new Promise((resolve, reject) => {
    (async () => {
      const newchat = new Chat({ from: uid, to: to });
      await newchat.save();
      resolve(newchat);
    })();
  });
};

const createMessage = (messages, chatId) => {
  return new Promise((resolve, reject) => {
    (async () => {
      const newchat = Messages.findOneAndUpdate(
        { chatId },
        { $push: { messages } },
        { new: true, upsert: true }
      );
      resolve(newchat);
    })();
  });
};

getChatsWithMessages = (chatId) => {
  return new Promise((resolve, reject) => {
    (async () => {
      const messages = await Messages.findOne({ chatId:chatId });

      resolve(messages);
    })();
  });
};

GetAllMessages = (chatId) => {
  return new Promise((resolve, reject) => {
    (async () => {
      const messages = await Messages.findOne({
        chatId,
      });
      resolve(messages);
    })();
  });
};

module.exports = {
  createchatroom,
  createMessage,
  getChatsWithMessages,
  GetAllMessages,
};
