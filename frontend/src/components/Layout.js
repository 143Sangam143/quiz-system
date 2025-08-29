import React from "react";
import { Sidebar } from "./Sidebar";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const {user, logout} = useAuth();
  const handleLogout = async () => {
    try{
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }

  }
  return (
    <>
      <Sidebar />
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center">
              <h2 className="ml-4 text-lg font-semibold text-gray-900 lg:ml-0">
                Dashboard
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.name || user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

    </>
  );
}
