


import React from 'react';
import { FaBuilding } from 'react-icons/fa';
import { FiHome, FiCheckSquare, FiUsers, FiSettings, FiLogOut, FiX } from 'react-icons/fi';
import { IoSettings } from 'react-icons/io5';
import { MdChat } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';


const Sidebar = ({isOpen , toggleSidebar}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Home', href: "/", icon: <FiHome /> },
    { name: 'Users', href: "/admin/users", icon: <FiUsers /> },
    { name: 'Training', href: "/admin/training", icon: <FiCheckSquare /> },
    { name: 'Organisation', href: "/admin/organisation", icon: <FaBuilding /> },
    { name: 'Chat', href: "/admin/chat", icon: <MdChat /> },
    { name: 'Settings', href: "/admin/setting", icon: <IoSettings /> },
  ];

  return (
    <div
    className={`fixed top-0 left-0 h-screen w-64 p-5 bg-white shadow-xl z-40 transition-transform duration-300 
    ${isOpen ? 'transform translate-x-0' : 'transform -translate-x-full'} md:translate-x-0 md:static`}
  >
    {/* Close button for mobile view */}
    <button
      onClick={toggleSidebar}
      className="absolute top-4 right-4 md:hidden"
    >
      <FiX size={24} />
    </button>

    <div className="mb-8 text-[#0077B5] inline-flex">
      <img src="/Vector2.png" alt="Logo" className="w-16 h-16" />
      <span className="text-2xl ml-2 font-bold font-[Inter] mt-2">JEDITECK</span>
    </div>
    <h2 className="text-gray-400 mr-32 font-medium mt-6">Overview</h2>
    <ul className="space-y-4 mt-4">
      {menuItems.map((item) => (
        <li
          key={item.name}
          onClick={() => {
            navigate(item.href);
            toggleSidebar(); // Close sidebar on item click in mobile view
          }}
          className={`flex items-center px-4 py-2 cursor-pointer rounded-full ${
            location.pathname === item.href
              ? 'bg-[#0077B5] text-white'
              : 'text-gray-700 hover:bg-[#0077B5] hover:text-white'
          }`}
        >
          <span className="mr-3">{item.icon}</span>
          <span className="font-bold">{item.name}</span>
        </li>
      ))}
    </ul>
    <div className="mt-28 flex flex-col gap-y-2">
      <h2 className="text-gray-400 mr-32 font-medium mb-3">Settings</h2>
      <button className="flex items-center text-black hover:text-gray-700">
        <FiSettings className="mr-3" /> Setting
      </button>
      <button onClick={()=>{ window.location.reload(), localStorage.removeItem("Token")}} className="flex items-center text-red-500 hover:text-red-700">
        <FiLogOut className="mr-3" /> Logout
      </button>
    </div>
  </div>
  );
};

export default Sidebar;
