import React from 'react';
import { BusinessProfile, CURRENCY_SYMBOLS } from '../../types/business';
import {
  BarChart3,
  Calculator,
  TrendingUp,
  Receipt,
  FileSpreadsheet,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

interface InsightsPlaceholderProps {
  profile: BusinessProfile;
  onGoToProfile: () => void;
}

export const InsightsPlaceholder: React.FC<InsightsPlaceholderProps> = ({
  profile,
  onGoToProfile,
}) => {
  const currencySymbol = CURRENCY_SYMBOLS[profile.currency] || '₹';

  return (
    <div className="space-y-6">
      {/* Header Notice */}
      <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-sky-800 tracking-wider uppercase">
                  Phase 3 Implementation Target
                </span>
                <span className="text-xs text-sky-700 bg-sky-100 font-mono px-2 py-0.5 rounded">
                  Deterministic Math + AI Explanation
                </span>
              </div>
              <h1 className="text-lg font-bold text-slate-900 mt-1">
                Business Performance & Financial Insights
              </h1>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                In Phase 3, you will be able to enter or import sales and expense entries in <strong>{profile.currency} ({currencySymbol})</strong>. Totals and profit margins are calculated with exact arithmetic logic, and Gemini Flash provides actionable advice based on real data.
              </p>
            </div>
          </div>

          <button
            onClick={onGoToProfile}
            className="px-3.5 py-2 text-xs font-semibold text-sky-900 bg-sky-100 hover:bg-sky-200 rounded-lg transition-colors whitespace-nowrap self-start"
          >
            Adjust Currency & Goals →
          </button>
        </div>
      </div>

      {/* Planned Calculation Architecture Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4">
        <div className="border-b border-slate-100 pb-2.5">
          <h3 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-sky-600" />
            <span>Guaranteed Accurate Calculation Engine (Phase 3 Design)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Never hallucinating financial numbers. Strict separation between arithmetic logic and AI explanation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              1. Deterministic Formulas
            </span>
            <p className="font-mono text-xs text-slate-800 font-semibold mt-1">
              Gross Profit = Revenue - COGS
            </p>
            <p className="font-mono text-xs text-slate-800 font-semibold mt-0.5">
              Net Margin = (Net Profit / Revenue) × 100%
            </p>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Computed 100% via verifiable JavaScript math with zero hallucinations.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              2. Data Input Modalities
            </span>
            <p className="text-xs text-slate-700 font-medium mt-1">
              Daily Quick Entry & CSV Import
            </p>
            <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
              Log daily sales slips, UPI/cash splits, supplier invoices, or upload spreadsheet records.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              3. AI Role: Actionable Advice
            </span>
            <p className="text-xs text-slate-700 font-medium mt-1">
              Grounded Interpretation
            </p>
            <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
              Gemini Flash highlights trends: "Rent is 22% of revenue this month, higher than recommended 15% threshold for {profile.category}."
            </p>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 text-xs text-slate-600 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Complies with core rule: No invented business statistics or fake performance graphs.</span>
        </div>
      </div>
    </div>
  );
};
