import React from 'react';
import { Clock, Trash2, Bell, CheckCircle } from 'lucide-react';
import { Reminder } from '../store/reminderStore';
import { format } from 'date-fns';

interface ReminderListProps {
  reminders: Reminder[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onTake: (id: string) => void;
}

export default function ReminderList({
  reminders,
  onToggle,
  onDelete,
  onTake,
}: ReminderListProps) {
  const formatTime = (time: string) => format(new Date(`2000-01-01T${time}`), 'h:mm a');

  const getReminderText = (reminder: Reminder) => {
    switch (reminder.type) {
      case 'specific':
        return `At ${formatTime(reminder.specificTime!)}`;
      case 'range':
        return `Between ${formatTime(reminder.timeRange!.start)} - ${formatTime(
          reminder.timeRange!.end
        )}`;
      case 'category':
        return `During ${reminder.category}`;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      {reminders.map((reminder) => (
        <div
          key={reminder.id}
          className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <div
              className={`p-2 rounded-full ${
                reminder.enabled ? 'bg-blue-100' : 'bg-gray-100'
              }`}
            >
              {reminder.type === 'specific' ? (
                <Clock className="w-6 h-6 text-blue-600" />
              ) : (
                <Bell className="w-6 h-6 text-blue-600" />
              )}
            </div>
            <div>
              <p className="font-medium">{getReminderText(reminder)}</p>
              {reminder.lastTaken && (
                <p className="text-sm text-gray-500">
                  Last taken: {format(new Date(reminder.lastTaken), 'MMM d, h:mm a')}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onTake(reminder.id)}
              className="p-2 text-green-600 hover:bg-green-50 rounded-full"
            >
              <CheckCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => onToggle(reminder.id)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                reminder.enabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  reminder.enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <button
              onClick={() => onDelete(reminder.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}