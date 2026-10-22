import React from 'react';
import { BusinessProfile, CATEGORY_OPTIONS } from '../../types/business';
import {
  BotMessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
  MessageCircle,
  Clock,
  Layers,
} from 'lucide-react';

interface AssistantPlaceholderProps {
  profile: BusinessProfile;
  onGoToProfile: () => void;
}

export const AssistantPlaceholder: React.FC<AssistantPlaceholderProps> = ({
  profile,
  onGoToProfile,
}) => {
  const categoryMeta = CATEGORY_OPTIONS.find((c) => c.value === profile.category);

  const samplePrompts = [
    `How can ${profile.businessName || 'my business'} improve repeat customer orders this month?`,
    `What are 3 practical cost-saving tips for a ${categoryMeta?.label || 'small store'} in ${profile.city || 'our city'}?`,
    `How should I structure a 10% weekend discount so it doesn't hurt our profit margin?`,
    `Draft a polite WhatsApp message to remind a customer about a pending payment.`,
  ];

  return (
    <div className="space-y-6">
      {/* Phase 2 Header Notice */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <BotMessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-800 tracking-wider uppercase">
                  Phase 2 Implementation Target
                </span>
                <span className="text-xs text-amber-700 bg-amber-100/80 font-mono px-2 py-0.5 rounded">
                  gemini-3.8-flash
                </span>
              </div>
              <h1 className="text-lg font-bold text-slate-900 mt-1">
                AI Business Assistant Workspace
              </h1>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                In Phase 2, this workspace will connect to Google Gemini Flash via server-side API endpoints. The assistant will reference your active business profile (<strong>{profile.businessName || 'Your Business'}</strong>) so every answer is grounded in your actual products, city, and goals.
              </p>
            </div>
          </div>

          <button
            onClick={onGoToProfile}
            className="px-3.5 py-2 text-xs font-semibold text-amber-900 bg-amber-100/90 hover:bg-amber-200 rounded-lg transition-colors whitespace-nowrap self-start"
          >
            Review Business Profile →
          </button>
        </div>
      </div>

      {/* Interactive Mock Shell (Showing Honest Preview without fake simulated chat) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col h-[520px]">
        {/* Chat Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-600"></div>
            <div>
              <h2 className="text-xs font-bold text-slate-900">
                Udyog Mitra Conversational Advisor
              </h2>
              <p className="text-[11px] text-slate-500">
                Grounded in: {profile.businessName || 'Your Business'} ({categoryMeta?.label || 'General'})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
            <span>Tone: {profile.communicationTone}</span>
          </div>
        </div>

        {/* Chat Preview Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/30">
          {/* Welcome Message */}
          <div className="flex items-start gap-3 max-w-2xl">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
              उ
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 text-xs text-slate-800 space-y-2 shadow-xs">
              <p className="font-semibold text-slate-900">
                Namaste! I am your AI Business Companion.
              </p>
              <p className="text-slate-600 leading-relaxed">
                I am primed with your business profile for <strong>{profile.businessName || 'your store'}</strong> in <strong>{profile.city || 'your locality'}</strong>. In Phase 2, you can ask me anything about daily operations, customer retention, pricing decisions, or supplier talks.
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero fake responses: full real-time Gemini Flash reasoning arrives in Phase 2.</span>
              </div>
            </div>
          </div>

          {/* Prompt Suggestions */}
          <div className="pt-4 max-w-xl">
            <p className="text-xs font-semibold text-slate-700 mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Sample questions tailored to {profile.businessName}:</span>
            </p>
            <div className="space-y-2">
              {samplePrompts.map((prompt, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-xl border border-slate-200/80 text-xs text-slate-700 hover:border-amber-400 hover:bg-amber-50/30 transition-all flex items-center justify-between group cursor-default"
                >
                  <span className="font-medium">"{prompt}"</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-amber-700 font-mono shrink-0 ml-2">
                    Phase 2
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="flex items-center gap-2">
            <input
              type="text"
              disabled
              placeholder={`Ask anything about ${profile.businessName || 'your business'} (Enabled in Phase 2 with Gemini Flash)...`}
              className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed focus:outline-none"
            />
            <button
              disabled
              className="px-4 py-2.5 bg-slate-200 text-slate-400 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-not-allowed"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Server-side Gemini 3.8 Flash execution scheduled for Phase 2.</span>
            <span>ASK → UNDERSTAND → ANALYSE → ACT</span>
          </div>
        </div>
      </div>
    </div>
  );
};
