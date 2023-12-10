// App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignUp from './SignUp';
import Header from './Header';
import HealthData from './components/HealthData';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [cityName, setCityName] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [userHealthData, setUserHealthData] = useState({ category: '', details: '' });


    // Removed references to healthData since it's not defined or used

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    
    
    // Define handleAnalyzeHealthData function here
    const handleAnalyzeHealthData = (data) => {
        setUserHealthData(data);
        // Here, you could also make an API call to analyze the health data
    };


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

    const generateCombinedMessage = () => {
        if (!userHealthData.category || !weatherData) return '';

        // Start the message
        let message = `Based on the fact that your condition is ${userHealthData.category}, specifically ${userHealthData.details}, and because you are in ${weatherData.name}, `;

        // Add specific recommendations
        message += getHealthRecommendations(userHealthData.category, weatherData);

        return message;
    };

    // Function to get health recommendations based on condition and weather
    const getHealthRecommendations = (condition, weather) => {
        // Define the threshold values for different weather parameters
        const tempCelsius = weather.main.temp - 273.15; // Convert Kelvin to Celsius
        const humidity = weather.main.humidity;
        const weatherMain = weather.weather[0].main; // Main weather condition

        // Conditions and recommendations
        const conditions = {
            'Respiratory Disorders': tempCelsius < 0 || humidity > 60 || ['Rain', 'Wind'].includes(weatherMain),
            'Cardiovascular Diseases': tempCelsius < 0 || tempCelsius > 32 || humidity > 60,
            'Arthritis and Musculoskeletal Conditions': tempCelsius < 10 || humidity > 60,
            'Migraines/Headaches': (tempCelsius < 0 || tempCelsius > 32) && humidity > 80,
            'Allergies': tempCelsius > 21 && (humidity < 40 || ['Rain', 'Wind'].includes(weatherMain)),
            'Skin Conditions': (tempCelsius < 0 && humidity < 30) || humidity > 70,
            'Infectious Diseases': tempCelsius < 10 && humidity < 40 && weatherMain === 'Rain',
            'Mental Health Conditions': tempCelsius < 0,
            "Raynaud's Phenomenon": tempCelsius < 15,
            'Heat-Related Illnesses': tempCelsius > 32 && humidity > 60 && weatherMain === 'Clear'
        };

        // Check the condition and return recommendation
        if (conditions[condition]) {
            return 'we recommend that you do NOT go outside.';
        } else {
            return 'there are no specific recommendations for you, feel free to go outside!';
        }
    };


    return (
        <Router>
            <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-100 p-8">
                <Header /> {/* Header component */}

                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/healthdata" element={<HealthData onAnalyze={handleAnalyzeHealthData} />} />
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

                            {/* Health Recommendations Section */}
                            <section className="bg-white p-6 rounded-lg shadow-lg col-span-1">
                                <h2 className="text-gray-700 font-bold mb-4 text-xl">Health Recommendations</h2>
                                {userHealthData.category && userHealthData.details && (
                                    <p className="text-gray-600 text-lg">
                                        {userHealthData.category}: {userHealthData.details}
                                    </p>
                                )}
                                {/* Show "Fill in" button only if category and details are empty */}
                                {(!userHealthData.category || !userHealthData.details) && (
                                    <Link to="/healthdata" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow-lg mt-4">
                                        Fill in
                                    </Link>
                                )}
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

                            {/* Combined Health and Weather Analysis Section */}
                            <footer className="bg-white p-6 rounded-lg shadow-lg mt-6 w-full">
                                <h2 className="text-gray-700 font-bold mb-4 text-xl">Combined Health and Weather Analysis</h2>
                                <p className="text-gray-600 text-lg">
                                    {/* Generate and display the combined message */}
                                    {generateCombinedMessage()}
                                </p>
                            </footer>

                            {/* NHS Widget */}
                            <div>
                                <iframe 
                                    title="NHS Health A to Z Widget" 
                                    src="https://developer.api.nhs.uk/widgets/conditions?uid=80e893c0-9567-11ee-a24a-c9647f088446" 
                                    width="100%" 
                                    height="300px" 
                                    style={{border: "solid 1px #ccc", maxWidth: "400px"}} 
                                ></iframe>
                            </div>
                        </main>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
