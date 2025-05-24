import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { PageBreadcrumb } from './PageBreadcrumb';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <PageBreadcrumb />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
