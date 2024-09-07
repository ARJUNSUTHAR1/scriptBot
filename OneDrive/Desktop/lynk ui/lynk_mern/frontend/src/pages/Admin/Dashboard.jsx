import React from 'react';
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'

const AdminDashboard = () => {
  return (
    <div className="flex" style={{ fontFamily: "Plus Jakarta Sans" }}
>
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64 p-5">
        <Topbar />
      </div>
    </div>
  );
};

export default AdminDashboard;
