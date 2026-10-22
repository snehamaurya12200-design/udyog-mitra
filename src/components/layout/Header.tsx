import React from 'react';
import { ActiveTab, BusinessProfile } from '../../types/business';
import { Store, SlidersHorizontal, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  profile: BusinessProfile;
  onOpenPresets: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  profile,
  onOpenPresets,
  mobileMenuOpen,
  onToggleMobileMenu,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectTab('dashboard')}
              className="text-left group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                उ
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-amber-700 transition-colors whitespace-nowrap block">
                  Udyog Mitra
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'dashboard'
                  ? 'border-amber-600 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onSelectTab('assistant')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'assistant'
                  ? 'border-amber-600 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              AI Assistant
            </button>
            <button
              onClick={() => onSelectTab('marketing')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'marketing'
                  ? 'border-amber-600 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              Marketing Hub
            </button>
            <button
              onClick={() => onSelectTab('insights')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'insights'
                  ? 'border-amber-600 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              Business Insights
            </button>
            <button
              onClick={() => onSelectTab('profile')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeTab === 'profile'
                  ? 'border-amber-600 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              Business Profile
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenPresets}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Switch demo business profile presets"
            >
              <Store className="w-3.5 h-3.5 text-slate-600" />
              <span>Presets</span>
            </button>

            <button
              onClick={() => onSelectTab('profile')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{profile.businessName ? 'Manage Profile' : 'Setup Profile'}</span>
            </button>

            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          <div className="pb-2 border-b border-slate-100">
            <p className="text-xs font-medium text-slate-500">Active Business</p>
            <p className="text-sm font-semibold text-slate-900 truncate">
              {profile.businessName || 'Configure Your Business'}
            </p>
            <p className="text-xs text-slate-500">
              {profile.ownerName ? `Owner: ${profile.ownerName}` : 'No profile configured'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-1">
            <button
              onClick={() => {
                onSelectTab('dashboard');
                onToggleMobileMenu();
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === 'dashboard' ? 'bg-amber-50 text-amber-900 font-semibold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                onSelectTab('assistant');
                onToggleMobileMenu();
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === 'assistant' ? 'bg-amber-50 text-amber-900 font-semibold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              AI Assistant
            </button>
            <button
              onClick={() => {
                onSelectTab('marketing');
                onToggleMobileMenu();
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === 'marketing' ? 'bg-amber-50 text-amber-900 font-semibold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Marketing Hub
            </button>
            <button
              onClick={() => {
                onSelectTab('insights');
                onToggleMobileMenu();
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === 'insights' ? 'bg-amber-50 text-amber-900 font-semibold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Business Insights
            </button>
            <button
              onClick={() => {
                onSelectTab('profile');
                onToggleMobileMenu();
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === 'profile' ? 'bg-amber-50 text-amber-900 font-semibold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Business Profile Setup
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={() => {
                onOpenPresets();
                onToggleMobileMenu();
              }}
              className="w-full py-2 text-center text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
            >
              Load Sample Business Presets
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
