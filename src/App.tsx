import React, { useEffect, useState } from 'react';
import { Plus, Pill } from 'lucide-react';
import ReminderForm from './components/ReminderForm';
import ReminderList from './components/ReminderList';
import InfoLinkMenu from './components/InfoLinkMenu';
import InfoSection from './components/InfoSection';
import useReminderStore from './store/reminderStore';
import { InfoSection as InfoSectionType } from './types/info';

import { ToastContainer, toast } from 'react-toastify';


import { requestNotificationPermission } from './notify';
import { showNotification } from './services/notifications';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      "locator-widget": any;
    }
  }
}


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

  useEffect(() => {

    toast.info('Welcome');

  }, []);


  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (data: any) => {
    addReminder(data);
    setShowForm(false);
  };






  function showNativeNote(event) {
    console.log(event)
    showNotification("hey there!", {
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
    })
  }


  const MainAppPage: React.FC = () => {
    const d = `
    But it doesn’t have to be difficult. Our app is here to keep you on track,
    day by day, dose by dose. 🕗`;
    return (
      <div className="flex flex-col">
        <header className="flex justify-center items-center py-6">
          <img src="/image.png" alt="Logo" className="h-96" />
        </header>
        <main className="flex flex-grow justify-center items-center">
          <div className='flex flex-col'>
            <h1 className="bg-gradient-to-r
             from-red-500 
              via-green-500
              to-indigo-400 
            
hover:from-pink-300 hover:via-green-500 hover:to-blue-400
              inline-block 
              text-transparent bg-clip-text text-6xl font-bold">
              Managing your <br></br>HIV medication<br></br> is crucial
            </h1>

            <p className="text-xl text-wrap md:text-balance text-white mt-2">{d}</p>
            <br />



          </div>
        </main>
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-#141414" style={{ "backgroundColor": "#141414" }}>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <div className="max-w-4xl mx-auto p-4">
        <header className="flex items-center justify-between mb-8">
          <MainAppPage />
          <div className="flex items-center space-x-2">
            <Pill className="w-8 h-8 text-blue-600" />



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
            <div className="bg-white">
              <h1>Resources</h1>
              <locator-widget></locator-widget>
            </div>
          </div>
          <div>
            <article className="text-pretty text-white">
              <h2 className="font-bold p-2 text-3xl">
                Because Taking Care of Yourself Shouldn’t Be Harder Than You Think.
              </h2>
              <div className="max-w-3xl text-white">
                <h2 className="text-2xl font-bold mb-4 text-white">Managing your HIV medication is crucial, but it doesn’t have to be difficult.</h2>
                <p className="text-lg text-white-700 mb-8">Our app is here to keep you on track, day by day, dose by dose.</p>

                <section className="space-y-6">

                  <h3 className="text-xl font-semibold">Reliable Reminders, Right on Time:</h3>
                  <p className="text-white-600">Never miss a dose. Customize reminders to fit your schedule, so you can focus on living life to the fullest.</p>

                  <h3 className="text-xl font-semibold">Your Health, Your Data:</h3>
                  <p className="text-white-600">Keep track of your progress, view adherence streaks, and celebrate milestones. All your health data is securely stored and fully private.</p>

                  <h3 className="text-xl font-semibold">Motivational Check-Ins:</h3>
                  <p className="text-white">We know it’s not always easy. Get encouragement and health tips to help keep you motivated through the journey.</p>

                  <h3 className="text-xl font-semibold">Support in Your Pocket:</h3>
                  <p className="text-white">Have questions or need assistance? Access trusted HIV resources and support services directly from the app.</p>

                </section>
              </div>

              <button onClick={requestNotificationPermission}>
                Enable Notifications
              </button>
              <button onClick={showNativeNote}>Native Notifcation</button>
              <h1 className="text-2xl font-bold text-blue-400">
                Harder Than You Think
              </h1>
            </article>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;