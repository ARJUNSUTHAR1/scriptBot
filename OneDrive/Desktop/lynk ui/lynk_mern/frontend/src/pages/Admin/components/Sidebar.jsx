


import React from 'react';
import { FaBuilding } from 'react-icons/fa';
import { FiHome, FiCheckSquare, FiUsers, FiLogOut, FiSettings } from 'react-icons/fi';
import { IoSettings } from 'react-icons/io5';
import { MdChat } from "react-icons/md";
import { TbArrowBigDownLines } from "react-icons/tb";
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Home', href: "/admin", icon: <FiHome /> },
    { name: 'Users', href: "/admin/users", icon: <FiUsers /> },
    { name: 'Training', href: "/admin/training", icon: <FiCheckSquare /> },
    { name: 'Organisation', href: "/admin/organisation", icon: <FaBuilding /> },
    { name: 'Chat', href: "/admin/chat", icon: <MdChat /> },
    { name: 'Settings', href: "/admin/setting", icon: <IoSettings /> },
  ];

  return (
    <div className="w-64 h-screen p-5 shadow-xl flex flex-col fixed top-0 left-0 bg-white z-50">
      <div className="mb-8 text-purple-600 inline-flex">
        <img src='/Vector.png' alt="Logo"/>
        <span className='text-2xl ml-4 font-bold font-[Inter]'>LYNK</span>
      </div>
      <h2 className='text-gray-400 mr-32 font-medium mt-6'>Overview</h2>
      <ul className="space-y-4 mt-4">
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => {
              navigate(item.href);
            }}
            className={`flex items-center px-4 py-2 cursor-pointer rounded-full ${
              location.pathname === item.href
                ? 'bg-purple-600 text-white'
                : 'text-gray-700 hover:bg-purple-600 hover:text-white'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span className='font-bold'>{item.name}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-col gap-y-2">
        <h2 className='text-gray-400 mr-32 font-medium mb-3'>Settings</h2>
        <button className="flex items-center text-black hover:text-gray-700">
          <FiSettings className="mr-3" /> Setting
        </button>
        <button className="flex items-center text-red-500 hover:text-red-700">
          <FiLogOut className="mr-3" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
