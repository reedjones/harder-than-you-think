import React from 'react';
import { Info } from 'lucide-react';
import { InfoSection } from '../types/info';

interface InfoLinkMenuProps {
  sections: InfoSection[];
  onSectionSelect: (section: InfoSection) => void;
}

export default function InfoLinkMenu({ sections, onSectionSelect }: InfoLinkMenuProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Info className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Information Center</h2>
      </div>
      <div className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionSelect(section)}
            className="w-full text-left p-3 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <div className="font-medium text-gray-900">{section.label}</div>
            {section.description && (
              <div className="text-sm text-gray-500 mt-1">{section.description}</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}