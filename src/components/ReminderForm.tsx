import React, { useState } from 'react';
import { Clock, Calendar, Bell } from 'lucide-react';
import { ReminderType } from '../store/reminderStore';

interface ReminderFormProps {
  onSubmit: (data: any) => void;
}

export default function ReminderForm({ onSubmit }: ReminderFormProps) {
  const [type, setType] = useState<ReminderType>('specific');
  const [specificTime, setSpecificTime] = useState('09:00');
  const [timeRange, setTimeRange] = useState({ start: '09:00', end: '13:00' });
  const [category, setCategory] = useState('morning');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      type,
      specificTime: type === 'specific' ? specificTime : undefined,
      timeRange: type === 'range' ? timeRange : undefined,
      category: type === 'category' ? category : undefined,
      enabled: true,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setType('specific')}
            className={`flex-1 p-4 rounded-lg border ${
              type === 'specific'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            }`}
          >
            <Clock className="mx-auto mb-2" />
            <div className="text-sm font-medium">Specific Time</div>
          </button>
          <button
            type="button"
            onClick={() => setType('range')}
            className={`flex-1 p-4 rounded-lg border ${
              type === 'range'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            }`}
          >
            <Calendar className="mx-auto mb-2" />
            <div className="text-sm font-medium">Time Range</div>
          </button>
          <button
            type="button"
            onClick={() => setType('category')}
            className={`flex-1 p-4 rounded-lg border ${
              type === 'category'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            }`}
          >
            <Bell className="mx-auto mb-2" />
            <div className="text-sm font-medium">Category</div>
          </button>
        </div>

        {type === 'specific' && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Time
            </label>
            <input
              type="time"
              value={specificTime}
              onChange={(e) => setSpecificTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}

        {type === 'range' && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                value={timeRange.start}
                onChange={(e) =>
                  setTimeRange({ ...timeRange, start: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Time
              </label>
              <input
                type="time"
                value={timeRange.end}
                onChange={(e) =>
                  setTimeRange({ ...timeRange, end: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {type === 'category' && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Set Reminder
      </button>
    </form>
  );
}