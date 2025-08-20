import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className='layout-container'>
      {/* Sidebar */}
      <div className='sidebar'>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className='main-content'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
