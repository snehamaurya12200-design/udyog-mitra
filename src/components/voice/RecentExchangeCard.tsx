import React, { useState } from 'react';
import { UiTranslations } from '../../types/language';
import { Volume2, Sparkles, Check, Copy } from 'lucide-react';

interface RecentExchangeCardProps {
  userQuery: string;
  assistantResponse: string;
  onRepeatVoice: () => void;
  translations: UiTranslations;
}

export const RecentExchangeCard: React.FC<RecentExchangeCardProps> = ({
  userQuery,
  assistantResponse,
  onRepeatVoice,
  translations,
}) => {
  const [copied, setCopied] = useState(false);

  if (!userQuery && !assistantResponse) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${userQuery}\n\n${assistantResponse}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white rounded-[28px] border border-stone-200/70 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-4 sm:p-5 space-y-3 transition-all duration-200">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-1 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs">
            उ
          </div>
          <span className="text-xs font-bold text-stone-900">
            {translations.recentExchangeTitle}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-50 transition-colors"
            title="Copy text"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            onClick={onRepeatVoice}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-amber-900 bg-amber-50 hover:bg-amber-100/80 rounded-xl transition-all active:scale-95 border border-amber-200/60"
            title="Listen again aloud"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-700" />
            <span>{translations.repeatResponse}</span>
          </button>
        </div>
      </div>

      {/* Conversational Speech Bubbles */}
      <div className="space-y-2.5 pt-1">
        {/* User Query Bubble (Right-aligned soft stone pill) */}
        {userQuery && (
          <div className="flex justify-end">
            <div className="max-w-[85%] bg-stone-100 text-stone-900 rounded-[20px] rounded-tr-xs px-3.5 py-2 text-xs font-semibold leading-relaxed">
              "{userQuery}"
            </div>
          </div>
        )}

        {/* Mitra Assistant Bubble (Left-aligned soft amber tint) */}
        {assistantResponse && (
          <div className="flex justify-start">
            <div className="max-w-[90%] bg-amber-50/70 border border-amber-200/60 text-stone-900 rounded-[20px] rounded-tl-xs px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed">
              <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider block mb-0.5">
                Udyog Mitra
              </span>
              {assistantResponse}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
