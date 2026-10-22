import { LanguageCode } from '../types/language';

// Declare Web Speech API types for TypeScript
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export const LANGUAGE_LOCALE_MAP: Record<LanguageCode, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  bn: 'bn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  kn: 'kn-IN',
};

/**
 * Checks if Speech Recognition is supported in the current browser/webview.
 */
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  const win = window as unknown as IWindow;
  return Boolean(win.SpeechRecognition || win.webkitSpeechRecognition);
}

/**
 * Checks if Speech Synthesis (TTS) is supported.
 */
export function isSpeechSynthesisSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return typeof window.speechSynthesis !== 'undefined' && typeof SpeechSynthesisUtterance !== 'undefined';
}

/**
 * Factory for creating configured SpeechRecognition instance
 */
export function createSpeechRecognizer(
  language: LanguageCode,
  onResult: (transcript: string, isFinal: boolean) => void,
  onError: (errorText: string) => void,
  onEnd: () => void
) {
  if (!isSpeechRecognitionSupported()) {
    onError('Speech recognition is not supported in this browser. Please use Google Chrome, Edge, or use text typing.');
    return null;
  }

  const win = window as unknown as IWindow;
  const SpeechRecClass = win.SpeechRecognition || win.webkitSpeechRecognition;
  const recognition = new SpeechRecClass();

  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = LANGUAGE_LOCALE_MAP[language] || 'en-IN';
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: any) => {
    let interim = '';
    let final = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final += event.results[i][0].transcript;
      } else {
        interim += event.results[i][0].transcript;
      }
    }

    if (final) {
      onResult(final.trim(), true);
    } else if (interim) {
      onResult(interim.trim(), false);
    }
  };

  recognition.onerror = (event: any) => {
    let msg = 'Could not hear clearly. Please tap the mic and try again.';
    if (event.error === 'not-allowed') {
      msg = 'Microphone permission was denied. Please allow microphone access in your phone browser settings to speak.';
    } else if (event.error === 'no-speech') {
      msg = 'No speech was detected. Please tap the mic and speak a little louder.';
    } else if (event.error === 'network') {
      msg = 'Network error while recognizing speech. Please check your internet connection.';
    } else if (event.error === 'language-not-supported') {
      msg = `Speech recognition in ${language} is not supported by your phone browser. Try Hindi or English.`;
    }
    onError(msg);
  };

  recognition.onend = () => {
    onEnd();
  };

  return recognition;
}

/**
 * Speaks text aloud in the target language using browser speech synthesis.
 */
export function speakText(
  text: string,
  language: LanguageCode,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: string) => void
): boolean {
  if (!isSpeechSynthesisSupported()) {
    onError?.('Speech playback is not supported on this browser.');
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLocale = LANGUAGE_LOCALE_MAP[language] || 'en-IN';
    utterance.lang = targetLocale;
    utterance.rate = 0.95; // Slightly slower for clear, accessible comprehension
    utterance.pitch = 1.0;

    // Attempt to match an installed voice for this language
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(
      (v) =>
        v.lang === targetLocale ||
        v.lang.startsWith(targetLocale.slice(0, 2)) ||
        v.lang.toLowerCase().includes(language)
    );

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = (event) => {
      console.warn('SpeechSynthesis error:', event);
      onEnd?.();
      onError?.('Could not speak audio. Please read the message text on screen.');
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (e: any) {
    console.error('Failed to trigger speech synthesis:', e);
    onError?.(e.message || 'Error playing speech');
    return false;
  }
}

/**
 * Stops any active speech playback immediately.
 */
export function stopSpeaking(): void {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}
