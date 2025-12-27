import React, { useState } from 'react';
import { LayoutDashboard, MessageSquare, Activity, User } from 'lucide-react';
import { AppView } from '../types';

interface LayoutProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, onChangeView, children }) => {
  
  const NavButton = ({ view, icon: Icon, label }: { view: AppView, icon: any, label: string }) => {
    const isActive = currentView === view;
    return (
      <button 
        onClick={() => onChangeView(view)}
        className={`flex flex-col items-center justify-center space-y-1 w-full h-full relative ${isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-300'}`}
      >
        <div className={`relative p-1 transition-all ${isActive ? '-translate-y-1' : ''}`}>
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            {isActive && <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(0,242,255,0.8)]"></div>}
        </div>
        <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-0'}`}>{label}</span>
      </button>
    );
  };

  return (
    <div className="h-screen w-full bg-black text-white overflow-hidden flex flex-col font-sans">
      <main className="flex-1 relative overflow-hidden">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="h-[80px] w-full bg-[#0a0a0a] border-t border-white/5 flex items-center justify-around px-2 pb-2 backdrop-blur-lg fixed bottom-0 left-0 z-50">
        <NavButton view={AppView.DASHBOARD} icon={LayoutDashboard} label="Durum" />
        <NavButton view={AppView.TRAINING} icon={Activity} label="Antrenman" />
        <NavButton view={AppView.AI_COACH} icon={MessageSquare} label="AI Koç" />
        <NavButton view={AppView.SETTINGS} icon={User} label="Profil" />
      </nav>
    </div>
  );
};

export default Layout;