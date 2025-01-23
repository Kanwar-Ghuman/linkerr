import React from "react";

const AdminDashboard = () => {
  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <h1 className="text-2xl font-bold mb-6 text-black">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-black">
        <div className="p-4 bg-blue rounded-lg shadow">
          <h2 className="font-semibold mb-2">Total Users</h2>
          <p className="text-2xl">0</p>
        </div>

        <div className="p-4 bg-blue rounded-lg shadow bg-black">
          <h2 className="font-semibold mb-2">Active Links</h2>
          <p className="text-2xl">0</p>
        </div>

        <div className="p-4  rounded-lg shadow bg-black">
          <h2 className="font-semibold mb-2">Total Clicks</h2>
          <p className="text-2xl">0</p>
        </div>
      </div>

      <div className=" rounded-lg shadow p-6 bg-black">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="text-gray-500">No recent activity</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
