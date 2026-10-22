import React from 'react';
import { LanguageCode, UiTranslations } from '../../types/language';
import {
  Mic,
  Square,
  RotateCcw,
  Volume2,
  Keyboard,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking';

interface VoiceHeroProps {
  voiceState: VoiceState;
  onMicClick: () => void;
  onStopClick: () => void;
  onRepeatClick: () => void;
  onToggleTypeInput: () => void;
  isTypeInputOpen: boolean;
  translations: UiTranslations;
  currentLanguage: LanguageCode;
  liveTranscript?: string;
  errorMessage?: string | null;
  speechSupported?: boolean;
}

export const VoiceHero: React.FC<VoiceHeroProps> = ({
  voiceState,
  onMicClick,
  onStopClick,
  onRepeatClick,
  onToggleTypeInput,
  isTypeInputOpen,
  translations,
  currentLanguage,
  liveTranscript,
  errorMessage,
  speechSupported = true,
}) => {
  return (
    <div className="w-full">
      {/* Softly Curved Main Voice Pod */}
      <div className="bg-white rounded-[32px] p-6 sm:p-7 border border-stone-200/70 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col items-center text-center relative overflow-hidden transition-all duration-300">
        {/* Subtle decorative background tint glow in listening/speaking */}
        {voiceState === 'listening' && (
          <div className="absolute inset-0 bg-rose-50/50 pointer-events-none transition-opacity duration-300" />
        )}
        {voiceState === 'speaking' && (
          <div className="absolute inset-0 bg-amber-50/40 pointer-events-none transition-opacity duration-300" />
        )}

        {/* Top Prompt Instruction */}
        <div className="relative z-10 mb-5 max-w-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800/80 bg-amber-50 px-3 py-1 rounded-full inline-block mb-1.5 border border-amber-200/60">
            {voiceState === 'idle' && translations.tapToSpeak}
            {voiceState === 'listening' && translations.listeningState}
            {voiceState === 'processing' && translations.processingState}
            {voiceState === 'speaking' && translations.speakingState}
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 leading-tight">
            {voiceState === 'idle' && 'How can I help you today?'}
            {voiceState === 'listening' && 'Listening to your voice...'}
            {voiceState === 'processing' && 'Thinking and preparing answer...'}
            {voiceState === 'speaking' && 'Speaking answer aloud...'}
          </h2>
        </div>

        {/* Central Rounded Microphone Button with Organic Ripples */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Subtle animated ripple rings when listening */}
          {voiceState === 'listening' && (
            <>
              <span className="absolute w-44 h-44 rounded-full bg-rose-400/20 animate-ping duration-1000 pointer-events-none" />
              <span className="absolute w-36 h-36 rounded-full bg-rose-500/25 animate-pulse duration-700 pointer-events-none" />
            </>
          )}

          {/* Subtle speaking pulse rings */}
          {voiceState === 'speaking' && (
            <>
              <span className="absolute w-44 h-44 rounded-full bg-amber-400/20 animate-ping duration-1000 pointer-events-none" />
              <span className="absolute w-36 h-36 rounded-full bg-amber-500/25 animate-pulse duration-700 pointer-events-none" />
            </>
          )}

          {/* Processing spinner ring */}
          {voiceState === 'processing' && (
            <span className="absolute w-36 h-36 rounded-full border-4 border-dashed border-amber-400/60 animate-spin pointer-events-none" />
          )}

          {/* Giant Tactile Mic Button (120px) */}
          <button
            onClick={onMicClick}
            aria-label={translations.tapToSpeak}
            className={`relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center text-white shadow-xl transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-amber-500/20 select-none ${
              voiceState === 'idle'
                ? 'bg-gradient-to-br from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-amber-500/30 hover:scale-[1.03]'
                : voiceState === 'listening'
                ? 'bg-gradient-to-br from-rose-500 via-rose-600 to-red-600 shadow-rose-500/35 scale-[1.04]'
                : voiceState === 'processing'
                ? 'bg-gradient-to-br from-stone-700 to-stone-900 shadow-stone-800/30'
                : 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/35 scale-[1.04]'
            }`}
          >
            {voiceState === 'idle' && (
              <>
                <Mic className="w-12 h-12 stroke-[2.3] mb-1 drop-shadow-xs" />
                <span className="text-[10px] font-extrabold tracking-wider uppercase opacity-95">
                  {translations.tapToSpeak}
                </span>
              </>
            )}

            {voiceState === 'listening' && (
              <>
                <div className="flex items-center gap-1.5 mb-1.5 h-8">
                  <span className="w-1.5 h-5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-10 bg-white rounded-full animate-bounce" />
                  <span className="w-1.5 h-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                </div>
                <span className="text-[10px] font-extrabold tracking-wider uppercase opacity-95">
                  {translations.listeningState}
                </span>
              </>
            )}

            {voiceState === 'processing' && (
              <>
                <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin mb-1.5" />
                <span className="text-[10px] font-extrabold tracking-wider uppercase opacity-95">
                  {translations.processingState}
                </span>
              </>
            )}

            {voiceState === 'speaking' && (
              <>
                <Volume2 className="w-11 h-11 stroke-[2.3] animate-pulse mb-1" />
                <span className="text-[10px] font-extrabold tracking-wider uppercase opacity-95">
                  {translations.speakingState}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Live Recognized Speech Bubble */}
        {voiceState === 'listening' && liveTranscript && (
          <div className="w-full max-w-sm mb-4 p-3.5 bg-rose-50/80 rounded-2xl border border-rose-200/80 text-xs text-rose-950 font-medium italic animate-in fade-in slide-in-from-bottom-2">
            "{liveTranscript}"
          </div>
        )}

        {/* Error / Fallback Notification Banner */}
        {errorMessage && (
          <div className="w-full max-w-sm mb-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs text-left flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold block leading-tight">{errorMessage}</span>
              <span className="text-[11px] text-amber-800 mt-0.5 block">
                Tap the keyboard icon below to type instead.
              </span>
            </div>
          </div>
        )}

        {/* Spoken Action Controls Bar (Repeat, Stop, Keyboard) */}
        <div className="flex items-center justify-center gap-2 w-full max-w-xs">
          {/* Repeat Answer Button */}
          <button
            onClick={onRepeatClick}
            className="flex-1 min-h-[46px] px-3.5 py-2 rounded-2xl border border-stone-200/90 bg-stone-50/80 hover:bg-stone-100 active:scale-95 text-stone-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs"
            title="Repeat last spoken answer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">{translations.repeatResponse}</span>
          </button>

          {/* Stop Button */}
          <button
            onClick={onStopClick}
            disabled={voiceState === 'idle'}
            className={`min-h-[46px] px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
              voiceState !== 'idle'
                ? 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 shadow-2xs'
                : 'border-stone-200/60 bg-stone-50/50 text-stone-300 cursor-not-allowed opacity-40'
            }`}
            title="Stop speaking"
          >
            <Square className="w-3.5 h-3.5 fill-current shrink-0" />
            <span>{translations.stopSpeech}</span>
          </button>

          {/* Keyboard Alternative Button */}
          <button
            onClick={onToggleTypeInput}
            className={`min-h-[46px] px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
              isTypeInputOpen
                ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-2xs'
                : 'border-stone-200/90 bg-stone-50/80 hover:bg-stone-100 text-stone-700'
            }`}
            title="Type with keyboard"
          >
            <Keyboard className="w-3.5 h-3.5 text-stone-600 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
