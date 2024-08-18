import React from 'react';

// Function To Display Weather Information
function WeatherDisplay({ weatherData }) {
  if (!weatherData) return null;

  const formattedLocation = weatherData.name && weatherData.sys.country
    ? `${weatherData.name}, ${weatherData.sys.country}`
    : weatherData.name || weatherData.sys.country || "Location not available";

  const formattedDate = new Date().toLocaleString('en-GB', {
    hour12: true,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).replace(',', '');

  return (
    <div className="weather-details">
      <h3>Today's Weather</h3>
      <p className="weather-details-temperature">{weatherData.main.temp}°</p>

      <div className="info-row">
        <p>
          <strong>{formattedLocation}</strong>
        </p>
        <p>{formattedDate}</p>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>{weatherData.weather[0].description}</p>
      </div>
    </div>
  );
}

export default WeatherDisplay;
