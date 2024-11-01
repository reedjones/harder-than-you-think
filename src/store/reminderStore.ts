import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import localforage from 'localforage';
import { showNotification } from '../services/notifications';
import { format, parse, isWithinInterval, addMinutes } from 'date-fns';

export type TimeRange = {
  start: string;
  end: string;
};

export type ReminderType = 'specific' | 'range' | 'category';

export interface Reminder {
  id: string;
  type: ReminderType;
  specificTime?: string;
  timeRange?: TimeRange;
  category?: 'morning' | 'afternoon' | 'evening' | 'night';
  enabled: boolean;
  lastTaken?: string;
  nextReminder?: string;
}

const CATEGORY_TIMES = {
  morning: { start: '06:00', end: '10:00' },
  afternoon: { start: '12:00', end: '14:00' },
  evening: { start: '17:00', end: '19:00' },
  night: { start: '20:00', end: '23:00' },
};

interface ReminderStore {
  reminders: Reminder[];
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  toggleReminder: (id: string) => void;
  updateLastTaken: (id: string) => void;
  deleteReminder: (id: string) => void;
  checkReminders: () => void;
}

const shouldNotifyForReminder = (reminder: Reminder): boolean => {
  if (!reminder.enabled) return false;

  const now = new Date();
  const currentTime = format(now, 'HH:mm');

  // If medication was taken in the last 4 hours, don't notify
  if (reminder.lastTaken) {
    const lastTaken = new Date(reminder.lastTaken);
    const fourHoursAgo = addMinutes(now, -240);
    if (lastTaken > fourHoursAgo) return false;
  }

  switch (reminder.type) {
    case 'specific': {
      return currentTime === reminder.specificTime;
    }
    case 'range': {
      const start = parse(reminder.timeRange!.start, 'HH:mm', now);
      const end = parse(reminder.timeRange!.end, 'HH:mm', now);
      return isWithinInterval(now, { start, end });
    }
    case 'category': {
      const times = CATEGORY_TIMES[reminder.category!];
      const start = parse(times.start, 'HH:mm', now);
      const end = parse(times.end, 'HH:mm', now);
      return isWithinInterval(now, { start, end });
    }
    default:
      return false;
  }
};

// const useReminderStore = create<ReminderStore>()(
//   persist(
//     (set, get) => ({
//       reminders: [],
//       addReminder: (reminder) =>
//         set((state) => ({
//           reminders: [...state.reminders, { ...reminder, id: crypto.randomUUID() }],
//         })),
//       toggleReminder: (id) =>
//         set((state) => ({
//           reminders: state.reminders.map((r) =>
//             r.id === id ? { ...r, enabled: !r.enabled } : r
//           ),
//         })),
//       updateLastTaken: (id) =>
//         set((state) => ({
//           reminders: state.reminders.map((r) =>
//             r.id === id ? { ...r, lastTaken: new Date().toISOString() } : r
//           ),
//         })),
//       deleteReminder: (id) =>
//         set((state) => ({
//           reminders: state.reminders.filter((r) => r.id !== id),
//         })),
//       checkReminders: () => {
//         const { reminders } = get();
//         reminders.forEach((reminder) => {
//           if (shouldNotifyForReminder(reminder)) {
//             showNotification('Medication Reminder', {
//               body: 'It\'s time to take your medication',
//               data: { reminderId: reminder.id },
//               actions: [
//                 {
//                   action: 'take',
//                   title: 'Take Now',
//                 },
//                 {
//                   action: 'snooze',
//                   title: 'Snooze',
//                 },
//               ],
//             });
//           }
//         });
//       },
//     }),
//     {
//       name: 'hiv-med-reminders',
//       storage: {
//         getItem: async (name) => {
//           const value = await localforage.getItem(name);
//           return value ?? null;
//         },
//         setItem: async (name, value) => {
//           await localforage.setItem(name, value);
//         },
//         removeItem: async (name) => {
//           await localforage.removeItem(name);
//         },
//       },
//     }
//   )
// );



const useReminderStore = create<ReminderStore>()(
  persist(
    (set, get) => ({
      reminders: [],
      addReminder: (reminder) =>
        set((state) => ({
          reminders: [...state.reminders, { ...reminder, id: crypto.randomUUID() }],
        })),
      toggleReminder: (id) =>
        set((state) => ({
          reminders: state.reminders.map((r) =>
            r.id === id ? { ...r, enabled: !r.enabled } : r
          ),
        })),
      updateLastTaken: (id) =>
        set((state) => ({
          reminders: state.reminders.map((r) =>
            r.id === id ? { ...r, lastTaken: new Date().toISOString() } : r
          ),
        })),
      deleteReminder: (id) =>
        set((state) => ({
          reminders: state.reminders.filter((r) => r.id !== id),
        })),
      checkReminders: () => {
        const { reminders } = get();
        reminders.forEach((reminder) => {
          if (shouldNotifyForReminder(reminder)) {
            showNotification('Medication Reminder', {
              body: 'It\'s time to take your medication',
              data: { reminderId: reminder.id },
              actions: [
                {
                  action: 'take',
                  title: 'Take Now',
                },
                {
                  action: 'snooze',
                  title: 'Snooze',
                },
              ],
            });
          }
        });
      },
    }),
    {
      name: 'hiv-med-reminders',
      partialize: (state) => ({ reminders: state.reminders }), // Persist only `reminders`
      storage: {
        getItem: async (name) => {
          const value = await localforage.getItem(name);
          return value ?? null;
        },
        setItem: async (name, value) => {
          await localforage.setItem(name, value);
        },
        removeItem: async (name) => {
          await localforage.removeItem(name);
        },
      },
    }
  )
);

// Start checking reminders every minute
setInterval(() => {
  useReminderStore.getState().checkReminders();
}, 60000);

export default useReminderStore;