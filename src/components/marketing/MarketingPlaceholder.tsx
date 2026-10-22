import React from 'react';
import { BusinessProfile, CATEGORY_OPTIONS } from '../../types/business';
import {
  Megaphone,
  MessageCircle,
  Sparkles,
  Share2,
  Gift,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface MarketingPlaceholderProps {
  profile: BusinessProfile;
  onGoToProfile: () => void;
}

export const MarketingPlaceholder: React.FC<MarketingPlaceholderProps> = ({
  profile,
  onGoToProfile,
}) => {
  const categoryMeta = CATEGORY_OPTIONS.find((c) => c.value === profile.category);

  const channels = [
    {
      title: 'WhatsApp Broadcast Messages',
      desc: 'Short, friendly promotional messages ready to paste directly into WhatsApp business broadcast lists or status stories.',
      badge: 'WhatsApp Priority',
      icon: <MessageCircle className="w-5 h-5 text-emerald-600" />,
    },
    {
      title: 'Festive & Seasonal Flash Offers',
      desc: 'Combo deals, festival discounts (Diwali, Eid, New Year, Monsoons), and end-of-month clearance copy.',
      badge: 'Revenue Driver',
      icon: <Gift className="w-5 h-5 text-amber-600" />,
    },
    {
      title: 'Social Media & Instagram Captions',
      desc: 'Engaging product spotlights, stories behind your craft, and hashtag sets tailored to your city and niche.',
      badge: 'Brand Visibility',
      icon: <Share2 className="w-5 h-5 text-sky-600" />,
    },
    {
      title: 'Customer Review & Feedback Prompts',
      desc: 'Respectful messages asking loyal customers to leave a 5-star review on Google Maps to increase footfall.',
      badge: 'Trust Building',
      icon: <Sparkles className="w-5 h-5 text-purple-600" />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Notice */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase">
                  Phase 3 Implementation Target
                </span>
                <span className="text-xs text-emerald-700 bg-emerald-100 font-mono px-2 py-0.5 rounded">
                  Marketing Assistant
                </span>
              </div>
              <h1 className="text-lg font-bold text-slate-900 mt-1">
                Marketing Content & WhatsApp Promotion Studio
              </h1>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                In Phase 3, you will be able to generate one-click WhatsApp marketing broadcasts, festive sales announcements, and customer loyalty offers customized for <strong>{profile.businessName || 'your business'}</strong>.
              </p>
            </div>
          </div>

          <button
            onClick={onGoToProfile}
            className="px-3.5 py-2 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors whitespace-nowrap self-start"
          >
            Update Offerings & Voice →
          </button>
        </div>
      </div>

      {/* Planned Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {channels.map((ch, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-2.5 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                {ch.icon}
              </div>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {ch.badge}
              </span>
            </div>

            <h3 className="font-semibold text-sm text-slate-900">
              {ch.title}
            </h3>

            <p className="text-xs text-slate-500 leading-relaxed">
              {ch.desc}
            </p>

            <div className="pt-2 text-[11px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-100">
              <span>Ready for Phase 3 release</span>
              <span className="text-emerald-700 font-semibold">Planned</span>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Grounding Info */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 text-xs text-slate-600 space-y-2">
        <h4 className="font-semibold text-slate-900">
          How Marketing Generation Will Use Your Active Profile:
        </h4>
        <ul className="space-y-1.5 list-disc list-inside text-slate-600">
          <li><strong>Business Name:</strong> Will automatically sign off as "{profile.businessName || 'Your Business'}".</li>
          <li><strong>WhatsApp Number:</strong> Will embed your WhatsApp click-to-chat link ({profile.whatsappNumber || 'Not set'}).</li>
          <li><strong>Products & Target:</strong> Will automatically promote "{profile.productsAndServices || 'your items'}" to {profile.targetCustomers || 'your customers'}.</li>
          <li><strong>Tone of Voice:</strong> Will be written in {profile.communicationTone} style.</li>
        </ul>
      </div>
    </div>
  );
};
