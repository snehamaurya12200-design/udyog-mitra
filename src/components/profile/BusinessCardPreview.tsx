import React from 'react';
import { BusinessProfile, CATEGORY_OPTIONS, CURRENCY_SYMBOLS } from '../../types/business';
import { getProfileCompleteness } from '../../services/storage';
import {
  Building2,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Target,
  Sparkles,
  Phone,
  MessageCircle,
  Briefcase,
} from 'lucide-react';

interface BusinessCardPreviewProps {
  profile: BusinessProfile;
  onEditClick?: () => void;
}

export const BusinessCardPreview: React.FC<BusinessCardPreviewProps> = ({
  profile,
  onEditClick,
}) => {
  const categoryMeta = CATEGORY_OPTIONS.find((c) => c.value === profile.category);
  const { score, completedItems, pendingItems } = getProfileCompleteness(profile);

  const toneLabels: Record<string, string> = {
    warm_local: 'Warm & Community Friendly',
    professional_clean: 'Professional & Trustworthy',
    hinglish_conversational: 'Hinglish & Accessible',
    direct_concise: 'Direct & Concise',
  };

  const modelLabels: Record<string, string> = {
    offline_store: 'Physical Store / Walk-in',
    online_only: 'Online / Delivery Only',
    hybrid: 'Physical Shop + WhatsApp / Online',
  };

  const teamLabels: Record<string, string> = {
    solo: 'Solo Owner / Founder',
    small_2_5: 'Small Team (2–5 people)',
    growing_6_15: 'Growing Team (6–15 people)',
    established_16_plus: '16+ Staff & Staffed Branches',
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header Accent Bar with Subtle Tone */}
      <div className="bg-slate-900 text-white p-5">
        <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-amber-400">BUSINESS IDENTITY</span>
            <span aria-hidden="true">·</span>
            <span>{categoryMeta?.label || 'General Business'}</span>
          </div>
          <span className="font-mono tabular-nums text-slate-300">
            Est. {profile.establishedYear || 'N/A'}
          </span>
        </div>

        <h2 className="text-xl font-bold tracking-tight text-white">
          {profile.businessName || 'Unnamed Business'}
        </h2>

        {profile.tagline && (
          <p className="text-xs text-slate-300 mt-1 italic">
            "{profile.tagline}"
          </p>
        )}

        <div className="flex items-center gap-3 mt-3 text-xs text-slate-300">
          <span>Owner: <strong className="text-white font-medium">{profile.ownerName || 'Not specified'}</strong></span>
          {profile.city && (
            <>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                <span>{profile.city}{profile.stateOrRegion ? `, ${profile.stateOrRegion}` : ''}</span>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Body Details */}
      <div className="p-5 space-y-4">
        {/* Readiness Meter */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>AI Context Completeness</span>
            </span>
            <span className="font-mono font-bold tabular-nums text-slate-900">{score}%</span>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                score === 100
                  ? 'bg-emerald-600'
                  : score >= 60
                  ? 'bg-amber-600'
                  : 'bg-slate-400'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>

          <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
            <span>
              {score >= 80
                ? 'Ready to power AI Assistant & Marketing'
                : 'Add more details to sharpen AI responses'}
            </span>
            {pendingItems.length > 0 && (
              <span className="text-amber-700 font-medium">
                {pendingItems.length} field{pendingItems.length > 1 ? 's' : ''} left
              </span>
            )}
          </div>
        </div>

        {/* Offerings and Customers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
          <div className="p-3 rounded-xl border border-slate-200/80 bg-white">
            <span className="font-semibold text-slate-900 block mb-1">Products & Services</span>
            <p className="text-slate-600 leading-relaxed line-clamp-3">
              {profile.productsAndServices || 'No products listed yet.'}
            </p>
          </div>

          <div className="p-3 rounded-xl border border-slate-200/80 bg-white">
            <span className="font-semibold text-slate-900 block mb-1">Target Customers</span>
            <p className="text-slate-600 leading-relaxed line-clamp-3">
              {profile.targetCustomers || 'No target audience specified yet.'}
            </p>
          </div>
        </div>

        {/* Operating Specifics */}
        <div className="p-3 rounded-xl border border-slate-200/80 bg-white text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Operating Model</span>
            <span className="font-medium text-slate-800">{modelLabels[profile.operatingModel] || profile.operatingModel}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Team Size</span>
            <span className="font-medium text-slate-800">{teamLabels[profile.teamSize] || profile.teamSize}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Currency</span>
            <span className="font-medium text-slate-800">
              {profile.currency} ({CURRENCY_SYMBOLS[profile.currency] || '₹'})
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Communication Tone</span>
            <span className="font-medium text-slate-800">{toneLabels[profile.communicationTone] || profile.communicationTone}</span>
          </div>
          {profile.whatsappNumber && (
            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <span className="text-slate-500 flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Business</span>
              </span>
              <span className="font-mono tabular-nums font-medium text-slate-800">{profile.whatsappNumber}</span>
            </div>
          )}
        </div>

        {/* Active Business Goals */}
        <div className="p-3 rounded-xl border border-slate-200/80 bg-white text-xs">
          <span className="font-semibold text-slate-900 block mb-2">Priority Business Goals</span>
          {profile.primaryGoals && profile.primaryGoals.length > 0 ? (
            <ul className="space-y-1.5">
              {profile.primaryGoals.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700">
                  <span className="text-amber-600 font-bold shrink-0 mt-0.5">•</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 italic">No business goals selected yet.</p>
          )}
        </div>

        {/* How Gemini Flash uses this context */}
        <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-amber-900 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>How AI Uses This Profile</span>
          </div>
          <p className="text-amber-800/90 leading-relaxed text-[11px]">
            In Phase 2 & 3, the Google Gemini Flash assistant will ground every marketing offer, strategy advice, and cashflow tip in this profile. It will speak in your preferred tone ({toneLabels[profile.communicationTone]}), targeting {profile.city || 'your area'}.
          </p>
        </div>
      </div>
    </div>
  );
};
