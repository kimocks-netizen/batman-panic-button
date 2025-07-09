// src/components/PanicButton.tsx
import { useState } from 'react';
import { sendPanic } from '../api/panic';
import { toast } from 'react-toastify';

const panicTypes = [
  'Emergency',
  'Bank Robbery',
  'Hostage Situation',
  'Terrorist Attack',
  'Assassination Attempt',
  'Mass Casualty Event'
];

export default function PanicButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [panicDetails, setPanicDetails] = useState('');
  const [selectedType, setSelectedType] = useState(panicTypes[0]);
  const [locationError, setLocationError] = useState('');

  const handleSendPanic = async () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setIsLoading(true);
    setLocationError('');

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          maximumAge: 0
        });
      });

      await sendPanic({
        longitude: position.coords.longitude.toString(),
        latitude: position.coords.latitude.toString(),
        panic_type: selectedType,
        details: panicDetails || 'Immediate assistance required!'
      });

      toast.success('🚨 Panic signal sent to Batman!', {
        position: 'top-center',
        autoClose: 3000,
        className: 'bg-green-100 text-green-800 font-bold'
      });

      // Reset form after successful submission
      setPanicDetails('');
      setSelectedType(panicTypes[0]);
    } catch (error) {
      let errorMessage = 'Failed to send panic signal';
      
      if (error instanceof GeolocationPositionError) {
        errorMessage = 'Please enable location permissions';
        setLocationError(errorMessage);
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, {
        position: 'top-center',
        className: 'bg-red-100 text-red-800 font-bold'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800">SEND PANIC SIGNAL</h2>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Emergency Type
        </label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          {panicTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Additional Details
        </label>
        <textarea
          value={panicDetails}
          onChange={(e) => setPanicDetails(e.target.value)}
          placeholder="Describe the emergency (e.g., 'The Joker has hostages at the bank')"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 min-h-[100px]"
        />
      </div>

      {locationError && (
        <p className="text-red-600 text-sm">{locationError}</p>
      )}

      <button
        onClick={handleSendPanic}
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-lg text-white font-bold shadow-md transition-all ${
          isLoading
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 transform hover:scale-[1.01]'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            SENDING...
          </span>
        ) : (
          '🚨 ACTIVATE BAT SIGNAL'
        )}
      </button>

      <p className="text-xs text-gray-500">
        Your location and these details will be sent directly to Batman.
        Only use for real emergencies.
      </p>
    </div>
  );
}