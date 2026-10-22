import React from 'react';
import { UiTranslations } from '../../types/language';
import {
  Megaphone,
  TrendingUp,
  ReceiptText,
  Clock,
  HelpCircle,
  ClipboardList,
  ArrowRight,
} from 'lucide-react';

export type TaskShortcutKey = 'offer' | 'profit' | 'payment' | 'reminder' | 'explain' | 'tasks_tab';

interface TaskShortcutsProps {
  translations: UiTranslations;
  onSelectTask: (taskKey: TaskShortcutKey) => void;
}

export const TaskShortcuts: React.FC<TaskShortcutsProps> = ({
  translations,
  onSelectTask,
}) => {
  const shortcuts: {
    key: TaskShortcutKey;
    title: string;
    label: string;
    icon: React.ReactNode;
    bgClass: string;
    borderClass: string;
    iconColor: string;
    badgeText: string;
  }[] = [
    {
      key: 'offer',
      title: 'Create an Advertisement',
      label: translations.taskWhatsAppTitle,
      icon: <Megaphone className="w-5 h-5 text-emerald-700" />,
      bgClass: 'bg-emerald-50/70 hover:bg-emerald-100/70',
      borderClass: 'border-emerald-200/80',
      iconColor: 'bg-emerald-100',
      badgeText: 'WhatsApp',
    },
    {
      key: 'profit',
      title: 'Calculate Profit',
      label: translations.taskProfitTitle,
      icon: <TrendingUp className="w-5 h-5 text-sky-700" />,
      bgClass: 'bg-sky-50/70 hover:bg-sky-100/70',
      borderClass: 'border-sky-200/80',
      iconColor: 'bg-sky-100',
      badgeText: 'Sales & Math',
    },
    {
      key: 'payment',
      title: 'Message a Customer',
      label: translations.taskReminderTitle,
      icon: <ReceiptText className="w-5 h-5 text-amber-700" />,
      bgClass: 'bg-amber-50/70 hover:bg-amber-100/70',
      borderClass: 'border-amber-200/80',
      iconColor: 'bg-amber-100',
      badgeText: 'Payment',
    },
    {
      key: 'reminder',
      title: 'Set a Reminder',
      label: translations.taskAlarmReminderTitle,
      icon: <Clock className="w-5 h-5 text-purple-700" />,
      bgClass: 'bg-purple-50/70 hover:bg-purple-100/70',
      borderClass: 'border-purple-200/80',
      iconColor: 'bg-purple-100',
      badgeText: 'Alarm',
    },
    {
      key: 'explain',
      title: 'Explain Something',
      label: translations.taskExplainTitle,
      icon: <HelpCircle className="w-5 h-5 text-yellow-800" />,
      bgClass: 'bg-yellow-50/70 hover:bg-yellow-100/70',
      borderClass: 'border-yellow-200/80',
      iconColor: 'bg-yellow-100',
      badgeText: 'Knowledge',
    },
    {
      key: 'tasks_tab',
      title: 'View My Tasks',
      label: translations.navTasks,
      icon: <ClipboardList className="w-5 h-5 text-stone-700" />,
      bgClass: 'bg-stone-100/70 hover:bg-stone-200/70',
      borderClass: 'border-stone-200/80',
      iconColor: 'bg-stone-200',
      badgeText: 'Overview',
    },
  ];

  return (
    <div className="w-full space-y-3 pt-1">
      {/* Friendly Section Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="text-sm font-extrabold text-stone-900 tracking-tight">
            What would you like to do?
          </h3>
          <p className="text-[11px] text-stone-500 font-medium">
            Tap a quick action or ask with voice.
          </p>
        </div>
      </div>

      {/* Responsive 2-Column Rounded Tiles */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {shortcuts.map((sc) => (
          <button
            key={sc.key}
            onClick={() => onSelectTask(sc.key)}
            className={`p-3.5 sm:p-4 rounded-[24px] border text-left transition-all duration-150 active:scale-[0.96] flex flex-col justify-between shadow-2xs group min-h-[96px] ${sc.bgClass} ${sc.borderClass}`}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${sc.iconColor}`}>
                {sc.icon}
              </div>
              <span className="text-[10px] font-bold text-stone-500/80 uppercase tracking-wider">
                {sc.badgeText}
              </span>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug group-hover:text-amber-800 transition-colors">
                {sc.label}
              </h4>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
