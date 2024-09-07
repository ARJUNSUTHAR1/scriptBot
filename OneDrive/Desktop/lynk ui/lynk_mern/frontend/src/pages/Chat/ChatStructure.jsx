import React, { useState } from "react";
import UserList from "./components/UserList.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Topbar from "../Admin/components/Topbar.jsx";
import Sidebar from "../Admin/components/Sidebar.jsx";
import { IoChatbubblesSharp } from "react-icons/io5";

const ChatStructure = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const users = [
    {
      id: 1,
      name: "Lizzy Kaur",
      email: "lizzykoder@aol.com",
      lastMessage: "Hi, we’re not currently online...",
      chat: [
        /* chat data here */
      ],
      date: "July 21",
    },
    {
      id: 2,
      name: "Indramohan Sahadevan",
      email: "indramohan@xyz.com",
      lastMessage: "Our products ship from California...",
      chat: [
        /* chat data here */
      ],
      date: "Aug 20",
    },
    {
      id: 3,
      name: "Mihir Nebani",
      email: "mihir@aol.com",
      lastMessage: "Hi, we’re not currently online...",
      chat: [
        /* chat data here */
      ],
      date: "July 21",
    },
    // Add more users
  ];

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex" style={{ fontFamily: "Plus Jakarta Sans" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64 p-5">
        <Topbar />
        <div className="p-6">
          <div className="flex justify-between">
            <div className="flex-col">
              <div className="inline-flex w-full p-7 space-x-4">
                <IoChatbubblesSharp size={"2rem"} />
                <h1 className="font-semibold text-3xl mb-4 leading-7 uppercase tracking-tight">
                  Lync Support
                </h1>
              </div>
              <p className="ml-20 -mt-7 leading-3">Web Version 2.0</p>
            </div>
          </div>
          <div className="flex mt-4">
            <UserList users={users} onSelectUser={handleUserSelect} />
            <ChatWindow user={selectedUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatStructure;
