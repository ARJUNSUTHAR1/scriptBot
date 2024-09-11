import React from 'react';
import { IoMdSend } from "react-icons/io";


const ChatWindow = ({ user }) => {
  return (
    <div className="w-full p-4 flex flex-1 flex-col bg-white border-l-2 border-black">
      {user ? (
        <>
          <div className="flex border-b-2 justify-between">
          <div className=" pb-2">
            <h2 className="font-semibold text-xl">
              Chat with {user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <div>
          <button type="button" class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg  p-2.5 text-center me-2 mb-2 text-xl text-white">View Profile</button>

          </div>
          </div>
          <div className="flex-1 overflow-y-auto my-4">
            {/* Render chat history here */}
          </div>
          <div className="border-t pt-2 flex justify-between border-2 rounded-lg border-gray-500">
            <input type="text" placeholder="Write a message..." className="w-full p-2  focus:border-none focus:outline-none text-xl" />
            <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l font-medium rounded-lg text-sm p-2.5 text-center me-2 mb-2"><IoMdSend size={"2rem"}/></button>
            </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>Select a user to view the chat</p>
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
