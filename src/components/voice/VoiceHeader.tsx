import React from 'react';
import { LanguageCode, SUPPORTED_LANGUAGES, UiTranslations } from '../../types/language';
import { BusinessProfile } from '../../types/business';
import { Globe2, HelpCircle, Store, SlidersHorizontal } from 'lucide-react';

interface VoiceHeaderProps {
  currentLanguage: LanguageCode;
  onOpenLanguageModal: () => void;
  onOpenHelpModal: () => void;
  onOpenShopSettings: () => void;
  profile: BusinessProfile;
  translations: UiTranslations;
}

export const VoiceHeader: React.FC<VoiceHeaderProps> = ({
  currentLanguage,
  onOpenLanguageModal,
  onOpenHelpModal,
  onOpenShopSettings,
  profile,
  translations,
}) => {
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white font-extrabold text-lg shadow-xs">
              उ
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap block">
                Udyog Mitra
              </span>
              <span className="text-[10px] text-slate-500 font-medium block -mt-1 truncate max-w-[150px] sm:max-w-none">
                {translations.tagline}
              </span>
            </div>
          </div>

          {/* Zone 2: Language Selector (Center Stage) */}
          <div className="flex items-center justify-center">
            <button
              onClick={onOpenLanguageModal}
              className="px-3.5 py-1.5 rounded-full border border-amber-300 bg-amber-50 hover:bg-amber-100/90 text-amber-900 text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
              aria-label="Change language"
            >
              <Globe2 className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{currentLangObj?.nativeName || 'हिन्दी'}</span>
              <span className="text-[10px] font-normal text-amber-700/80 hidden sm:inline">
                ({currentLangObj?.englishName})
              </span>
            </button>
          </div>

          {/* Zone 3: Actions (Help & Shop Profile) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenHelpModal}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Help & Guide"
            >
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">{translations.helpButton}</span>
            </button>

            <button
              onClick={onOpenShopSettings}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="My Shop Profile"
            >
              <Store className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">{translations.myShopButton}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
