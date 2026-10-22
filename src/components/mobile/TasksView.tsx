import React, { useState } from 'react';
import { UiTranslations, LanguageCode } from '../../types/language';
import { BusinessProfile, CURRENCY_SYMBOLS } from '../../types/business';
import {
  BusinessReminder,
  loadReminders,
  addReminder,
  toggleReminder,
  deleteReminder,
} from '../../services/storage';
import {
  Megaphone,
  TrendingUp,
  ReceiptText,
  Clock,
  HelpCircle,
  Copy,
  Check,
  Send,
  Plus,
  Trash2,
  Calendar,
  Sparkles,
  Calculator,
} from 'lucide-react';

interface TasksViewProps {
  profile: BusinessProfile;
  translations: UiTranslations;
  currentLanguage: LanguageCode;
  onVoiceTrigger: (prompt: string) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  profile,
  translations,
  currentLanguage,
  onVoiceTrigger,
}) => {
  const [activeTab, setActiveTab] = useState<'ad' | 'profit' | 'payment' | 'reminders' | 'explain'>('ad');

  // Ad Creator State
  const [offerPercent, setOfferPercent] = useState('10');
  const [offerItem, setOfferItem] = useState('');
  const [copiedAd, setCopiedAd] = useState(false);

  // Profit Calculator State
  const [salesInput, setSalesInput] = useState('');
  const [expenseInput, setExpenseInput] = useState('');

  // Payment Reminder State
  const [custName, setCustName] = useState('');
  const [custAmount, setCustAmount] = useState('');
  const [copiedPayment, setCopiedPayment] = useState(false);

  // Reminders State
  const [reminders, setReminders] = useState<BusinessReminder[]>(() => loadReminders());
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderTime, setNewReminderTime] = useState('10:00 AM');
  const [newReminderDate, setNewReminderDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const currencySymbol = CURRENCY_SYMBOLS[profile.currency] || '₹';

  // Generated Ad Text
  const itemText = offerItem.trim() || 'all items';
  const generatedAdText = `🎉 *Special ${offerPercent}% Discount Offer from ${profile.businessName || 'Our Store'}!*\nDear Customers, get *${offerPercent}% OFF* on ${itemText} this week.\n📍 Visit us at: ${profile.address || profile.city || 'our shop'}\n💬 Reply to this message or WhatsApp on ${profile.whatsappNumber || 'our number'} to order!`;

  // Calculated Profit
  const salesNum = parseFloat(salesInput) || 0;
  const expenseNum = parseFloat(expenseInput) || 0;
  const netProfit = salesNum - expenseNum;
  const profitMargin = salesNum > 0 ? ((netProfit / salesNum) * 100).toFixed(1) : '0';

  // Generated Payment Message
  const customerName = custName.trim() || 'Customer';
  const generatedPaymentText = `Namaste ${customerName} ji! This is a polite reminder from ${profile.businessName || 'our shop'}. Your bill of ${currencySymbol}${custAmount || '0'} is due. Kindly pay via UPI on ${profile.whatsappNumber || 'our counter'}. Thank you!`;

  const copyText = (text: string, isAd: boolean) => {
    navigator.clipboard.writeText(text);
    if (isAd) {
      setCopiedAd(true);
      setTimeout(() => setCopiedAd(false), 2000);
    } else {
      setCopiedPayment(true);
      setTimeout(() => setCopiedPayment(false), 2000);
    }
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReminderTitle.trim()) {
      const updated = addReminder(newReminderTitle.trim(), newReminderDate, newReminderTime);
      setReminders(updated);
      setNewReminderTitle('');
    }
  };

  const handleToggleReminder = (id: string) => {
    const updated = toggleReminder(id);
    setReminders(updated);
  };

  const handleDeleteReminder = (id: string) => {
    const updated = deleteReminder(id);
    setReminders(updated);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 pb-6">
      {/* Task Tabs Pill Scroller */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none px-1">
        {[
          { key: 'ad', label: '📢 Offer Maker' },
          { key: 'profit', label: '💰 Profit Calc' },
          { key: 'payment', label: '📝 Payment Msg' },
          { key: 'reminders', label: '⏰ Reminders' },
          { key: 'explain', label: '💡 Simple Guide' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 active:scale-95 shadow-2xs ${
              activeTab === tab.key
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white/90 border border-stone-200/80 text-stone-700 hover:bg-stone-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. ADVERTISEMENT & OFFER MAKER */}
      {activeTab === 'ad' && (
        <div className="bg-white rounded-[28px] p-5 border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              <Megaphone className="w-4 h-4 text-emerald-600" />
              <span>{translations.taskWhatsAppTitle}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Create WhatsApp Promotion
            </h3>
            <p className="text-xs text-slate-500">
              Personalized for {profile.businessName || 'your store'}.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Discount Percentage
              </label>
              <div className="flex items-center gap-2">
                {['5', '10', '15', '20'].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setOfferPercent(pct)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      offerPercent === pct
                        ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {pct}% Off
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Special Item or Category (Optional)
              </label>
              <input
                type="text"
                value={offerItem}
                onChange={(e) => setOfferItem(e.target.value)}
                placeholder="e.g. Fresh spices, Festive clothing, Oil cans"
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
            </div>

            {/* Generated WhatsApp Text Box */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                Ready-to-Send Message:
              </span>
              <p className="text-xs text-slate-800 font-mono whitespace-pre-line leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                {generatedAdText}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => copyText(generatedAdText, true)}
                className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
              >
                {copiedAd ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(generatedAdText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs shrink-0"
              >
                <Send className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. SALES, EXPENSES & PROFIT CALCULATOR */}
      {activeTab === 'profit' && (
        <div className="bg-white rounded-[28px] p-5 border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span>{translations.taskProfitTitle}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Accurate Daily Profit Calculator
            </h3>
            <p className="text-xs text-slate-500">
              Guaranteed exact arithmetic calculations. Zero hallucinations.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Today's Total Sales Revenue ({currencySymbol})
              </label>
              <input
                type="number"
                value={salesInput}
                onChange={(e) => setSalesInput(e.target.value)}
                placeholder="e.g. 12500"
                className="w-full px-3.5 py-2.5 text-sm font-bold font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Today's Total Costs & Expenses ({currencySymbol})
              </label>
              <input
                type="number"
                value={expenseInput}
                onChange={(e) => setExpenseInput(e.target.value)}
                placeholder="e.g. 9200"
                className="w-full px-3.5 py-2.5 text-sm font-bold font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
            </div>

            {/* Real Calculation Outcome */}
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-3">
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                Calculated Business Outcome:
              </span>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3 bg-white rounded-xl border border-amber-200/50">
                  <span className="text-[10px] text-slate-500 block">Net Profit</span>
                  <strong className={`text-base font-extrabold font-mono ${netProfit >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                    {currencySymbol}{netProfit.toLocaleString()}
                  </strong>
                </div>

                <div className="p-3 bg-white rounded-xl border border-amber-200/50">
                  <span className="text-[10px] text-slate-500 block">Profit Margin</span>
                  <strong className={`text-base font-extrabold font-mono ${parseFloat(profitMargin) >= 15 ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {profitMargin}%
                  </strong>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                {salesNum > 0
                  ? netProfit >= 0
                    ? `Great job! Today you earned ${currencySymbol}${netProfit.toLocaleString()} in profit after covering expenses (${profitMargin}% margin).`
                    : `Notice: Expenses exceeded sales by ${currencySymbol}${Math.abs(netProfit).toLocaleString()} today. Consider checking purchase costs.`
                  : 'Enter your sales and costs above to calculate today’s exact profit.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. CUSTOMER PAYMENT MESSAGE */}
      {activeTab === 'payment' && (
        <div className="bg-white rounded-[28px] p-5 border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">
              <ReceiptText className="w-4 h-4 text-sky-600" />
              <span>{translations.taskReminderTitle}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Polite Payment Reminder
            </h3>
            <p className="text-xs text-slate-500">
              Respectful reminder that preserves good customer relationships.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Customer Name
              </label>
              <input
                type="text"
                value={custName}
                onChange={(e) => setCustName(e.target.value)}
                placeholder="e.g. Verma ji, Priya Madam"
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Due Amount ({currencySymbol})
              </label>
              <input
                type="number"
                value={custAmount}
                onChange={(e) => setCustAmount(e.target.value)}
                placeholder="e.g. 1450"
                className="w-full px-3.5 py-2.5 text-sm font-bold font-mono border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
            </div>

            {/* Generated Payment Message */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                Drafted Polite Message:
              </span>
              <p className="text-xs text-slate-800 font-mono whitespace-pre-line leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                {generatedPaymentText}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => copyText(generatedPaymentText, false)}
                className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
              >
                {copiedPayment ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(generatedPaymentText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs shrink-0"
              >
                <Send className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 4. ACTIVE BUSINESS REMINDERS */}
      {activeTab === 'reminders' && (
        <div className="bg-white rounded-[28px] p-5 border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-800 uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4 text-purple-600" />
              <span>{translations.taskAlarmReminderTitle}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {translations.remindersTitle}
            </h3>
            <p className="text-xs text-slate-500">
              Never miss supplier payments or customer deliveries.
            </p>
          </div>

          {/* Add Reminder Form */}
          <form onSubmit={handleAddReminder} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
            <input
              type="text"
              required
              value={newReminderTitle}
              onChange={(e) => setNewReminderTitle(e.target.value)}
              placeholder="e.g. Call supplier for oil stock delivery"
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={newReminderDate}
                onChange={(e) => setNewReminderDate(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-white"
              />
              <input
                type="text"
                value={newReminderTime}
                onChange={(e) => setNewReminderTime(e.target.value)}
                placeholder="e.g. 11:00 AM"
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{translations.addReminder}</span>
            </button>
          </form>

          {/* Reminders List */}
          <div className="space-y-2">
            {reminders.length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-4">
                {translations.noReminders}
              </p>
            ) : (
              reminders.map((r) => (
                <div
                  key={r.id}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-2.5 transition-all ${
                    r.completed
                      ? 'bg-slate-50 border-slate-200 opacity-60'
                      : 'bg-white border-slate-200 shadow-2xs'
                  }`}
                >
                  <label className="flex items-start gap-2.5 flex-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={r.completed}
                      onChange={() => handleToggleReminder(r.id)}
                      className="w-4 h-4 rounded text-amber-600 border-slate-300 mt-0.5 focus:ring-amber-500"
                    />
                    <div>
                      <span className={`text-xs font-semibold block ${r.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {r.title}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Due: {r.dueDate} at {r.dueTime}
                      </span>
                    </div>
                  </label>

                  <button
                    onClick={() => handleDeleteReminder(r.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                    aria-label="Delete reminder"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 5. EXPLAIN SIMPLY */}
      {activeTab === 'explain' && (
        <div className="bg-white rounded-[28px] p-5 border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>{translations.taskExplainTitle}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Simple Business Explanations
            </h3>
            <p className="text-xs text-slate-500">
              Tap any topic to get a plain-language explanation without confusing jargon.
            </p>
          </div>

          <div className="space-y-2.5">
            {[
              {
                title: 'What is Net Profit vs Gross Profit?',
                explanation: 'Gross Profit is your selling price minus wholesale buying price. Net Profit is what actually stays in your pocket after paying shop rent, helper wages, electricity, and tea expenses.',
              },
              {
                title: 'How should I price items for a 20% margin?',
                explanation: 'If an item costs you ₹80 from the wholesaler and you want a 20% margin, sell it for ₹100. That way, on every ₹100 sale, ₹20 is pure profit for your shop.',
              },
              {
                title: 'What is UPI QR payment settlement?',
                explanation: 'When customers scan your QR code, money goes into your merchant account. Most apps settle the total money into your bank account the next morning without deductions.',
              },
              {
                title: 'How to manage credit (उधारी / Khata) safely?',
                explanation: 'Always set a maximum credit limit (e.g. ₹2,000) per customer. Send polite WhatsApp reminders every 15 days so customers pay before their bill grows too large.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <h4 className="text-xs font-bold text-slate-900">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
