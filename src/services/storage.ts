import { BusinessProfile } from '../types/business';
import { LanguageCode, SUPPORTED_LANGUAGES } from '../types/language';
import { PRESET_PROFILES, INITIAL_EMPTY_PROFILE } from './profilePresets';

const STORAGE_KEY = 'udyog_mitra_business_profile_v1';
const LANGUAGE_STORAGE_KEY = 'udyog_mitra_selected_lang_v1';
const HISTORY_STORAGE_KEY = 'udyog_mitra_voice_history_v1';
const REMINDERS_STORAGE_KEY = 'udyog_mitra_reminders_v1';

export interface VoiceHistoryItem {
  id: string;
  userQuery: string;
  assistantResponse: string;
  timestamp: string;
  language: LanguageCode;
  source?: string;
}

export interface BusinessReminder {
  id: string;
  title: string;
  dueTime: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
}

/**
 * Loads the user's preferred language, defaulting to English or Hindi.
 */
export function loadSelectedLanguage(): LanguageCode {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
      return saved as LanguageCode;
    }
  } catch (e) {
    console.error('Failed to load language:', e);
  }
  return 'en'; // Default to English as explicitly requested
}

export function saveSelectedLanguage(lang: LanguageCode): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch (e) {
    console.error('Failed to save language:', e);
  }
}

/**
 * Loads the current active business profile.
 */
export function loadBusinessProfile(): BusinessProfile {
  if (typeof window === 'undefined') {
    return PRESET_PROFILES[0].profile;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.businessName === 'string') {
        return parsed as BusinessProfile;
      }
    }
  } catch (error) {
    console.error('Failed to load profile from localStorage:', error);
  }

  return PRESET_PROFILES[0].profile;
}

/**
 * Saves the business profile to persistent localStorage.
 */
export function saveBusinessProfile(profile: BusinessProfile): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const updated: BusinessProfile = {
      ...profile,
      updatedAt: new Date().toISOString(),
      isCompleted: Boolean(
        profile.businessName.trim() &&
        profile.ownerName.trim()
      ),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Failed to save profile to localStorage:', error);
    return false;
  }
}

/**
 * Resets profile to empty state.
 */
export function resetProfileToEmpty(): BusinessProfile {
  const fresh = {
    ...INITIAL_EMPTY_PROFILE,
    id: `biz_${Date.now()}`,
    updatedAt: new Date().toISOString(),
  };
  saveBusinessProfile(fresh);
  return fresh;
}

/**
 * Voice History storage
 */
export function loadVoiceHistory(): VoiceHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load voice history:', e);
  }
  return [
    {
      id: 'initial_demo_1',
      userQuery: 'Create a 10% discount WhatsApp offer for our shop',
      assistantResponse: 'Special weekend offer created for your customers with 10% discount. Ready to send on WhatsApp!',
      timestamp: new Date().toISOString(),
      language: 'en',
      source: 'welcome-demo',
    },
  ];
}

export function saveVoiceExchange(item: Omit<VoiceHistoryItem, 'id' | 'timestamp'>): VoiceHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = loadVoiceHistory();
    const newItem: VoiceHistoryItem = {
      ...item,
      id: `vh_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
    };
    const updated = [newItem, ...current.slice(0, 24)]; // Keep latest 25
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save voice exchange:', e);
    return [];
  }
}

export function clearVoiceHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear voice history:', e);
  }
}

/**
 * Reminders storage
 */
export function loadReminders(): BusinessReminder[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(REMINDERS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load reminders:', e);
  }
  return [
    {
      id: 'rem_1',
      title: 'Pay wholesale supplier invoice for spices',
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      dueTime: '11:00 AM',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'rem_2',
      title: 'Follow up on pending milk delivery stock',
      dueDate: new Date().toISOString().split('T')[0],
      dueTime: '06:00 PM',
      completed: true,
      createdAt: new Date().toISOString(),
    },
  ];
}

export function saveReminders(reminders: BusinessReminder[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(reminders));
  } catch (e) {
    console.error('Failed to save reminders:', e);
  }
}

export function addReminder(title: string, dueDate: string, dueTime: string): BusinessReminder[] {
  const current = loadReminders();
  const newItem: BusinessReminder = {
    id: `rem_${Date.now()}`,
    title,
    dueDate,
    dueTime,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  const updated = [newItem, ...current];
  saveReminders(updated);
  return updated;
}

export function toggleReminder(id: string): BusinessReminder[] {
  const current = loadReminders();
  const updated = current.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r));
  saveReminders(updated);
  return updated;
}

export function deleteReminder(id: string): BusinessReminder[] {
  const current = loadReminders();
  const updated = current.filter((r) => r.id !== id);
  saveReminders(updated);
  return updated;
}

/**
 * Calculates profile completeness score (0 to 100) and missing key fields.
 */
export function getProfileCompleteness(profile: BusinessProfile): {
  score: number;
  completedItems: string[];
  pendingItems: string[];
} {
  const checklist = [
    { label: 'Business Name', valid: Boolean(profile.businessName.trim()) },
    { label: 'Owner Name', valid: Boolean(profile.ownerName.trim()) },
    { label: 'Category & Location', valid: Boolean(profile.category && profile.city.trim()) },
    { label: 'Products & Services', valid: Boolean(profile.productsAndServices.trim().length >= 10) },
    { label: 'Target Customers', valid: Boolean(profile.targetCustomers.trim().length >= 10) },
    { label: 'Primary Goals', valid: profile.primaryGoals.length > 0 },
    { label: 'Contact or WhatsApp', valid: Boolean(profile.whatsappNumber.trim() || profile.contactNumber.trim()) },
    { label: 'Tagline or Brand Pitch', valid: Boolean(profile.tagline.trim()) },
  ];

  const completedItems = checklist.filter((c) => c.valid).map((c) => c.label);
  const pendingItems = checklist.filter((c) => !c.valid).map((c) => c.label);
  const score = Math.round((completedItems.length / checklist.length) * 100);

  return { score, completedItems, pendingItems };
}

/**
 * Exports profile as downloadable JSON file.
 */
export function exportProfileAsJSON(profile: BusinessProfile) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  const safeName = profile.businessName ? profile.businessName.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'business';
  downloadAnchor.setAttribute('download', `udyog_mitra_profile_${safeName}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

