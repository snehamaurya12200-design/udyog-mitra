import React, { useState } from 'react';
import { VoiceHistoryItem, clearVoiceHistory } from '../../services/storage';
import { UiTranslations, LanguageCode, SUPPORTED_LANGUAGES } from '../../types/language';
import { speakText, stopSpeaking } from '../../services/speech';
import {
  History,
  Volume2,
  Copy,
  Check,
  Trash2,
  Square,
  MessageSquare,
} from 'lucide-react';

interface HistoryViewProps {
  historyItems: VoiceHistoryItem[];
  onClearHistory: () => void;
  translations: UiTranslations;
  currentLanguage: LanguageCode;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  historyItems,
  onClearHistory,
  translations,
  currentLanguage,
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleReplay = (item: VoiceHistoryItem) => {
    if (playingId === item.id) {
      stopSpeaking();
      setPlayingId(null);
      return;
    }

    setPlayingId(item.id);
    speakText(
      item.assistantResponse,
      item.language || currentLanguage,
      () => setPlayingId(item.id),
      () => setPlayingId(null),
      () => setPlayingId(null)
    );
  };

  const handleCopy = (item: VoiceHistoryItem) => {
    navigator.clipboard.writeText(`${item.userQuery}\n\nMitra: ${item.assistantResponse}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 pb-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
            <History className="w-4 h-4 text-amber-600" />
            <span>{translations.navHistory}</span>
          </h2>
          <p className="text-xs text-slate-500">
            Past voice questions and spoken answers.
          </p>
        </div>

        {historyItems.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Clear all conversation history?')) {
                clearVoiceHistory();
                onClearHistory();
              }
            }}
            className="text-xs font-semibold text-red-600 hover:text-red-700 p-2 rounded-xl hover:bg-red-50 flex items-center gap-1 active:scale-95"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{translations.clearHistory}</span>
          </button>
        )}
      </div>

      {/* History Items List */}
      <div className="space-y-3">
        {historyItems.length === 0 ? (
          <div className="p-8 bg-white rounded-[28px] border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] text-center space-y-2">
            <MessageSquare className="w-8 h-8 text-stone-300 mx-auto" />
            <p className="text-xs text-stone-500 leading-relaxed max-w-xs mx-auto">
              {translations.noHistory}
            </p>
          </div>
        ) : (
          historyItems.map((item) => {
            const isPlaying = playingId === item.id;
            const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === item.language);
            return (
              <div
                key={item.id}
                className="p-4 bg-white rounded-[26px] border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-3 transition-all"
              >
                {/* Meta Bar */}
                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span className="font-semibold text-amber-900 bg-amber-100/70 border border-amber-200/50 px-2.5 py-0.5 rounded-full">
                    {langObj?.nativeName || 'English'}
                  </span>
                  <span className="font-medium text-stone-400">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* User Query Bubble */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-stone-100 text-stone-900 px-3.5 py-2 rounded-2xl rounded-tr-xs text-xs font-medium leading-relaxed">
                    "{item.userQuery}"
                  </div>
                </div>

                {/* Mitra Answer Bubble */}
                <div className="flex justify-start">
                  <div className="max-w-[90%] bg-amber-50/70 text-stone-800 border border-amber-100/80 px-3.5 py-2.5 rounded-2xl rounded-tl-xs text-xs leading-relaxed">
                    {item.assistantResponse}
                  </div>
                </div>

                {/* Action Controls */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                  <button
                    onClick={() => handleCopy(item)}
                    className="px-3 py-1.5 rounded-full border border-stone-200/80 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1 active:scale-95 shadow-2xs"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleReplay(item)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all shadow-2xs ${
                      isPlaying
                        ? 'bg-rose-500 text-white'
                        : 'bg-amber-600 hover:bg-amber-700 text-white'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
