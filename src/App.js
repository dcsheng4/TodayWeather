import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import SearchHistory from './components/SearchHistory';
import WeatherDisplay from './components/WeatherDisplay'; 
import './App.css'; // Assuming you have styles for dark and light modes

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle the dark mode
  const toggleTheme = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  return (
    <div className={darkMode ? 'container-dark-mode' : 'container-light-mode'}>
      <div className='container'>
        <button 
          onClick={toggleTheme} 
          className={`theme-toggle ${darkMode ? 'dark-mode-button' : 'light-mode-button'}`}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <SearchForm
          setWeatherData={setWeatherData}
          setHistory={setHistory}
          history={history}
        />
        <div className='weather-search-container'>
          <WeatherDisplay weatherData={weatherData} />
          <SearchHistory
            history={history}
            setWeatherData={setWeatherData}
            setHistory={setHistory}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
