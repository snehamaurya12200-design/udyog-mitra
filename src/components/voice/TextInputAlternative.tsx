import React, { useState } from 'react';
import { UiTranslations } from '../../types/language';
import { Send, X } from 'lucide-react';

interface TextInputAlternativeProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitText: (text: string) => void;
  translations: UiTranslations;
}

export const TextInputAlternative: React.FC<TextInputAlternativeProps> = ({
  isOpen,
  onClose,
  onSubmitText,
  translations,
}) => {
  const [text, setText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmitText(text.trim());
      setText('');
    }
  };

  return (
    <div className="w-full bg-white rounded-[26px] p-4 border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-xs font-bold text-stone-800">
          {translations.orTypePrompt}
        </span>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-stone-600 p-1.5 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close typing box"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={translations.typeAlternativePlaceholder}
          className="flex-1 px-4 py-3 text-xs sm:text-sm bg-stone-50/70 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
          autoFocus
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="px-4 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-stone-200 disabled:text-stone-400 text-white font-bold text-xs rounded-2xl transition-all flex items-center gap-1.5 shrink-0 shadow-xs active:scale-95"
        >
          <span>{translations.typeAlternativeButton}</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
      <p className="text-[11px] text-stone-400 mt-2 px-1">
        Type in your own language if you are in a noisy room or market.
      </p>
    </div>
  );
};
