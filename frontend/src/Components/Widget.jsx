import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { locationAtom } from '../atoms/atoms';
import axios from 'axios';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const location = useRecoilValue(locationAtom);
  const { lat, lon } = location;

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('https://ace-backend-eta.vercel.app/weather', {
          params: {
            lat: lat,
            lng: lon
          }
        });
        console.log("This is data:", res.data);
        setWeatherData(res.data.data); // Adjust path if necessary
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [lat, lon]);

  // Return loading state if data is not yet available
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  // Destructure the weatherData object
  const {
    temperature,
    apparentTemperature,
    dewPoint,
    humidity,
    pressure,
    windSpeed,
    windGust,
    windBearing,
    cloudCover,
    precipIntensity,
    uvIndex,
    ozone,
    visibility,
    summary
  } = weatherData;

  // Determine animation class based on weather
  const getAnimationClass = (summary) => {
    if (summary.includes("Clear")) return "animate-clear";
    if (summary.includes("Rain")) return "animate-rain";
    if (summary.includes("Cloudy")) return "animate-cloudy";
    // Add more conditions as needed
    return "";
  };

  return (
    <div className={`bg-gray-800 p-10 rounded-xl shadow-lg text-white flex flex-col space-y-5 ${getAnimationClass(summary)}`}>
      <div className="text-lg font-semibold">{summary || 'No data available'}</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Temperature</span>
          <span className="text-xl font-bold">{temperature !== undefined ? `${temperature}°F` : 'N/A'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Feels Like</span>
          <span className="text-xl font-bold">{apparentTemperature !== undefined ? `${apparentTemperature}°F` : 'N/A'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Dew Point</span>
          <span className="text-xl font-bold">{dewPoint !== undefined ? `${dewPoint}°F` : 'N/A'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Humidity</span>
          <span className="text-xl font-bold">{humidity !== undefined ? `${humidity}%` : 'N/A'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Pressure</span>
          <span className="text-xl font-bold">{pressure !== undefined ? `${pressure} mb` : 'N/A'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Wind Speed</span>
          <span className="text-xl font-bold">{windSpeed !== undefined ? `${windSpeed} mph` : 'N/A'}</span>
        </div>
        {windGust !== undefined && (
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Wind Gust</span>
            <span className="text-xl font-bold">{`${windGust} mph`}</span>
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Wind Bearing</span>
          <span className="text-xl font-bold">{windBearing !== undefined ? `${windBearing}°` : 'N/A'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Cloud Cover</span>
          <span className="text-xl font-bold">{cloudCover !== undefined ? `${cloudCover * 100}%` : 'N/A'}</span>
        </div>
        {precipIntensity !== undefined && (
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Precipitation</span>
            <span className="text-xl font-bold">{`${precipIntensity} mm/hr`}</span>
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">UV Index</span>
          <span className="text-xl font-bold">{uvIndex !== undefined ? uvIndex : 'N/A'}</span>
        </div>
        {ozone !== undefined && (
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Ozone</span>
            <span className="text-xl font-bold">{ozone}</span>
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Visibility</span>
          <span className="text-xl font-bold">{visibility !== undefined ? `${visibility} meters` : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
