import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignUp from './SignUp';
import Header from './Header';
import HealthDataPage from './components/HealthData'; // Corrected import statement


function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [cityName, setCityName] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleCityNameChange = (event) => {
        setCityName(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const apiKey = '48e3aaf913c90b624d8126f2fe8f994f'; // Replace with your actual API key
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeatherData(null);
        }
    };

    const kelvinToCelsius = (kelvin) => {
        return (kelvin - 273.15).toFixed(2);
    };

    const formatDateTime = (date) => {
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    return (
        <Router>
            <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-100 p-8">
                <Header /> {/* Header component */}

                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/healthdata" element={<HealthDataPage />} />
                    <Route exact path="/" element={
                        <main className="grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        value={cityName}
                                        onChange={handleCityNameChange}
                                        placeholder="Enter City Name"
                                        className="border p-2 mr-2"
                                    />
                                    <button
                                        onClick={handleSearch}
                                        className="bg-blue-500 text-white p-2 rounded"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>

                            <section className="bg-white p-6 rounded-lg shadow-lg col-span-1">
                                <h2 className="text-gray-700 font-bold mb-4">Health Recommendations</h2>
                                <p className="text-gray-600 text-sm mb-4">
                                    .
                                </p>
                        
                                <Link to="/healthdata" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow-lg">
                                   Fill in
                                </Link>
                            </section>

                            <section className="bg-white p-6 rounded-lg shadow-lg col-span-1">
                                {weatherData ? (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2">Current Weather in {weatherData.name}</h2>
                                        <p className="mb-1">Time: {formatDateTime(currentDateTime)}</p>
                                        <p className="mb-1">Temperature: {kelvinToCelsius(weatherData.main.temp)} °C</p>
                                        <p className="mb-1">Weather: {weatherData.weather[0].main}</p>
                                        <p>Humidity: {weatherData.main.humidity}%</p>
                                    </div>
                                ) : (
                                    <p>No weather data to display. Please search for a city.</p>
                                )}
                            </section>
                        </main>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
