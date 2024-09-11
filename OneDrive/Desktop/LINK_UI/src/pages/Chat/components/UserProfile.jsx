import React from 'react';
import { FaUser } from 'react-icons/fa';
import { FiLogOut, FiSettings } from 'react-icons/fi';

const UserProfile = ({ user }) => {
  return (
    <div className="relative w-1/4 h-full p-4 bg-white m-4 ml-0 border-black space-y-4">
      {user ? (
        <>
          <h2 className="font-semibold text-3xl text-gray-400">Profile</h2>
          <p className='text-2xl'><strong>Name:</strong> {user.name}</p>
          <p className='text-2xl'><strong>Email:</strong> {user.email}</p>
          <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xl p-2 text-center me-2 mb-2">Manage User</button>
          </>
      ) : (
        <p className="text-gray-500">No user selected</p>
      )}

<div className="absolute bottom-14 ml-6 flex flex-col gap-y-2">
        <div className="inline-flex text-xl space-x-2 text-gray-500 mb-2">
          <FiSettings size={"1.2rem"} />
          <h1 className="leading-5">Settings</h1>
        </div>{" "}
        <button className="flex items-center text-black hover:text-gray-700">
          <FaUser className="mx-3" /> Users
        </button>
        <button className="flex items-center text-red-500 hover:text-red-700">
          <FiLogOut className="mx-3" /> Logout
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
