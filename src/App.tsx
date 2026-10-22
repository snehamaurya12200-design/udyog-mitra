/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { BusinessProfile } from './types/business';
import { LanguageCode, TRANSLATIONS, SUPPORTED_LANGUAGES } from './types/language';
import {
  loadBusinessProfile,
  saveBusinessProfile,
  resetProfileToEmpty,
  loadSelectedLanguage,
  saveSelectedLanguage,
  loadVoiceHistory,
  saveVoiceExchange,
  VoiceHistoryItem,
} from './services/storage';
import {
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
  createSpeechRecognizer,
  speakText,
  stopSpeaking,
} from './services/speech';
import { ProfilePreset } from './services/profilePresets';
import { VoiceHero, VoiceState } from './components/voice/VoiceHero';
import { TaskShortcuts } from './components/voice/TaskShortcuts';
import { TextInputAlternative } from './components/voice/TextInputAlternative';
import { RecentExchangeCard } from './components/voice/RecentExchangeCard';
import { LanguageModal } from './components/voice/LanguageModal';
import { SimpleHelpModal } from './components/voice/SimpleHelpModal';
import { TaskModal, TaskKey } from './components/voice/TaskModal';
import { AndroidBottomBar, MobileTab } from './components/mobile/AndroidBottomBar';
import { TasksView } from './components/mobile/TasksView';
import { HistoryView } from './components/mobile/HistoryView';
import { SettingsView } from './components/mobile/SettingsView';
import { BusinessProfileForm } from './components/profile/BusinessProfileForm';
import { PresetSelectorModal } from './components/profile/PresetSelectorModal';
import { Globe2, HelpCircle, Store, X, ArrowLeft } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<BusinessProfile>(() => loadBusinessProfile());
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => loadSelectedLanguage());
  const [activeTab, setActiveTab] = useState<MobileTab>('home');
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [liveTranscript, setLiveTranscript] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isTypeInputOpen, setIsTypeInputOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);
  const [isShopProfileOpen, setIsShopProfileOpen] = useState(false);
  const [activeTaskModal, setActiveTaskModal] = useState<TaskKey | null>(null);

  // Conversation state
  const [historyItems, setHistoryItems] = useState<VoiceHistoryItem[]>(() => loadVoiceHistory());
  const [recentUserQuery, setRecentUserQuery] = useState(
    'Create a 10% discount WhatsApp offer for our shop'
  );
  const [recentAssistantResponse, setRecentAssistantResponse] = useState(
    'I have prepared a special 10% weekend discount offer for your customers. Ready to send on WhatsApp!'
  );

  const recognitionRef = useRef<any>(null);
  const translations = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage);

  // Sync language selection changes
  const handleLanguageChange = (newLang: LanguageCode) => {
    setCurrentLanguage(newLang);
    saveSelectedLanguage(newLang);
    setErrorMessage(null);
  };

  /**
   * Process a voice query: send to server /api/ai/chat and speak response aloud
   */
  const processQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    setRecentUserQuery(queryText);
    setVoiceState('processing');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText,
          language: currentLanguage,
          businessProfile: {
            businessName: profile.businessName,
            category: profile.category,
            city: profile.city,
            ownerName: profile.ownerName,
          },
        }),
      });

      let reply = '';
      if (response.ok) {
        const data = await response.json();
        reply = data.reply || '';
      } else {
        reply = `I understood: "${queryText}". Let me help you complete that task for ${profile.businessName}.`;
      }

      setRecentAssistantResponse(reply);

      // Save to history
      const updatedHistory = saveVoiceExchange({
        userQuery: queryText,
        assistantResponse: reply,
        language: currentLanguage,
      });
      setHistoryItems(updatedHistory);

      // Speak response aloud using SpeechSynthesis
      setVoiceState('speaking');
      speakText(
        reply,
        currentLanguage,
        () => setVoiceState('speaking'),
        () => setVoiceState('idle'),
        (err) => {
          console.warn('Speech playback notice:', err);
          setVoiceState('idle');
        }
      );
    } catch (e: any) {
      console.error('Failed to process voice query:', e);
      const fallbackMsg = `Understood: "${queryText}". Please check the options below.`;
      setRecentAssistantResponse(fallbackMsg);
      setVoiceState('idle');
    }
  };

  /**
   * Toggle Voice Listening via Web Speech Recognition
   */
  const handleMicClick = () => {
    // If speaking, stop playback
    if (voiceState === 'speaking') {
      stopSpeaking();
      setVoiceState('idle');
      return;
    }

    // If already listening, stop
    if (voiceState === 'listening') {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      setVoiceState('idle');
      return;
    }

    // Check browser speech recognition support
    if (!isSpeechRecognitionSupported()) {
      setErrorMessage(
        'Microphone speech recognition is not supported in this browser. Please use Chrome/Edge or type with the keyboard.'
      );
      setIsTypeInputOpen(true);
      return;
    }

    try {
      setErrorMessage(null);
      setLiveTranscript('');
      setVoiceState('listening');

      const recognizer = createSpeechRecognizer(
        currentLanguage,
        (transcript, isFinal) => {
          setLiveTranscript(transcript);
          if (isFinal) {
            setVoiceState('processing');
            processQuery(transcript);
          }
        },
        (errorText) => {
          setErrorMessage(errorText);
          setVoiceState('idle');
        },
        () => {
          setVoiceState((prev) => (prev === 'listening' ? 'idle' : prev));
        }
      );

      if (recognizer) {
        recognitionRef.current = recognizer;
        recognizer.start();
      }
    } catch (err: any) {
      console.error('Error starting speech recognition:', err);
      setErrorMessage('Could not open microphone. Please tap again and grant permission.');
      setVoiceState('idle');
    }
  };

  const handleStopSpeech = () => {
    stopSpeaking();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setVoiceState('idle');
  };

  const handleRepeatVoice = () => {
    if (!recentAssistantResponse) return;
    setVoiceState('speaking');
    speakText(
      recentAssistantResponse,
      currentLanguage,
      () => setVoiceState('speaking'),
      () => setVoiceState('idle'),
      () => setVoiceState('idle')
    );
  };

  const handleTextSubmit = (text: string) => {
    setIsTypeInputOpen(false);
    processQuery(text);
  };

  return (
    <div className="min-h-screen bg-stone-900/95 flex justify-center items-start sm:p-4 md:p-6 font-sans antialiased select-none">
      {/* Mobile iOS/Android Container (360-430px smartphone canvas) */}
      <div className="w-full sm:max-w-[420px] h-[100dvh] sm:h-[860px] sm:max-h-[94vh] bg-[#FAF8F5] flex flex-col sm:rounded-[40px] sm:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden border border-stone-200/80 relative">
        {/* iOS-Inspired Top App Bar */}
        <header className="sticky top-0 z-30 bg-[#FAF8F5]/85 backdrop-blur-xl border-b border-stone-200/60 px-4 py-3 shrink-0">
          <div className="flex items-center justify-between gap-2">
            {/* App Brand Lockup */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center font-extrabold text-base shadow-[0_4px_14px_rgba(245,158,11,0.25)] border border-white/20">
                उ
              </div>
              <div>
                <span className="text-base font-extrabold tracking-tight text-stone-900 block leading-tight">
                  Udyog Mitra
                </span>
                <span className="text-[11px] text-stone-500 font-medium block truncate max-w-[130px]">
                  {profile.businessName || 'Business Companion'}
                </span>
              </div>
            </div>

            {/* Language Selector Pill */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsLanguageModalOpen(true)}
                className="px-3 py-1.5 rounded-full border border-stone-200/90 bg-white/90 hover:bg-white text-stone-800 text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
                title="Change language"
              >
                <Globe2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="font-semibold text-stone-800">{currentLangObj?.nativeName || 'English'}</span>
              </button>

              <button
                onClick={() => setIsHelpModalOpen(true)}
                className="p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200/50 transition-colors"
                aria-label="Help"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Mobile App Body */}
        <main className="flex-1 overflow-y-auto px-4 py-3 space-y-4 overscroll-contain pb-28">
          {/* TAB 1: HOME (VOICE CENTER) */}
          {activeTab === 'home' && (
            <div className="space-y-4 pb-4">
              {/* Friendly Local Greeting */}
              <div className="text-center pt-1.5">
                <span className="text-xs font-bold text-amber-900 bg-amber-100/70 border border-amber-200/50 px-3 py-1 rounded-full inline-block mb-1.5 shadow-2xs">
                  {currentLangObj?.greetingWord}!
                </span>
                <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight leading-tight">
                  {currentLangObj?.greetingWord}, {profile.ownerName ? `${profile.ownerName} ji` : 'Welcome'}!
                </h1>
                <p className="text-xs text-stone-500 mt-0.5">
                  Your voice companion for {profile.businessName || 'your business'}
                </p>
              </div>

              {/* The Central Voice Hero & Microphone Button */}
              <VoiceHero
                voiceState={voiceState}
                onMicClick={handleMicClick}
                onStopClick={handleStopSpeech}
                onRepeatClick={handleRepeatVoice}
                onToggleTypeInput={() => setIsTypeInputOpen((prev) => !prev)}
                isTypeInputOpen={isTypeInputOpen}
                translations={translations}
                currentLanguage={currentLanguage}
                liveTranscript={liveTranscript}
                errorMessage={errorMessage}
                speechSupported={isSpeechRecognitionSupported()}
              />

              {/* Accessible Keyboard Text Alternative */}
              <TextInputAlternative
                isOpen={isTypeInputOpen}
                onClose={() => setIsTypeInputOpen(false)}
                onSubmitText={handleTextSubmit}
                translations={translations}
              />

              {/* Recent Voice Interaction */}
              <RecentExchangeCard
                userQuery={recentUserQuery}
                assistantResponse={recentAssistantResponse}
                onRepeatVoice={handleRepeatVoice}
                translations={translations}
              />

              {/* Quick Task Shortcuts Grid */}
              <TaskShortcuts
                translations={translations}
                onSelectTask={(taskKey) => {
                  if (taskKey === 'tasks_tab') {
                    setActiveTab('tasks');
                  } else {
                    setActiveTaskModal(taskKey as TaskKey);
                  }
                }}
              />
            </div>
          )}

          {/* TAB 2: TASKS */}
          {activeTab === 'tasks' && (
            <TasksView
              profile={profile}
              translations={translations}
              currentLanguage={currentLanguage}
              onVoiceTrigger={(prompt) => {
                setActiveTab('home');
                processQuery(prompt);
              }}
            />
          )}

          {/* TAB 3: HISTORY */}
          {activeTab === 'history' && (
            <HistoryView
              historyItems={historyItems}
              onClearHistory={() => setHistoryItems([])}
              translations={translations}
              currentLanguage={currentLanguage}
            />
          )}

          {/* TAB 4: SETTINGS */}
          {activeTab === 'settings' && (
            <SettingsView
              currentLanguage={currentLanguage}
              onSelectLanguage={handleLanguageChange}
              profile={profile}
              onOpenShopProfile={() => setIsShopProfileOpen(true)}
              onOpenPresets={() => setIsPresetModalOpen(true)}
              translations={translations}
            />
          )}
        </main>

        {/* Android Bottom Navigation Bar */}
        <AndroidBottomBar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          translations={translations}
        />

        {/* Language Selection Modal */}
        <LanguageModal
          isOpen={isLanguageModalOpen}
          onClose={() => setIsLanguageModalOpen(false)}
          currentLanguage={currentLanguage}
          onSelectLanguage={handleLanguageChange}
        />

        {/* Simple 3-Step Help Modal */}
        <SimpleHelpModal
          isOpen={isHelpModalOpen}
          onClose={() => setIsHelpModalOpen(false)}
          translations={translations}
        />

        {/* Task Detail Modal */}
        <TaskModal
          taskKey={activeTaskModal}
          onClose={() => setActiveTaskModal(null)}
          profile={profile}
          translations={translations}
          currentLanguage={currentLanguage}
          onTriggerVoiceQuery={(query, mockResp) => {
            setActiveTaskModal(null);
            processQuery(query);
          }}
          onOpenProfileSetup={() => setIsShopProfileOpen(true)}
        />

        {/* Shop Profile Modal (Preserved & accessible) */}
        {isShopProfileOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-sm w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-amber-600" />
                  <h2 className="text-sm font-bold text-slate-900">
                    {translations.taskShopTitle}
                  </h2>
                </div>
                <button
                  onClick={() => setIsShopProfileOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto">
                <BusinessProfileForm
                  profile={profile}
                  onSave={(updated) => {
                    setProfile(updated);
                    saveBusinessProfile(updated);
                    setIsShopProfileOpen(false);
                  }}
                  onOpenPresets={() => {
                    setIsShopProfileOpen(false);
                    setIsPresetModalOpen(true);
                  }}
                  onReset={() => {
                    if (window.confirm('Reset shop details to empty?')) {
                      const empty = resetProfileToEmpty();
                      setProfile(empty);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Preset Selector Modal */}
        <PresetSelectorModal
          isOpen={isPresetModalOpen}
          onClose={() => setIsPresetModalOpen(false)}
          onSelectPreset={(preset) => {
            const updated = { ...preset.profile, updatedAt: new Date().toISOString() };
            setProfile(updated);
            saveBusinessProfile(updated);
          }}
          onResetClean={() => {
            const empty = resetProfileToEmpty();
            setProfile(empty);
          }}
          currentProfileId={profile.id}
        />
      </div>
    </div>
  );
}
