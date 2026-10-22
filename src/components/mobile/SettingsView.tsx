import React, { useState } from 'react';
import { LanguageCode, SUPPORTED_LANGUAGES, UiTranslations } from '../../types/language';
import { BusinessProfile } from '../../types/business';
import {
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
  speakText,
} from '../../services/speech';
import {
  Settings,
  Globe2,
  Store,
  Volume2,
  Check,
  CheckCircle2,
  XCircle,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';

interface SettingsViewProps {
  currentLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  profile: BusinessProfile;
  onOpenShopProfile: () => void;
  onOpenPresets: () => void;
  translations: UiTranslations;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentLanguage,
  onSelectLanguage,
  profile,
  onOpenShopProfile,
  onOpenPresets,
  translations,
}) => {
  const [testingVoice, setTestingVoice] = useState(false);
  const recSupported = isSpeechRecognitionSupported();
  const synthSupported = isSpeechSynthesisSupported();

  const handleTestSpeech = () => {
    setTestingVoice(true);
    const testPhrases: Record<LanguageCode, string> = {
      en: 'Hello! I am Udyog Mitra, your voice assistant. Audio is working properly.',
      hi: 'नमस्ते! मैं उद्योग मित्र हूँ। आपकी आवाज़ प्रणाली बिल्कुल सही काम कर रही है।',
      mr: 'नमस्कार! मी उद्योग मित्र आहे. तुमचा ऑडिओ व्यवस्थित चालू आहे.',
      gu: 'નમસ્તે! હું ઉદ્યોગ મિત્ર છું. તમારો ઑડિયો બરાબર કામ કરી રહ્યો છે.',
      bn: 'নমস্কার! আমি উদ্যোগ মিত্র। আপনার অডিও সঠিকভাবে কাজ করছে।',
      ta: 'வணக்கம்! நான் உத்யோக் மித்ரா. உங்கள் ஆடியோ சரியாக வேலை செய்கிறது.',
      te: 'నమస్కారం! నేను ఉద్యోగ్ మిత్ర. మీ ఆడియో సరిగ్గా పనిచేస్తోంది.',
      kn: 'ನಮಸ್ಕಾರ! ನಾನು ಉದ್ಯೋಗ ಮಿತ್ರ. ನಿಮ್ಮ ಆಡಿಯೋ ಸರಿಯಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆ.',
    };

    speakText(
      testPhrases[currentLanguage] || testPhrases.en,
      currentLanguage,
      () => setTestingVoice(true),
      () => setTestingVoice(false),
      () => setTestingVoice(false)
    );
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 pb-6">
      {/* Title */}
      <div className="px-1">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
          <Settings className="w-4 h-4 text-amber-600" />
          <span>{translations.navSettings}</span>
        </h2>
        <p className="text-xs text-slate-500">
          Preferences, language, and speech diagnostics.
        </p>
      </div>

      {/* 1. LANGUAGE SELECTOR */}
      <div className="bg-white rounded-[28px] p-5 border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-3">
        <div className="flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-amber-600" />
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
            Choose Preferred Language
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onSelectLanguage(lang.code)}
                className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all min-h-[56px] active:scale-95 ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-500/20 shadow-2xs'
                    : 'border-stone-200/80 hover:border-stone-300 bg-stone-50/60'
                }`}
              >
                <div>
                  <span className="text-sm font-bold text-stone-900 block">
                    {lang.nativeName}
                  </span>
                  <span className="text-[11px] text-stone-500">
                    {lang.englishName}
                  </span>
                </div>
                {isSelected && (
                  <Check className="w-4 h-4 text-amber-600 shrink-0 stroke-[3]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SHOP IDENTITY SUMMARY */}
      <div className="bg-white rounded-[28px] p-5 border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              {translations.myShopButton}
            </h3>
          </div>

          <button
            onClick={onOpenPresets}
            className="text-[11px] font-bold text-amber-800 bg-amber-100/70 hover:bg-amber-100 px-3 py-1 rounded-full border border-amber-200/60 active:scale-95 transition-all"
          >
            Presets
          </button>
        </div>

        <div className="p-3.5 bg-stone-50/70 rounded-2xl border border-stone-200/70 text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-stone-500">Business Name</span>
            <span className="font-bold text-stone-900 truncate max-w-[200px]">{profile.businessName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Owner</span>
            <span className="font-semibold text-stone-800">{profile.ownerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">City</span>
            <span className="text-stone-800">{profile.city || 'Not set'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">WhatsApp</span>
            <span className="font-mono text-stone-800">{profile.whatsappNumber || 'Not set'}</span>
          </div>
        </div>

        <button
          onClick={onOpenShopProfile}
          className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Edit Shop Details</span>
        </button>
      </div>

      {/* 3. DEVICE & BROWSER SPEECH DIAGNOSTICS */}
      <div className="bg-white rounded-[28px] p-5 border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-3">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-amber-600" />
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
            Speech & Voice Capabilities
          </h3>
        </div>

        <div className="space-y-2 text-xs">
          {/* Mic recognition status */}
          <div className="p-3 bg-stone-50/70 rounded-2xl border border-stone-200/70 flex items-center justify-between">
            <div>
              <span className="font-bold text-stone-800 block">Microphone Speech Recognition</span>
              <span className="text-[11px] text-stone-500">
                {recSupported ? 'Supported on this device' : 'Not supported (Use Chrome/Edge or Keyboard)'}
              </span>
            </div>
            {recSupported ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-amber-600 shrink-0" />
            )}
          </div>

          {/* Audio TTS status */}
          <div className="p-3 bg-stone-50/70 rounded-2xl border border-stone-200/70 flex items-center justify-between">
            <div>
              <span className="font-bold text-stone-800 block">Spoken Audio Playback</span>
              <span className="text-[11px] text-stone-500">
                {synthSupported ? 'Supported on this device' : 'Not supported in this browser'}
              </span>
            </div>
            {synthSupported ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-amber-600 shrink-0" />
            )}
          </div>
        </div>

        {/* Test Voice Button */}
        <button
          onClick={handleTestSpeech}
          disabled={!synthSupported || testingVoice}
          className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:bg-stone-200 disabled:text-stone-400 text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>{testingVoice ? 'Speaking Sample Audio...' : 'Test Voice Audio Playback'}</span>
        </button>
      </div>
    </div>
  );
};
