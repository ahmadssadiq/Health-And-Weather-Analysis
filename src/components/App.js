/* 
Imports HealthData and Index
 Two pieces of state are defined using useState: weatherData and healthData.
Functions fetchWeather and fetchHealth are defined to fetch data from APIs.
 */


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import HealthData from './HealthData';
import Index from './Index';

// Import API functions
import { getHealthData } from './healthStatsAPI';
import { getWeatherData } from './weatherAPI';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [healthData, setHealthData] = useState(null);

    // Fetch weather data example
    const fetchWeather = async (city) => {
        try {
            const data = await getWeatherData(city);
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    // Fetch health data example
    const fetchHealth = async (parameters) => {
        try {
            const data = await getHealthData(parameters);
            setHealthData(data);
        } catch (error) {
            console.error('Error fetching health data:', error);
        }
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index fetchWeather={fetchWeather} />} />
                <Route path="/health-data" element={<HealthData fetchHealth={fetchHealth} />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
