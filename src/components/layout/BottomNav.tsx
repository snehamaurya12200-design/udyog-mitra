import React from 'react';
import { ActiveTab } from '../../types/business';
import {
  LayoutDashboard,
  BotMessageSquare,
  Megaphone,
  BarChart3,
  Building2,
} from 'lucide-react';

interface BottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const tabs: { tab: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { tab: 'assistant', label: 'Assistant', icon: <BotMessageSquare className="w-5 h-5" /> },
    { tab: 'marketing', label: 'Marketing', icon: <Megaphone className="w-5 h-5" /> },
    { tab: 'insights', label: 'Insights', icon: <BarChart3 className="w-5 h-5" /> },
    { tab: 'profile', label: 'Profile', icon: <Building2 className="w-5 h-5" /> },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((item) => {
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => onSelectTab(item.tab)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg min-h-[48px] min-w-[56px] transition-colors ${
                isActive ? 'text-amber-700 font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className={isActive ? 'text-amber-600' : 'text-slate-500'}>{item.icon}</div>
              <span className="text-[10px] mt-1 whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
