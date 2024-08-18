import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import axios from 'axios';

// Function to re-fetch weather data for a previously searched location
function SearchHistory({ history, setWeatherData, setHistory }) {
  const handleReSearch = async (city, country) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;

    
    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    }
  };

  const handleDelete = (index) => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);
  };

  return (
    <div className="search-history">
      <div className="search-history-list">
      <h3>Search History</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            <span>{`${item.city}, ${item.country}`}</span>
            <span>{item.time}</span>
            <Button icon className='iconButton' onClick={() => handleReSearch(item.city, item.country)}>
              <Icon name="search" />
            </Button>
            <Button icon className='iconButton' onClick={() => handleDelete(index)}>
              <Icon name="trash" />
            </Button>
          </li>
        ))}
      </ul>
      </div>

    </div>
  );
}

export default SearchHistory;
