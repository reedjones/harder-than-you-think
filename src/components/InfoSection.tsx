import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { InfoSection as InfoSectionType, MedicationInfo } from '../types/info';

interface InfoSectionProps {
  section: InfoSectionType;
  onBack: () => void;
}

export default function InfoSection({ section, onBack }: InfoSectionProps) {
  const [info, setInfo] = useState<MedicationInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const medicationType = formData.get('medicationType');

    try {
      // Simulated API call - replace with actual API endpoint
      const response = await fetch(`/api/medication-info/${medicationType}`);
      const data = await response.json();
      setInfo(data);
    } catch (error) {
      console.error('Error fetching medication info:', error);
      // For demo, show mock data
      setInfo({
        name: medicationType as string,
        type: 'Antiretroviral',
        description: 'This medication helps control HIV infection by preventing the virus from multiplying in your body.',
        dosage: 'Take one tablet daily with or without food.',
        sideEffects: [
          'Nausea',
          'Headache',
          'Fatigue',
          'Diarrhea'
        ],
        precautions: [
          'Take exactly as prescribed',
          'Do not skip doses',
          'Store at room temperature',
          'Report unusual symptoms to your healthcare provider'
        ],
        image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=800'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <h2 className="text-xl font-semibold mb-6">{section.label}</h2>

      {!info ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="medicationType" className="block text-sm font-medium text-gray-700 mb-1">
              Select Medication Type
            </label>
            <select
              id="medicationType"
              name="medicationType"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select a medication...</option>
              <option value="NRTI">NRTIs (Nucleoside Reverse Transcriptase Inhibitors)</option>
              <option value="NNRTI">NNRTIs (Non-nucleoside Reverse Transcriptase Inhibitors)</option>
              <option value="PI">PIs (Protease Inhibitors)</option>
              <option value="INSTI">INSTIs (Integrase Strand Transfer Inhibitors)</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Get Information'}
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          {info.image && (
            <img
              src={info.image}
              alt={info.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold mb-2">{info.name}</h3>
            <p className="text-gray-600 mb-4">{info.description}</p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-blue-900 mb-2">Dosage</h4>
              <p className="text-blue-800">{info.dosage}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Side Effects</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {info.sideEffects.map((effect, index) => (
                    <li key={index}>{effect}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Precautions</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {info.precautions.map((precaution, index) => (
                    <li key={index}>{precaution}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}