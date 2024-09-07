import React from "react";
import { FaCircle, FaCircleNotch, FaUser } from "react-icons/fa";
import { IoChatbubblesSharp } from "react-icons/io5";



const UserList = ({ users, onSelectUser }) => {
  return (
    <div className="w-[30%] relative bg-gray-100 shadow rounded-xl mt-2" style={{ fontFamily: "Plus Jakarta Sans" }}>
      <div className="mt-2 p-7">
        <div className="inline-flex text-xl space-x-2 text-gray-500">
          <FaCircleNotch size={"1.2rem"} />
          <h1 className="leading-5">Open</h1>
        </div>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user)}
            className="cursor-pointer p-2 mt-2 rounded hover:bg-gray-100"
          >
            <div className="flex justify-between">
              <p className="font-medium text-xl">{user.name}</p>
              <p className="text-sm text-gray-500">{user.date}</p>
            </div>
            <p className="text-md text-gray-600">{user.lastMessage}</p>
          </div>
        ))}
      </div>
      <div className="mt-2 p-7">
        <div className="inline-flex text-xl space-x-2 text-gray-500">
          <FaCircle size={"1.2rem"} />
          <h1 className="leading-5">Close</h1>
        </div>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user)}
            className="cursor-pointer p-2 mt-2 rounded hover:bg-gray-100 "
          >
            <div className="flex justify-between">
              <p className="font-medium text-xl">{user.name}</p>
              <p className="text-sm text-gray-500">{user.date}</p>
            </div>
            <p className="text-md text-gray-600">{user.lastMessage}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
