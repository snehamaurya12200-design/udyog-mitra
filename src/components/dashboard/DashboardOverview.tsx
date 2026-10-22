import React from 'react';
import { ActiveTab, BusinessProfile, CATEGORY_OPTIONS, CURRENCY_SYMBOLS } from '../../types/business';
import { getProfileCompleteness } from '../../services/storage';
import {
  Store,
  BotMessageSquare,
  Megaphone,
  BarChart3,
  Building2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  TrendingUp,
  Target,
  Users,
} from 'lucide-react';

interface DashboardOverviewProps {
  profile: BusinessProfile;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenPresets: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  profile,
  onSelectTab,
  onOpenPresets,
}) => {
  const categoryMeta = CATEGORY_OPTIONS.find((c) => c.value === profile.category);
  const { score, pendingItems } = getProfileCompleteness(profile);
  const currencySymbol = CURRENCY_SYMBOLS[profile.currency] || '₹';

  const categoryChecklists: Record<string, string[]> = {
    kirana_grocery: [
      'Confirm daily dairy and fresh bread deliveries',
      'Send WhatsApp morning staples broadcast to apartment societies',
      'Review slow-moving pulses and packaged snack expiry dates',
    ],
    fashion_apparel: [
      'Prepare weekend showcase on storefront & WhatsApp status',
      'Follow up on custom tailoring pending fittings',
      'Highlight newly arrived seasonal fabrics & festive wear',
    ],
    services_repair: [
      'Notify customers whose serviced devices are ready for pickup',
      'Check stock of high-demand screen displays and batteries',
      'Audit today’s cash vs UPI collections before closing',
    ],
    food_restaurant_bakery: [
      'Morning raw material stock check (flour, butter, dairy)',
      'Prepare today’s lunch & evening special item promotions',
      'Track peak customer rush hours and prep timing',
    ],
    other: [
      'Review primary customer inquiries received today',
      'Send scheduled service or delivery updates',
      'Record daily gross revenue and critical raw material costs',
    ],
  };

  const dailyTasks = categoryChecklists[profile.category] || categoryChecklists.other;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-amber-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              <span>PHASE 1 FOUNDATION ACTIVE</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">Ready for Core Experience</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Namaste, {profile.ownerName || 'Business Owner'}!
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl">
              Welcome to <strong className="text-slate-900 font-semibold">{profile.businessName || 'your business companion'}</strong>. Udyog Mitra is designed to make daily business decisions simple, fast, and data-backed.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onSelectTab('profile')}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            >
              Edit Profile
            </button>
            <button
              onClick={() => onSelectTab('assistant')}
              className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors whitespace-nowrap shadow-xs flex items-center gap-1.5"
            >
              <span>Explore AI Assistant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Profile Completeness Alert / Callout */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm font-mono shrink-0">
              {score}%
            </div>
            <div>
              <p className="font-semibold text-slate-900">
                Business Profile Readiness
              </p>
              <p className="text-slate-500">
                {score === 100
                  ? 'Your profile is 100% complete. AI responses will be precision-tailored.'
                  : `Complete remaining fields (${pendingItems.slice(0, 2).join(', ')}) for optimal AI accuracy.`}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenPresets}
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 hover:underline shrink-0 text-left sm:text-right"
          >
            Try Kirana / Boutique / Repair Presets →
          </button>
        </div>
      </div>

      {/* Quick Action Matrix */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Core Workspaces
          </h2>
          <span className="text-xs text-slate-400">Select any tool to navigate</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Action 1: AI Assistant */}
          <button
            onClick={() => onSelectTab('assistant')}
            className="p-5 rounded-xl border border-slate-200 bg-white hover:border-amber-500 hover:shadow-xs transition-all text-left flex flex-col justify-between group h-full"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <BotMessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900 group-hover:text-amber-700 transition-colors">
                AI Business Assistant
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Ask questions in plain language about pricing, sales strategy, or daily supplier negotiations.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700">
              <span>Enter Chat</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Action 2: Marketing Assistant */}
          <button
            onClick={() => onSelectTab('marketing')}
            className="p-5 rounded-xl border border-slate-200 bg-white hover:border-amber-500 hover:shadow-xs transition-all text-left flex flex-col justify-between group h-full"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Megaphone className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                Marketing Hub
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Generate ready-to-send WhatsApp messages, festive discounts, and social media announcements.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
              <span>Create Campaign</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Action 3: Business Insights */}
          <button
            onClick={() => onSelectTab('insights')}
            className="p-5 rounded-xl border border-slate-200 bg-white hover:border-amber-500 hover:shadow-xs transition-all text-left flex flex-col justify-between group h-full"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center mb-3 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900 group-hover:text-sky-700 transition-colors">
                Business Insights
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Log daily sales and expenses. Accurate arithmetic calculations paired with AI explanation.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-700">
              <span>View Calculations</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Action 4: Business Profile */}
          <button
            onClick={() => onSelectTab('profile')}
            className="p-5 rounded-xl border border-slate-200 bg-white hover:border-amber-500 hover:shadow-xs transition-all text-left flex flex-col justify-between group h-full"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900 group-hover:text-purple-700 transition-colors">
                Business Profile
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Configure your trade category, products, target audience, preferred voice, and currency ({currencySymbol}).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-700">
              <span>Manage Setup</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* Two Column Grid: Core Principle & Daily Trade Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Card 1: Core Principle: ASK → UNDERSTAND → ANALYSE → ACT */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Core Principle in Practice
              </h3>
              <p className="text-xs text-slate-500">
                How Udyog Mitra turns simple questions into business growth.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded">
              Framework
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70">
              <span className="font-bold text-slate-900">1. ASK</span>
              <p className="text-slate-600 mt-0.5">
                Speak or type in your language: <em>"My edible oil stock is not moving fast enough this month, what should I do?"</em>
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70">
              <span className="font-bold text-slate-900">2. UNDERSTAND</span>
              <p className="text-slate-600 mt-0.5">
                AI references your business profile ({categoryMeta?.label}, {profile.city || 'local market'}) so recommendations are realistic, not generic theory.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70">
              <span className="font-bold text-slate-900">3. ANALYSE</span>
              <p className="text-slate-600 mt-0.5">
                The system checks your profit margin targets and seasonal buying patterns without messy spreadsheets.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70">
              <span className="font-bold text-slate-900">4. ACT</span>
              <p className="text-slate-600 mt-0.5">
                Produces an immediate WhatsApp promotion draft: combo offer with flour & spices ready to send in 1 click!
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Daily Operations Checklist tailored to Category */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Daily Business Pulse: {categoryMeta?.label || 'General Trade'}
              </h3>
              <p className="text-xs text-slate-500">
                Essential daily tasks for your business type.
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono">Today</span>
          </div>

          <div className="space-y-2.5">
            {dailyTasks.map((task, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/70 text-xs text-slate-700"
              >
                <div className="w-5 h-5 rounded-full bg-white border border-slate-300 text-slate-500 flex items-center justify-center shrink-0 font-mono text-[10px] font-semibold mt-0.5">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800 leading-relaxed">{task}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900">
            <p className="font-medium">
              💡 Need help with any of these daily tasks?
            </p>
            <p className="text-slate-600 mt-0.5">
              In Phase 2, asking the AI assistant will automatically guide you through supplier talks, WhatsApp broadcasts, and margin calculations.
            </p>
          </div>
        </div>
      </div>

      {/* Phased Roadmap & Architecture Status */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5">
        <h3 className="font-bold text-sm text-slate-900 mb-1">
          Development Roadmap & Phase Progress
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Following your exact structured implementation sequence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          {/* Phase 1 */}
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Phase 1</span>
            </div>
            <p className="font-semibold text-slate-900">Foundation & Profile</p>
            <p className="text-[11px] text-slate-600 mt-1">
              Environment audit, design system, profile setup, presets & local persistence.
            </p>
            <span className="inline-block mt-2 font-mono text-[10px] text-emerald-700 font-bold">
              ✓ COMPLETED
            </span>
          </div>

          {/* Phase 2 */}
          <div className="p-3 rounded-lg bg-slate-50 border border-amber-300/80 text-slate-900">
            <div className="flex items-center gap-1.5 font-bold text-amber-700 mb-1">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Phase 2</span>
            </div>
            <p className="font-semibold text-slate-900">Core Experience</p>
            <p className="text-[11px] text-slate-600 mt-1">
              Dashboard integration & functional AI chat interface using Google Gemini Flash.
            </p>
            <span className="inline-block mt-2 font-mono text-[10px] text-amber-700 font-bold">
              NEXT UP
            </span>
          </div>

          {/* Phase 3 */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">
            <div className="font-bold text-slate-500 mb-1">Phase 3</div>
            <p className="font-semibold text-slate-800">Business Tools</p>
            <p className="text-[11px] text-slate-500 mt-1">
              WhatsApp/social marketing generator & exact arithmetic profit/expense calculator.
            </p>
            <span className="inline-block mt-2 font-mono text-[10px] text-slate-400">
              PLANNED
            </span>
          </div>

          {/* Phase 4 */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">
            <div className="font-bold text-slate-500 mb-1">Phase 4</div>
            <p className="font-semibold text-slate-800">Persistence</p>
            <p className="text-[11px] text-slate-500 mt-1">
              Persistent storage for multi-session data, ledgers, and profile backups.
            </p>
            <span className="inline-block mt-2 font-mono text-[10px] text-slate-400">
              PLANNED
            </span>
          </div>

          {/* Phase 5 */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">
            <div className="font-bold text-slate-500 mb-1">Phase 5</div>
            <p className="font-semibold text-slate-800">Polish & Deploy</p>
            <p className="text-[11px] text-slate-500 mt-1">
              End-to-end journey verification, edge cases, responsive audits, and release.
            </p>
            <span className="inline-block mt-2 font-mono text-[10px] text-slate-400">
              PLANNED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
