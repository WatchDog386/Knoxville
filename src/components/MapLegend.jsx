import React from 'react';
import { motion } from 'framer-motion';

export const MapLegend = ({ theme, onClose }) => {
  const legendItems = [
    {
      color: 'bg-green-500',
      label: 'Coverage Available',
      description: 'Areas with active fiber network'
    },
    {
      color: 'bg-yellow-500',
      label: 'Coming Soon',
      description: 'Planned expansion areas'
    },
    {
      color: 'bg-red-500',
      label: 'No Coverage',
      description: 'Areas not currently served'
    },
    {
      color: 'bg-blue-500',
      label: 'Your Location',
      description: 'Your current position'
    }
  ];

  return (
    <motion.div
      className="absolute bottom-20 left-4 z-50 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white">Map Legend</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-white p-1 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          {legendItems.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`${item.color} w-4 h-4 rounded-full mt-1 flex-shrink-0`}></div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};