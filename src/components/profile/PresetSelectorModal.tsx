import React from 'react';
import { PRESET_PROFILES, ProfilePreset } from '../../services/profilePresets';
import { BusinessProfile } from '../../types/business';
import { Store, Check, X, Sparkles, Building2 } from 'lucide-react';

interface PresetSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: ProfilePreset) => void;
  onResetClean: () => void;
  currentProfileId?: string;
}

export const PresetSelectorModal: React.FC<PresetSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
  onResetClean,
  currentProfileId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Store className="w-5 h-5 text-amber-600" />
              <span>Select a Business Profile Preset</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Load realistic small business data instantly to explore Udyog Mitra, or configure your own business.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Cards List */}
        <div className="p-6 overflow-y-auto space-y-3.5">
          {PRESET_PROFILES.map((preset) => {
            const isSelected = currentProfileId === preset.profile.id;
            return (
              <div
                key={preset.id}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-amber-600 bg-amber-50/50 shadow-xs ring-1 ring-amber-600'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span>{preset.badge}</span>
                      <span aria-hidden="true">·</span>
                      <span>{preset.profile.city}, {preset.profile.stateOrRegion}</span>
                    </div>

                    <h3 className="font-semibold text-base text-slate-900 mt-1">
                      {preset.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-1">
                      {preset.summary}
                    </p>

                    <div className="mt-2 text-[11px] text-slate-500 flex flex-wrap gap-x-2 gap-y-1">
                      <span>Owner: {preset.profile.ownerName}</span>
                      <span aria-hidden="true">·</span>
                      <span>Model: {preset.profile.operatingModel === 'hybrid' ? 'Physical Shop + Online Orders' : 'Physical Store'}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectPreset(preset);
                      onClose();
                    }}
                    className={`shrink-0 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                      isSelected
                        ? 'bg-amber-600 text-white hover:bg-amber-700'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {isSelected ? 'Currently Active' : 'Load This Business'}
                  </button>
                </div>
              </div>
            );
          })}

          {/* Clean blank template option */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Want to start completely from scratch?</span>
            <button
              onClick={() => {
                onResetClean();
                onClose();
              }}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
            >
              Start With Empty Form
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
