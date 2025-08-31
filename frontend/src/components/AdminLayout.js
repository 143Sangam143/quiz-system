import React from "react";
import { Sidebar } from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import AdminHeader from "./AdminHeader";

export default function Layout({ 
  children,
  pageTitle = 'Admin Dashbaord',
  actionLabel,
  actionLink,
  backLabel,
  backLink
}) {
  const {user, logout} = useAuth();
  
  return (
    <>
      <Sidebar />
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Header */}
        <AdminHeader pageTitle={pageTitle} actionLabel={actionLabel} actionLink={actionLink} backLabel={backLabel} backLink={backLink} />

        {/* Page content */}
        <main className="flex-1 p-6 pt-2 bg-[#f5f2f2]">
          {children}
        </main>
      </div>
    </>
  );
}
