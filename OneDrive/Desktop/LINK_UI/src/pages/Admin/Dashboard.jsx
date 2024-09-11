import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex" style={{ fontFamily: "Plus Jakarta Sans" }}>
    <button
      onClick={toggleSidebar}
      className="fixed top-4 left-4 z-50 md:hidden" // Only show on small screens
    >
      <FiMenu size={24} />
    </button>

    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

    <div className="flex-1 flex flex-col md:ml-64 p-5">
      <Topbar />
    </div>
  </div>
  );
};

export default AdminDashboard;


