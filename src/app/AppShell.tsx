import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { SidebarNav } from '../components/SidebarNav';
import { MobileDrawer } from '../components/MobileDrawer';
import { BottomActions } from '../components/BottomActions';

export function AppShell() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <TopBar onMenuClick={() => setIsDrawerOpen(true)} />
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      
      <div className="flex flex-1 overflow-hidden">
        <SidebarNav />
        
        <main className="flex-1 overflow-y-auto p-4 pb-20 lg:ml-64 lg:p-8">
          <div className="mx-auto max-w-3xl">
            <Outlet />
          </div>
        </main>
      </div>
      
      <BottomActions />
    </div>
  );
}
