import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for data fetching
import './styles.css'; // Ensure you import your styles
import { useRecoilValue } from 'recoil';
import { locationAtom } from '../atoms/atoms';

const NaturalDisasterWidget = () => {
  const [disasters, setDisasters] = useState([]);
  const location = useRecoilValue(locationAtom);
  const { lat, lon } = location;

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('https://ace-backend-eta.vercel.app/disasters', {
          params: {
            lat: lat,
            lng: lon,
          },
        });
        console.log("This is disasters data:", res.data);
        // Update the state to use the result from the response
        setDisasters(res.data.result || []); // Set to an empty array if result is undefined
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [lat, lon]);

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-white flex flex-col space-y-4 h-[445px] overflow-hidden">
      <div className="text-lg font-semibold">Natural Disasters</div>
      <div className="flex-1 overflow-auto custom-scrollbar">
        {disasters.length === 0 ? (
          <div className="text-center text-gray-400">No recent disasters</div>
        ) : (
          disasters.map((disaster) => (
            <div
              key={disaster.event_id}
              className="border-b border-gray-700 py-2 last:border-none"
            >
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-gray-400">{disaster.event_type ? disaster.event_type : 'N/A'}</span>
                <span className="text-lg font-semibold truncate">{disaster.event_name ? disaster.event_name : 'Unknown Event'}</span>
                <span className="text-xs text-gray-400">Date: {new Date(disaster.date).toLocaleDateString()}</span>
                <span className="text-xs text-gray-400">Location: {disaster.lat.toFixed(2)}, {disaster.lng.toFixed(2)}</span>
                <span className="text-xs text-gray-400">Created At: {new Date(disaster.created_time).toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NaturalDisasterWidget;
