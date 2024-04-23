import React from "react";
import Logo from "../../assets/icons/profile_logo.jpg";
import Chat from "../Chat/Chat";
function Dasboard() {
  return (
    <div className="w-full h-[100vh] flex">
      <div className="w-[20%] mt-2 h-[90vh] bg-blue-200 justify-center items-center rounded-[25px] p-10">
        <div>
          <div className="flex flex-col h-[100%] w-[100%]">
            <p className="text-2xl">
              <img src={Logo} className="size-28 rounded-[50%]" />
            </p>
            <p className="text-2xl font-semibold">Chat</p>
            <p className="text-2xl font-semibold">Members</p>
            <p className="text-2xl font-semibold">Trainers</p>
            <p className="text-2xl font-semibold">Contact</p>{" "}
            <p className="text-2xl font-semibold">Logout</p>
          </div>
        </div>
      </div>
      <div className="Components w-full ml-2"><Chat/></div>
    </div>
  );
}

export default Dasboard;
