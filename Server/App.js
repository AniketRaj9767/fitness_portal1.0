const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Authrouter = require("./routes/auth");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const socketAuth = require("./middleware/socketAuth");
const User = require("./model/User");
const Chat = require("./model/Chat");
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
const {
  createchatroom,
  createMessage,
  getChatsWithMessages,
  GetAllMessages,
} = require("./services/chatServices");
//Routes
app.use("/", Authrouter);

const config = {
  DB: "mongodb://localhost:27017/fitness",
  PORT: 5000,
};

// Chat Configuratino
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.use((socket, next) => {
  socketAuth(socket, (error) => {
    if (error) {
      next(new Error("Socket Connection Authentication failed"));
    } else {
      next();
    }
  });
});

io.on("connection", (socket) => {
  socket.join(socket.user.id);
  console.log("Connection Request: ", socket.user.id);
  //send new message. Here we are inintilizing the chat for obtaining Chatid
  socket.on("chat", async (to) => {
    const from = socket.user.id;
    const chats = await Chat.findOne({
      $or: [
        { $and: [{ from: from }, { to: to }] },
        { $and: [{ from: to }, { to: from }] },
      ],
    });

    if (chats) {
      io.emit("", chats._id);
    } else {
      const newChat = new Chat({ from, to });
      await newChat.save();
      socket.join(newChat._id);
      io.emit("chatroom-created", newChat._id);
    }
  });

  //Fetch Single Chat
  socket.on("fetchChat", async (chatId) => {
    try {
      console.log("Request to fetch chat with: ", chatId);
      const id = socket.user.id;
      const MessagesList = await getChatsWithMessages(chatId);
      io.to(socket.user.id).emit("Chatlist", MessagesList);
    } catch (error) {
      console.error("Error fetching and emitting chats:", error);
    }
  });

  //fetch All Chatrooms
  socket.on("fetchallchats", async () => {
    console.log("Fetch All Chats Req");
    try {
      const id = socket.user.id;
      const user = await User.findOne({ _id: id }).select({ role: 1 });
      const chats = await Chat.find({
        $or: [{ from: id }, { to: id }],
      })
        .populate({ path: "from", select: { name: 1, role: 1 } })
        .populate({ path: "to", select: { name: 1, role: 1 } });
      console.log("Emitting All Chats");
      io.emit("All_Chats", { data: chats });
    } catch (error) {
      console.error("Error fetching and emitting chats:", error);
    }
  });

  socket.on("message", async ({ message, chatId }) => {
    console.log("Send Message Req");

    const newMessage = {
      from: socket.user._id,
      text: message,
    };
    const chat = await Chat.findOne({ _id: chatId });
    if (!chat) {
      const to = chatId;
      const uid = newMessage.from;
      const newChat = await createchatroom(uid, to);
      io.to(newMessage.from).emit("new-chat", { chatId: newChat._id });
      io.to(to).emit("new-chat", { chatId: newChat._id });

      const msg = await createMessage(newMessage.text, newChat._id);

      io.to(to).emit("receive-message", newMessage.text);
      io.to(chat.from).emit("receive-message", newMessage.text);
    } else {
      await createMessage(newMessage, chatId);
      console.log("This is TO: ", chat.to.toString());
      const otherUser =
        chat.from.toString() != newMessage.from
          ? chat.from.toString()
          : chat.to.toString();
      // io.to(chat.from.toString()).emit("receive-message", newMessage.text);
      io.to(otherUser).emit("receive-message", newMessage.text);
    }
  });

  socket.on("fetchMessages", async ({ chatId }) => {
    const chat = await Chat.findOne({ _id: chatId });
    await createMessage(newMessage, chatId);
    io.to(socket.user.id.toString()).emit("receive-message", newMessage.text);
  });

  socket.on("disconnect", () => {
    console.log("Socket Disconnecting");
  });
});

//

mongoose.connect(config.DB, {}).then(() => {
  server.listen(config.PORT, () => {
    console.log(`Server Listening on port ${config.PORT}`);
  });
});
