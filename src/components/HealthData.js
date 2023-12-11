// HealthData.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const HealthData = ({ onAnalyze, onSearch, healthConditionData }) => {
    const [healthRisks, setHealthRisks] = useState('');
    const [healthRecommendations, setHealthRecommendations] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleHealthRisksInput = (event) => {
        setHealthRisks(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setHealthRisks('');
    };

    const analyzeHealthRisks = () => {
        onAnalyze({ category: selectedCategory, details: healthRisks });
        navigate('/');
    };

    const handleSearchSubmit = () => {
        if(onSearch) {
            onSearch(searchTerm);
        } else {
            console.error("onSearch function not provided");
        }
    };

    const categories = [
        'Respiratory Disorders',
        'Cardiovascular Diseases',
        'Arthritis and Musculoskeletal Conditions',
        'Migraines/Headaches',
        'Allergies',
        'Skin Conditions',
        'Infectious Diseases',
        'Mental Health Conditions',
        'Raynauds Phenomenon',
        'Heat-Related Illnesses',
        'Other Conditions'
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-100 flex justify-center items-center p-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                

                <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">Input Potential Health Risks</h2>
                <p>Please select one category:</p>
                <select
                    className="w-full mb-4 px-3 py-2 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="">Select a Category</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                {selectedCategory && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="healthRisks">
                            If needed, specify your health issue below:
                        </label>
                        <textarea
                            className="w-full px-3 py-2 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
                            id="healthRisks"
                            placeholder="Enter your potential health risks here..."
                            rows="2"
                            value={healthRisks}
                            onChange={handleHealthRisksInput}
                        ></textarea>
                    </div>
                )}
                

                <div className="text-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={analyzeHealthRisks}
                    >
                        Analyze Health Risks
                    </button>
                </div>

                {healthRecommendations && (
                    <div className="mt-4">
                        <h3 className="text-lg font-bold text-gray-700 mb-2">Health Recommendations</h3>
                        <p className="text-gray-600">{healthRecommendations}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HealthData;
