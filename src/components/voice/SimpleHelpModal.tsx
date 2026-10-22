import React from 'react';
import { UiTranslations } from '../../types/language';
import { HelpCircle, Mic, Globe2, Sparkles, X, CheckCircle2 } from 'lucide-react';

interface SimpleHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  translations: UiTranslations;
}

export const SimpleHelpModal: React.FC<SimpleHelpModalProps> = ({
  isOpen,
  onClose,
  translations,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {translations.helpButton} / How to use Udyog Mitra
              </h2>
              <p className="text-xs text-slate-500">
                3 simple steps to run your business with voice
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/60 transition-colors"
            aria-label="Close help"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Step Visual Guide */}
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Step 1 */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              1
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Tap the Big Microphone
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Tap the large round button in the center of the screen. No need to type long messages or read small text.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
              2
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Speak in Your Own Language
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Speak naturally in Marathi, Hindi, Gujarati, English, Bengali, Tamil, Telugu, or Kannada. Ask for an offer, check profit, or prepare a reminder.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/60">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shrink-0">
              3
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Listen and Complete the Task
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Mitra will answer aloud. You can tap "Repeat Answer" anytime if you want to listen again.
              </p>
            </div>
          </div>

          {/* Core Principle Callout */}
          <div className="p-3.5 bg-slate-100 rounded-2xl text-xs text-slate-700">
            <span className="font-bold text-slate-900 block mb-1">
              Guiding Principle:
            </span>
            <p className="font-medium text-slate-800">
              ASK <span className="text-slate-400">→</span> UNDERSTAND <span className="text-slate-400">→</span> ANALYSE <span className="text-slate-400">→</span> ACT
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Built for hard-working small shopkeepers and artisans.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 font-semibold text-xs text-white bg-slate-900 hover:bg-slate-800 rounded-xl"
          >
            Got it / समजले
          </button>
        </div>
      </div>
    </div>
  );
};
