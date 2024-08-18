import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';

function SearchForm({ setWeatherData, setHistory, history }) {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  // Function to handle the search action
  const handleSearch = useCallback(async () => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      setError(''); // Clear any previous errors if the request is successful

      const newEntry = {
        city,
        country,
        time: new Date().toLocaleString('en-GB', {
          hour12: true,
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }).replace(',', ''),
      };

      // Update search history with the new entry
      setHistory([...history, newEntry]);
    } catch (error) {
      // Set an error message if the API request fails
      setError('Invalid city or country name. Please try again.');
    }
  }, [city, country, setWeatherData, history, setHistory]);

  return (
    <div className="search-form">
      <div className="search-input-container">
        <div className="search-input-wrapper">
          <div className="search-input-group">
            <input
              className="search-input"
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <span className="separator">|</span>
            <input
              className="search-input"
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <Button primary className="search-icon-button" onClick={handleSearch}>
            <i className="search icon" />
          </Button>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default SearchForm;
