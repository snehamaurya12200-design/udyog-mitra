import React, { useState } from 'react';
import { UiTranslations, LanguageCode } from '../../types/language';
import { BusinessProfile } from '../../types/business';
import {
  Megaphone,
  TrendingUp,
  ReceiptText,
  Clock,
  HelpCircle,
  Store,
  X,
  Mic,
  Copy,
  Check,
  Send,
  Sparkles,
} from 'lucide-react';

export type TaskKey = 'offer' | 'profit' | 'payment' | 'reminder' | 'explain' | 'shop';

interface TaskModalProps {
  taskKey: TaskKey | null;
  onClose: () => void;
  profile: BusinessProfile;
  translations: UiTranslations;
  currentLanguage: LanguageCode;
  onTriggerVoiceQuery: (query: string, mockResponse: string) => void;
  onOpenProfileSetup: () => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  taskKey,
  onClose,
  profile,
  translations,
  currentLanguage,
  onTriggerVoiceQuery,
  onOpenProfileSetup,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!taskKey) return null;

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-[32px] max-w-sm w-full border border-stone-200/80 shadow-2xl overflow-hidden flex flex-col max-h-[88vh] animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs bg-amber-100 text-amber-900">
              {taskKey === 'offer' && <Megaphone className="w-5 h-5 text-emerald-700" />}
              {taskKey === 'profit' && <TrendingUp className="w-5 h-5 text-sky-700" />}
              {taskKey === 'payment' && <ReceiptText className="w-5 h-5 text-amber-700" />}
              {taskKey === 'reminder' && <Clock className="w-5 h-5 text-purple-700" />}
              {taskKey === 'explain' && <HelpCircle className="w-5 h-5 text-yellow-800" />}
              {taskKey === 'shop' && <Store className="w-5 h-5 text-purple-700" />}
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-stone-900 leading-tight">
                {taskKey === 'offer' && translations.taskWhatsAppTitle}
                {taskKey === 'profit' && translations.taskProfitTitle}
                {taskKey === 'payment' && translations.taskReminderTitle}
                {taskKey === 'reminder' && translations.taskAlarmReminderTitle}
                {taskKey === 'explain' && translations.taskExplainTitle}
                {taskKey === 'shop' && translations.taskShopTitle}
              </h3>
              <p className="text-[11px] text-stone-500 font-medium truncate max-w-[190px]">
                {profile.businessName || 'Your Store'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/60 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* TASK 1: Offer / Advertisement */}
          {taskKey === 'offer' && (
            <div className="space-y-3">
              <p className="text-xs text-stone-600 font-medium">
                Ready-to-use discount messages customized for your customers:
              </p>

              {[
                {
                  label: 'Weekend 10% Discount Offer',
                  text: `🎉 *Special Weekend Offer from ${profile.businessName || 'Our Store'}!*\nDear Customers, get *10% OFF* on all items this Saturday & Sunday. Visit us at ${profile.address || profile.city || 'our shop'} or reply to this WhatsApp message to order!`,
                },
                {
                  label: 'Festival Season Promo',
                  text: `✨ *Festive Specials at ${profile.businessName || 'Our Shop'}!*\nEnjoy exclusive festival combo packs and gifts on orders above ₹1,000. Contact: ${profile.whatsappNumber || 'our store'}.`,
                },
              ].map((offer, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl border border-stone-200/80 bg-stone-50/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800">{offer.label}</span>
                    <button
                      onClick={() => copyToClipboard(offer.text, idx)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 active:scale-95 transition-all"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-stone-700 whitespace-pre-line bg-white p-3 rounded-xl border border-stone-200/60 font-mono leading-relaxed">
                    {offer.text}
                  </p>
                </div>
              ))}

              <button
                onClick={() => {
                  onTriggerVoiceQuery(
                    `Create a festive discount offer for ${profile.businessName}`,
                    `I have prepared a festive discount offer for ${profile.businessName} with 10% off. You can copy the message and send it on WhatsApp to your customers!`
                  );
                  onClose();
                }}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <Mic className="w-4 h-4" />
                <span>Speak to Customize with Voice</span>
              </button>
            </div>
          )}

          {/* TASK 2: Profit Calculation */}
          {taskKey === 'profit' && (
            <div className="space-y-3.5">
              <p className="text-xs text-stone-600 font-medium">
                Plain-language business calculations with zero accountancy confusion:
              </p>

              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/70 space-y-2.5">
                <span className="text-[10px] font-bold text-sky-900 uppercase tracking-wider block">
                  Example Daily Calculation:
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-sky-100">
                    <span className="text-[10px] text-stone-500 block">Sales</span>
                    <strong className="text-xs font-bold text-stone-900">₹14,500</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-sky-100">
                    <span className="text-[10px] text-stone-500 block">Costs</span>
                    <strong className="text-xs font-bold text-stone-900">- ₹10,800</strong>
                  </div>
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800">
                    <span className="text-[10px] text-emerald-700 block">Profit</span>
                    <strong className="text-xs font-bold text-emerald-700">₹3,700 (25%)</strong>
                  </div>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed pt-1">
                  💡 In Udyog Mitra, you can speak your sales and costs directly, and Mitra calculates exact profit and margin.
                </p>
              </div>

              <button
                onClick={() => {
                  onTriggerVoiceQuery(
                    `Check today's profit for sales of ₹14,500 and costs of ₹10,800`,
                    `Your total sales today were ₹14,500 and costs were ₹10,800. Your net profit is ₹3,700 with a 25.5% profit margin.`
                  );
                  onClose();
                }}
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <Mic className="w-4 h-4" />
                <span>Speak Numbers Aloud to Calculate</span>
              </button>
            </div>
          )}

          {/* TASK 3: Payment Message */}
          {taskKey === 'payment' && (
            <div className="space-y-3">
              <p className="text-xs text-stone-600 font-medium">
                Polite payment reminders that preserve warm customer relationships:
              </p>

              <div className="p-3.5 rounded-2xl border border-amber-200/80 bg-amber-50/60 space-y-2">
                <span className="text-xs font-bold text-stone-800">Friendly Payment Reminder</span>
                <p className="text-xs text-stone-700 whitespace-pre-line bg-white p-3 rounded-xl border border-stone-200/60 font-mono leading-relaxed">
                  {`Namaste ji! This is a gentle reminder from ${profile.businessName || 'our shop'}. Your bill of ₹1,450 is due. Kindly pay via UPI on ${profile.whatsappNumber || 'our counter'}. Thank you!`}
                </p>
              </div>

              <button
                onClick={() => {
                  onTriggerVoiceQuery(
                    `Draft a polite payment reminder for customer`,
                    `I have drafted a polite payment reminder for your customer with UPI details. You can copy it directly to WhatsApp.`
                  );
                  onClose();
                }}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <Mic className="w-4 h-4" />
                <span>Speak Customer Name & Amount</span>
              </button>
            </div>
          )}

          {/* TASK 4: Reminder */}
          {taskKey === 'reminder' && (
            <div className="space-y-3">
              <p className="text-xs text-stone-600 font-medium">
                Never forget supplier payments, stock arrivals, or pending orders:
              </p>

              <div className="p-3.5 rounded-2xl border border-purple-200/80 bg-purple-50/60 space-y-2">
                <span className="text-xs font-bold text-stone-800">Quick Voice Reminder</span>
                <p className="text-xs text-stone-700 leading-relaxed bg-white p-3 rounded-xl border border-stone-200/60">
                  Say: <em>"Remind me to order milk stock tomorrow at 9 AM"</em> or <em>"Remind me to pay supplier ₹5,000 on Friday"</em>.
                </p>
              </div>

              <button
                onClick={() => {
                  onTriggerVoiceQuery(
                    `Remind me to call supplier for stock delivery tomorrow at 10 AM`,
                    `I have set a reminder: Call supplier for stock delivery tomorrow at 10:00 AM. You can view it in My Tasks.`
                  );
                  onClose();
                }}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <Mic className="w-4 h-4" />
                <span>Set Reminder with Voice</span>
              </button>
            </div>
          )}

          {/* TASK 5: Explain Simply */}
          {taskKey === 'explain' && (
            <div className="space-y-3">
              <p className="text-xs text-stone-600 font-medium">
                Ask about any confusing business term in your language:
              </p>

              {[
                { q: 'What is Gross Profit vs Net Profit?', a: 'Gross Profit is selling price minus wholesale buying cost. Net Profit is what actually stays in your pocket after paying shop rent, helper wages, and electricity.' },
                { q: 'How do UPI QR payments settle?', a: 'When customers scan your QR code, money goes into your merchant account and settles into your bank account the next morning.' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-yellow-50/60 border border-yellow-200/60 space-y-1">
                  <h4 className="text-xs font-bold text-stone-900">{item.q}</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">{item.a}</p>
                </div>
              ))}

              <button
                onClick={() => {
                  onTriggerVoiceQuery(
                    `Explain what is profit margin in simple terms`,
                    `Profit margin is the percentage of your sales price that is pure profit. For example, if you sell an item for ₹100 and bought it for ₹80, your profit margin is 20%.`
                  );
                  onClose();
                }}
                className="w-full py-3 bg-yellow-600 hover:bg-yellow-700 active:scale-95 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <Mic className="w-4 h-4" />
                <span>Ask Any Question with Voice</span>
              </button>
            </div>
          )}

          {/* TASK 6: Shop Profile */}
          {taskKey === 'shop' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Shop Name</span>
                  <span className="font-bold text-stone-900">{profile.businessName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Owner</span>
                  <span className="font-semibold text-stone-800">{profile.ownerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Location</span>
                  <span className="text-stone-800">{profile.city || 'Local area'}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenProfileSetup();
                }}
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Store className="w-4 h-4" />
                <span>Edit Shop Profile & Presets</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-stone-50/80 border-t border-stone-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 font-bold text-xs text-stone-700 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 active:scale-95 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
