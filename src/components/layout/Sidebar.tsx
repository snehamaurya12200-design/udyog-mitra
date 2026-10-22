import React from 'react';
import { ActiveTab, BusinessProfile, CATEGORY_OPTIONS } from '../../types/business';
import {
  LayoutDashboard,
  BotMessageSquare,
  Megaphone,
  BarChart3,
  Building2,
  Store,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { getProfileCompleteness } from '../../services/storage';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  profile: BusinessProfile;
  onOpenPresets: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  profile,
  onOpenPresets,
}) => {
  const categoryMeta = CATEGORY_OPTIONS.find((c) => c.value === profile.category);
  const { score } = getProfileCompleteness(profile);

  const navItems: { tab: ActiveTab; label: string; icon: React.ReactNode; phaseBadge?: string }[] = [
    {
      tab: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      tab: 'assistant',
      label: 'AI Assistant',
      icon: <BotMessageSquare className="w-4 h-4" />,
      phaseBadge: 'Phase 2',
    },
    {
      tab: 'marketing',
      label: 'Marketing Hub',
      icon: <Megaphone className="w-4 h-4" />,
      phaseBadge: 'Phase 3',
    },
    {
      tab: 'insights',
      label: 'Business Insights',
      icon: <BarChart3 className="w-4 h-4" />,
      phaseBadge: 'Phase 3',
    },
    {
      tab: 'profile',
      label: 'Business Profile',
      icon: <Building2 className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col border-r border-slate-200 bg-white min-h-[calc(100vh-4rem)] p-4">
      {/* Active Business Snapshot */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 mb-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
            {profile.businessName ? profile.businessName.charAt(0).toUpperCase() : 'U'}
          </div>
          <button
            onClick={onOpenPresets}
            className="text-[11px] font-semibold text-slate-500 hover:text-amber-700 transition-colors flex items-center gap-1 shrink-0 mt-0.5"
            title="Switch demo profile presets"
          >
            <Store className="w-3 h-3" />
            <span>Switch</span>
          </button>
        </div>

        <h3 className="font-semibold text-sm text-slate-900 truncate">
          {profile.businessName || 'Your Business Name'}
        </h3>

        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
          <span className="truncate">{profile.ownerName || 'Owner'}</span>
          {profile.city && (
            <>
              <span aria-hidden="true">·</span>
              <span>{profile.city}</span>
            </>
          )}
        </div>

        <div className="text-[11px] text-slate-600 font-medium mt-1 truncate">
          {categoryMeta?.label || 'Small Business'}
        </div>

        {/* Profile Completeness Meter */}
        <div className="mt-3 pt-2.5 border-t border-slate-200/60">
          <div className="flex items-center justify-between text-[11px] text-slate-600 mb-1">
            <span>Profile Readiness</span>
            <span className="font-mono font-semibold tabular-nums text-slate-900">{score}%</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                score === 100
                  ? 'bg-emerald-600'
                  : score >= 60
                  ? 'bg-amber-600'
                  : 'bg-slate-500'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-1 flex-1">
        <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
          Workspaces
        </div>
        {navItems.map((item) => {
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => onSelectTab(item.tab)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left group ${
                isActive
                  ? 'bg-amber-600 text-white shadow-xs font-semibold'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </div>
              {item.phaseBadge && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded transition-colors whitespace-nowrap ${
                    isActive ? 'bg-amber-700/80 text-amber-100' : 'text-slate-400 bg-slate-100'
                  }`}
                >
                  {item.phaseBadge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Core Principle Footer Callout */}
      <div className="mt-auto pt-4 border-t border-slate-200">
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-xs">
          <div className="flex items-center gap-1.5 text-slate-900 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Guiding Principle</span>
          </div>
          <p className="text-slate-600 font-medium text-[11px] leading-relaxed">
            ASK <span className="text-slate-400">→</span> UNDERSTAND <span className="text-slate-400">→</span> ANALYSE <span className="text-slate-400">→</span> ACT
          </p>
          <p className="text-[11px] text-slate-500 mt-1.5">
            Designed for non-technical small-business owners.
          </p>
        </div>
      </div>
    </aside>
  );
};
