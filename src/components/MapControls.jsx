import React from 'react';
import PropTypes from 'prop-types';
import { FiMap, FiEye, FiEyeOff, FiCompass, FiX } from 'react-icons/fi';

const MapControls = ({
  showLegend,
  setShowLegend,
  kmlVisible,
  toggleKmlVisibility,
  centerOnUserLocation,
  userLocation,
  locationError,
  isLocating,
}) => {
  return (
    <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 flex flex-col space-y-2">
        {/* Toggle KML Layer */}
        <button
          onClick={toggleKmlVisibility}
          className="flex items-center space-x-2 px-2 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-sm text-gray-800 dark:text-gray-200 transition-colors"
        >
          {kmlVisible ? <FiEyeOff /> : <FiEye />}
          <span>{kmlVisible ? 'Hide Coverage' : 'Show Coverage'}</span>
        </button>

        {/* Toggle Legend */}
        <button
          onClick={() => setShowLegend(!showLegend)}
          className="flex items-center space-x-2 px-2 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-sm text-gray-800 dark:text-gray-200 transition-colors"
        >
          <FiMap />
          <span>{showLegend ? 'Hide Legend' : 'Show Legend'}</span>
        </button>

        {/* Locate Me Button */}
        <button
          onClick={centerOnUserLocation}
          disabled={isLocating}
          className={`flex items-center space-x-2 px-2 py-1 rounded text-sm transition-colors ${
            isLocating
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
              : 'bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300'
          }`}
        >
          <FiCompass className={isLocating ? 'animate-spin' : ''} />
          <span>{isLocating ? 'Locating...' : 'Locate Me'}</span>
        </button>
      </div>

      {/* Error Message */}
      {locationError && (
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg shadow-lg p-2 flex items-start space-x-2 max-w-xs">
          <FiX className="flex-shrink-0 mt-0.5" />
          <span className="text-sm">{locationError}</span>
        </div>
      )}

      {/* User Location Display */}
      {userLocation && (
        <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg shadow-lg p-2 mt-2 max-w-xs text-sm">
          Location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
        </div>
      )}
    </div>
  );
};

MapControls.propTypes = {
  showLegend: PropTypes.bool.isRequired,
  setShowLegend: PropTypes.func.isRequired,
  kmlVisible: PropTypes.bool.isRequired,
  toggleKmlVisibility: PropTypes.func.isRequired,
  centerOnUserLocation: PropTypes.func.isRequired,
  userLocation: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  locationError: PropTypes.string,
  isLocating: PropTypes.bool.isRequired,
};

export default MapControls;
