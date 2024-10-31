import React, { useState } from 'react';
import { Plus, Pill } from 'lucide-react';
import ReminderForm from './components/ReminderForm';
import ReminderList from './components/ReminderList';
import InfoLinkMenu from './components/InfoLinkMenu';
import InfoSection from './components/InfoSection';
import useReminderStore from './store/reminderStore';
import { InfoSection as InfoSectionType } from './types/info';

const infoSections: InfoSectionType[] = [
  {
    id: 'hiv-medication',
    link: '/info/hiv-medication',
    label: 'HIV Medication Information',
    description: 'Learn about different types of HIV medications, their effects, and usage guidelines',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=800'
  }
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [selectedSection, setSelectedSection] = useState<InfoSectionType | null>(null);
  const { reminders, addReminder, toggleReminder, updateLastTaken, deleteReminder } = useReminderStore();

  const handleSubmit = (data: any) => {
    addReminder(data);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Pill className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Med Reminder</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="w-5 h-5" />
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {showForm ? (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Add New Reminder</h2>
                <ReminderForm onSubmit={handleSubmit} />
              </div>
            ) : reminders.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-lg">
                <Pill className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No reminders set
                </h3>
                <p className="text-gray-500">
                  Click the plus button to add your first reminder
                </p>
              </div>
            ) : (
              <ReminderList
                reminders={reminders}
                onToggle={toggleReminder}
                onDelete={deleteReminder}
                onTake={updateLastTaken}
              />
            )}
          </div>

          <div>
            {selectedSection ? (
              <InfoSection
                section={selectedSection}
                onBack={() => setSelectedSection(null)}
              />
            ) : (
              <InfoLinkMenu
                sections={infoSections}
                onSectionSelect={setSelectedSection}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;