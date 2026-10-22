import React, { useState } from 'react';
import {
  BusinessProfile,
  BusinessCategory,
  CATEGORY_OPTIONS,
  GOAL_OPTIONS,
  OperatingModel,
  TeamSize,
  CommunicationTone,
  CurrencyCode,
} from '../../types/business';
import {
  Building2,
  User,
  MapPin,
  Target,
  Sparkles,
  Phone,
  MessageCircle,
  Save,
  Download,
  Upload,
  RotateCcw,
  Store,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { exportProfileAsJSON } from '../../services/storage';

interface BusinessProfileFormProps {
  profile: BusinessProfile;
  onSave: (updated: BusinessProfile) => void;
  onOpenPresets: () => void;
  onReset: () => void;
}

export const BusinessProfileForm: React.FC<BusinessProfileFormProps> = ({
  profile,
  onSave,
  onOpenPresets,
  onReset,
}) => {
  const [formData, setFormData] = useState<BusinessProfile>(profile);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync state if external profile prop changes (e.g. when a preset is loaded)
  React.useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleChange = <K extends keyof BusinessProfile>(
    field: K,
    value: BusinessProfile[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSaveSuccess(false);
    setErrorMsg(null);
  };

  const toggleGoal = (goal: string) => {
    setFormData((prev) => {
      const exists = prev.primaryGoals.includes(goal);
      const updated = exists
        ? prev.primaryGoals.filter((g) => g !== goal)
        : [...prev.primaryGoals, goal];
      return { ...prev, primaryGoals: updated };
    });
    setSaveSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName.trim()) {
      setErrorMsg('Please enter your business name.');
      return;
    }
    if (!formData.ownerName.trim()) {
      setErrorMsg('Please enter the owner or manager name.');
      return;
    }

    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && typeof parsed.businessName === 'string') {
          const imported: BusinessProfile = {
            ...formData,
            ...parsed,
            id: parsed.id || `imported_${Date.now()}`,
            updatedAt: new Date().toISOString(),
          };
          setFormData(imported);
          onSave(imported);
          setSaveSuccess(true);
        } else {
          setErrorMsg('Invalid JSON profile format. Missing businessName.');
        }
      } catch (err) {
        setErrorMsg('Could not read JSON file. Please ensure it is valid JSON.');
      }
    };
    reader.readAsText(file);
    // Reset file input value so same file can be reloaded if needed
    e.target.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Banner & Quick Presets Bar */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Configure Business Profile
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            This profile shapes every AI recommendation, marketing draft, and financial diagnosis in Udyog Mitra.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onOpenPresets}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Store className="w-3.5 h-3.5 text-amber-600" />
            <span>Load Sample Preset</span>
          </button>

          <button
            type="button"
            onClick={() => exportProfileAsJSON(formData)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
            title="Download profile as backup JSON"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Backup</span>
          </button>

          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span>Import</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Business profile saved securely to local storage!</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-mono">Synced</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Section 1: Business Identity */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4">
        <div className="border-b border-slate-100 pb-2.5">
          <h3 className="text-sm font-semibold text-slate-900">
            1. Business Identity & Owner
          </h3>
          <p className="text-xs text-slate-500">
            Basic details your customers and suppliers know you by.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Business Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.businessName}
              onChange={(e) => handleChange('businessName', e.target.value)}
              placeholder="e.g. Sharma Kirana & General Store"
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Owner or Manager Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.ownerName}
              onChange={(e) => handleChange('ownerName', e.target.value)}
              placeholder="e.g. Ramesh Sharma"
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Tagline or Motto (Optional)
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              placeholder="e.g. Fresh Groceries & Daily Needs Delivered to Your Doorstep"
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Year Established
            </label>
            <input
              type="number"
              min="1950"
              max={new Date().getFullYear()}
              value={formData.establishedYear}
              onChange={(e) => handleChange('establishedYear', e.target.value)}
              placeholder="e.g. 2018"
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Primary Currency
            </label>
            <select
              value={formData.currency}
              onChange={(e) => handleChange('currency', e.target.value as CurrencyCode)}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white"
            >
              <option value="INR">₹ INR (Indian Rupee)</option>
              <option value="USD">$ USD (US Dollar)</option>
              <option value="EUR">€ EUR (Euro)</option>
              <option value="GBP">£ GBP (British Pound)</option>
              <option value="AED">AED (UAE Dirham)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 2: Industry & Operational Model */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4">
        <div className="border-b border-slate-100 pb-2.5">
          <h3 className="text-sm font-semibold text-slate-900">
            2. Industry & Operating Model
          </h3>
          <p className="text-xs text-slate-500">
            Helps Udyog Mitra provide industry-specific calculations and advice.
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Business Industry / Category
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {CATEGORY_OPTIONS.map((cat) => {
              const isSelected = formData.category === cat.value;
              return (
                <button
                  type="button"
                  key={cat.value}
                  onClick={() => handleChange('category', cat.value)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/70 ring-1 ring-amber-600'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <p className="text-xs font-semibold text-slate-900">{cat.label}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                    {cat.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {formData.category === 'other' && (
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Specify Custom Category
            </label>
            <input
              type="text"
              value={formData.customCategory || ''}
              onChange={(e) => handleChange('customCategory', e.target.value)}
              placeholder="e.g. Solar panel installation & maintenance"
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Operating Model
            </label>
            <select
              value={formData.operatingModel}
              onChange={(e) => handleChange('operatingModel', e.target.value as OperatingModel)}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white"
            >
              <option value="offline_store">Physical Shop / Walk-in Only</option>
              <option value="hybrid">Physical Store + WhatsApp / Delivery (Hybrid)</option>
              <option value="online_only">Online / Phone Delivery Only</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Team Size
            </label>
            <select
              value={formData.teamSize}
              onChange={(e) => handleChange('teamSize', e.target.value as TeamSize)}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white"
            >
              <option value="solo">Solo Owner / Operator</option>
              <option value="small_2_5">Small Team (2–5 members)</option>
              <option value="growing_6_15">Growing Team (6–15 members)</option>
              <option value="established_16_plus">16+ Staff / Multiple Counters</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 3: Products, Services & Target Customers */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4">
        <div className="border-b border-slate-100 pb-2.5">
          <h3 className="text-sm font-semibold text-slate-900">
            3. Offerings & Target Market
          </h3>
          <p className="text-xs text-slate-500">
            Detail what you sell and who buys from you so AI can write accurate promotions.
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Key Products or Services Sold
          </label>
          <textarea
            rows={3}
            value={formData.productsAndServices}
            onChange={(e) => handleChange('productsAndServices', e.target.value)}
            placeholder="e.g. Atta, cold pressed mustard oil, local pulses, spices, packaged snacks, daily dairy & household goods."
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Tip: List 4–8 top selling items or service packages.
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Target Customers / Audience
          </label>
          <textarea
            rows={2}
            value={formData.targetCustomers}
            onChange={(e) => handleChange('targetCustomers', e.target.value)}
            placeholder="e.g. Families, apartment residents, college students, and local home cooks within 2-3 kms."
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
          />
        </div>
      </div>

      {/* Section 4: Primary Goals & Communication Tone */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4">
        <div className="border-b border-slate-100 pb-2.5">
          <h3 className="text-sm font-semibold text-slate-900">
            4. Business Goals & Preferred Voice
          </h3>
          <p className="text-xs text-slate-500">
            Select what you want to achieve. Udyog Mitra uses these goals to suggest daily actions.
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-2">
            Priority Goals (Select all that apply)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {GOAL_OPTIONS.map((goal) => {
              const isChecked = formData.primaryGoals.includes(goal);
              return (
                <label
                  key={goal}
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                    isChecked
                      ? 'border-amber-600 bg-amber-50/50 text-slate-900 font-medium'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleGoal(goal)}
                    className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
                  />
                  <span>{goal}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="pt-2">
          <label className="block text-xs font-medium text-slate-700 mb-1">
            AI Assistant & Marketing Voice Tone
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              {
                value: 'warm_local',
                title: 'Warm & Community Friendly',
                desc: 'Polite, respectful, approachable tone suitable for local neighborhood bonds.',
              },
              {
                value: 'hinglish_conversational',
                title: 'Hinglish & Relatable',
                desc: 'Blends practical Hindi and English common in everyday Indian trade conversation.',
              },
              {
                value: 'professional_clean',
                title: 'Professional & Polished',
                desc: 'Formal, trustworthy tone suited for B2B contracts, corporate orders, and clinics.',
              },
              {
                value: 'direct_concise',
                title: 'Direct & Concise',
                desc: 'Short, fast, no-nonsense replies prioritizing quick action and numbers.',
              },
            ].map((tone) => {
              const isSelected = formData.communicationTone === tone.value;
              return (
                <button
                  type="button"
                  key={tone.value}
                  onClick={() => handleChange('communicationTone', tone.value as CommunicationTone)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/70 ring-1 ring-amber-600'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <p className="text-xs font-semibold text-slate-900">{tone.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{tone.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section 5: Location & Contact */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4">
        <div className="border-b border-slate-100 pb-2.5">
          <h3 className="text-sm font-semibold text-slate-900">
            5. Location & Contact Details
          </h3>
          <p className="text-xs text-slate-500">
            Added automatically into WhatsApp message generators and customer bills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              City / Town
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="e.g. Indore, Pune, Jaipur"
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              State / Province
            </label>
            <input
              type="text"
              value={formData.stateOrRegion}
              onChange={(e) => handleChange('stateOrRegion', e.target.value)}
              placeholder="e.g. Madhya Pradesh, Maharashtra, Rajasthan"
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              WhatsApp Business Number
            </label>
            <input
              type="tel"
              value={formData.whatsappNumber}
              onChange={(e) => handleChange('whatsappNumber', e.target.value)}
              placeholder="e.g. +91 98260 12345"
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Contact Phone (Optional)
            </label>
            <input
              type="tel"
              value={formData.contactNumber}
              onChange={(e) => handleChange('contactNumber', e.target.value)}
              placeholder="e.g. +91 98260 12345"
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 font-mono"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Shop Address / Landmark
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="e.g. Shop #14, Main Market, Near Clock Tower"
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            />
          </div>
        </div>
      </div>

      {/* Save Action Footer */}
      <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200/80 shadow-md flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          Reset
        </button>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Business Profile</span>
          </button>
        </div>
      </div>
    </form>
  );
};
