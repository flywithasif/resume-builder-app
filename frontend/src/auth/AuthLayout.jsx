import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#E7F6F2] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl border border-[#A5C9CA]">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
