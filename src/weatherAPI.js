// weatherAPI.js

// You can place the apiKey here, but be cautious about exposing API keys in client-side code
const apiKey = '48e3aaf913c90b624d8126f2fe8f994f';

async function fetchLocationData(lat, lon) {
    const response = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`);
    return response.data;
}

async function fetchCurrentWeather(lat, lon, countryCode) {
    const units = countryCode === 'US' ? 'imperial' : 'metric';
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`);
    return response.data;
}

async function fetchUVIndex(lat, lon) {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    return response.data;
}

async function fetchHourlyForecast(lat, lon, countryCode) {
    const units = countryCode === 'US' ? 'imperial' : 'metric';
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`);
    return response.data;
}

// Original function adapted to use Axios
function getWeatherData(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    return axios.get(url)
        .then(response => {
            // Process and return weather data
            return response.data;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}
