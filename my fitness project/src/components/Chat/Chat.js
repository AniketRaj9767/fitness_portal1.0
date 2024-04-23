import React, { Component, useEffect, useState } from "react";
import Send_Icon from "../../assets/icons/Send_icon.png";
import UserIcon from "../../assets/icons/left-arrow.png";
import io from "socket.io-client";
import { useSelector } from "react-redux";
var nextId = 0;
function Chat() {
  const token = document.cookie;
  const socket = io("http://localhost:5000", {
    extraHeaders: {
      token: token,
    },
  });
  const MUser = useSelector((state) => state.user);
  const MainBartender = MUser.payload.usr._id;
  const [sendmessage, setsendmessage] = useState();
  const [activeChatComp, setactiveChatComp] = useState();
  const [typemsg, settypemsg] = useState("");
  const [socketid, setsocketid] = useState();
  const [loading, setloading] = useState(false);
  const [messages, setmessages] = useState([]);
  const [ChatUsers, setChatUsers] = useState([]);
  const [newUser, setnewUser] = useState();

  useEffect(() => {
    socket.on("connect", () => {
      setsocketid(socket.id);
      setloading(false);
      fetchChatrooms();
      console.log("Socket ID: ", socket.id);
    });

    socket.on("All_Chats", (data) => {
      const transformedUsers = data.data.map((d, index) => ({
        _id: d._id,
        to: d.from._id == MainBartender ? d.to._id : d.from._id,
        name: d.from._id == MainBartender ? d.to.name : d.from.name,
      }));
      setChatUsers(transformedUsers);
    });

    socket.on("Chatlist", (data) => {
      const transformedMsg = data.messages.map((msg) => ({
        from: msg.from,
        text: msg.text,
      }));
      setmessages(transformedMsg);
    });

    socket.on("receive-message", (data) => {
    console.log(data);
    recallMessage()
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);


  const AddUser = () => {
    const to = newUser;
    socket.emit("chat", to);
    setsendmessage("chat");
  };

  const handleSendMessage = () => {
    const data = {
      message: typemsg,
      chatId: activeChatComp._id,
    };
    socket.emit("message", data);
  };
  const recallMessage= () => {
    const data = {
      message: typemsg,
      chatId: activeChatComp._id,
    };
    socket.emit("message", data);
  };

  const handleComponentMessages = (e) => {
    setactiveChatComp(e);
    socket.emit("fetchChat", e._id);
  };

  const fetchChatrooms = () => {
    socket.emit("fetchallchats");
  };

  if (!loading) {
    return (
      <div className="w-full flex ">
        <div className="w-[25%] p-4 bg-sky-200">
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={newUser}
                onChange={(e) => setnewUser(e.target.value)}
                onKeyPress={(e) => (e.key == "Enter" ? AddUser() : "")}
              />
            </label>
          </div>
          <h1>Users List</h1>
          {ChatUsers.length > 0
            ? ChatUsers.map((user) => {
                return (
                  <div
                    key={user._id}
                    className=" items-center flex "
                    onClick={() => handleComponentMessages(user)}
                  >
                    <div className="avatar online">
                      <div className="w-10 rounded-full">
                        <img src={UserIcon} />
                      </div>
                    </div>
                    <h1 className="font-bold text-xl h-fit ">{user.name}</h1>
                  </div>
                );
              })
            : ""}
        </div>
        <div className="w-[100%]">
          {activeChatComp != null ? (
            <div>
              <div className="h-[70%]">
                {messages.map((msg) => {
                  if (msg.from == MainBartender) {
                    return (
                      <div className="chat chat-end">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img
                              alt="Tailwind CSS chat bubble component"
                              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            />
                          </div>
                        </div>
                        <div className="chat-bubble">
                         {msg.text}
                        </div>
                      </div>
                    );
                  }else{
                    return (
                      <div className="chat chat-start">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img
                              alt="Tailwind CSS chat bubble component"
                              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            />
                          </div>
                        </div>
                        <div className="chat-bubble">
                         {msg.text}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <div>
                <input
                  type="text"
                  className="pl-2"
                  placeholder="Enter You Message"
                  value={typemsg}
                  onChange={(e) => settypemsg(e.target.value)}
                />
                <img
                  src={Send_Icon}
                  className="size-10 w-fit"
                  onClick={() => handleSendMessage()}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <h1 className="text-3xl font-bold">
                Select User to Start Chatting
              </h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Chat;
