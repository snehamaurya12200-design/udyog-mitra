import React from 'react';
import { UiTranslations } from '../../types/language';
import { Home, ClipboardList, Clock, SlidersHorizontal } from 'lucide-react';

export type MobileTab = 'home' | 'tasks' | 'history' | 'settings';

interface AndroidBottomBarProps {
  activeTab: MobileTab;
  onSelectTab: (tab: MobileTab) => void;
  translations: UiTranslations;
}

export const AndroidBottomBar: React.FC<AndroidBottomBarProps> = ({
  activeTab,
  onSelectTab,
  translations,
}) => {
  const tabs: {
    key: MobileTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      key: 'home',
      label: translations.navHome,
      icon: Home,
    },
    {
      key: 'tasks',
      label: translations.navTasks,
      icon: ClipboardList,
    },
    {
      key: 'history',
      label: translations.navHistory,
      icon: Clock,
    },
    {
      key: 'settings',
      label: translations.navSettings,
      icon: SlidersHorizontal,
    },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Bottom Navigation"
      className="w-full shrink-0 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0.75rem))] pt-1"
    >
      {/* Floating Pill-like Bottom Bar */}
      <div
        role="tablist"
        aria-label="Application Tabs"
        className="w-full max-w-sm mx-auto bg-white/95 backdrop-blur-xl rounded-full border border-stone-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)] grid grid-cols-4 p-1.5"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const Icon = tab.icon;

          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? 'page' : undefined}
              aria-label={tab.label}
              onClick={() => onSelectTab(tab.key)}
              className="group flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-full select-none outline-none focus-visible:ring-2 focus-visible:ring-amber-500/30 transition-all active:scale-95"
            >
              {/* Floating Pill Active Indicator */}
              <div
                className={`w-12 h-7 sm:w-14 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 ease-out ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-xs shadow-amber-500/30 ring-1 ring-amber-600/30'
                    : 'bg-transparent text-stone-400 group-hover:bg-stone-100/70 group-hover:text-stone-700'
                }`}
              >
                <Icon
                  className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-200 ${
                    isActive ? 'scale-105 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                  aria-hidden="true"
                />
              </div>

              {/* Accessible text label below icon */}
              <span
                className={`text-[10px] sm:text-[11px] mt-0.5 leading-tight tracking-tight text-center truncate max-w-full px-0.5 transition-colors duration-200 ${
                  isActive
                    ? 'font-bold text-stone-900'
                    : 'font-medium text-stone-500 group-hover:text-stone-800'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
