import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { ShortcutsModal } from '../common/ShortcutsModal';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

const KeyboardShortcutsProvider = ({ children }) => {
  const [showShortcuts, setShowShortcuts] = useState(false);
  useKeyboardShortcuts({ onToggleShortcutsModal: () => setShowShortcuts(p => !p) });
  return (
    <>
      {children}
      <ShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
    </>
  );
};

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-base relative overflow-hidden">
      {/* Background Mesh Gradient */}
      <div className="absolute inset-0 bg-gradient-mesh z-0 pointer-events-none opacity-50"></div>
      
      {/* Sidebar hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen relative z-10 pb-20 lg:pb-0">
        <Header />
        
        <KeyboardShortcutsProvider>
          {/* Main Content Area */}
          <main className="flex-1 mt-16 overflow-y-auto px-4 lg:px-8 pb-8">
            <Outlet />
          </main>
        </KeyboardShortcutsProvider>
      </div>

      {/* Bottom Nav on mobile */}
      <MobileNav />
    </div>
  );
};
