const jwt = require("jsonwebtoken");
const User = require("../model/User");

const socketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.headers.token.split("=")[1];
    const key = "Thisismykey@123";
    const decoded = jwt.verify(token, key);

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("User not found");
    }
    socket.user = user;
    next(); // Call next to continue with Socket.IO connection
  } catch (error) {
    console.error("Socket authentication error:", error);
  }
};

module.exports = socketAuth
