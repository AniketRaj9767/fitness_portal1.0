const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    messages: [
      {
        from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Messages = mongoose.model("Message", MessageSchema);

module.exports = Messages;

