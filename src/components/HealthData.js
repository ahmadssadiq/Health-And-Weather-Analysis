/*
Handles health data
It uses useState to manage local states: healthRisks for user input and healthRecommendations for displaying results.
The component provides an input form for users to enter potential health risks and a button to trigger analysis.
The analyzeHealthRisks function is a placeholder for making API calls to analyze health risks based on user input.
*/
import React, { useState } from 'react';

const HealthData = () => {
    // State for potential health risks input
    const [healthRisks, setHealthRisks] = useState('');

    // State for storing personalized health recommendations
    const [healthRecommendations, setHealthRecommendations] = useState('');

    // Function to handle potential health risks input
    const handleHealthRisksInput = (event) => {
        setHealthRisks(event.target.value);
    };

    // Function to analyze health risks based on weather
    const analyzeHealthRisks = async () => {
        try {
            // Here you can make API calls to analyze health risks based on the user's input
            // You can set the results in the healthRecommendations state
        } catch (error) {
            console.error('Error analyzing health risks:', error);
        }
    };

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-100 flex justify-center items-center p-8">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">Input Potential Health Risks</h2>
                    <p>In order to provide you with personalized health recommendations based on the weather, we first need to know a little bit more about your potential health issues.</p>
                    <br />
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="healthRisks">
                            Potential Health Risks
                        </label>
                        <textarea
                            className="w-full px-3 py-2 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
                            id="healthRisks"
                            placeholder="Enter your potential health risks here..."
                            rows="4"
                            value={healthRisks}
                            onChange={handleHealthRisksInput}
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={analyzeHealthRisks}
                        >
                            Analyze Health Risks
                        </button>
                    </div>
                    {/* Display health recommendations based on the weather */}
                    {healthRecommendations && (
                        <div className="mt-4">
                            <h3 className="text-lg font-bold text-gray-700 mb-2">Health Recommendations</h3>
                            <p className="text-gray-600">{healthRecommendations}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HealthData;
