import React from "react";
import { Outlet } from "react-router-dom";
import NavBarAdmin from "../Admin/NavBarAdmin/NavBarAdmin";

const LayoutAdmin = () => {
  return (
    <div>
      <NavBarAdmin />
      <main className="px-4 md:px-6 mt-6 pb-6 md:pb-3">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAdmin;
