// HealthData.js
import React, { useState, useEffect } from 'react';
import HealthIssueSelector from './HealthIssueSelector'; // Adjust the path as needed
import { fetchHealthIssues } from '../healthApi'; // Adjust the path as needed

const HealthData = () => {
    const [healthIssues, setHealthIssues] = useState([{ id: 1, value: '' }]);
    const [availableIssues, setAvailableIssues] = useState([]); // State for fetched health issue options
    const [healthRecommendations, setHealthRecommendations] = useState('');

    useEffect(() => {
        const loadHealthIssues = async () => {
            try {
                const issues = await fetchHealthIssues();
                console.log("Fetched Issues:", issues); // Log the fetched issues
                setAvailableIssues(issues);
            } catch (error) {
                console.error('Error fetching health issues:', error);
            }
        };

        loadHealthIssues();
    }, []);

    const handleHealthIssueChange = (id, value) => {
        const updatedIssues = healthIssues.map(issue => {
            if (issue.id === id) {
                return { ...issue, value };
            }
            return issue;
        });
        setHealthIssues(updatedIssues);
    };

    const analyzeHealthRisks = async () => {
        // Implementation for analyzing health risks
    };

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-100 flex justify-center items-center p-8">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">Input Potential Health Risks</h2>
                    <p>In order to provide you with personalized health recommendations based on the weather, we first need to know a little bit more about your potential health issues.</p>
                    <br />
                    {healthIssues.map(issue => (
                        <HealthIssueSelector
                            key={issue.id}
                            id={issue.id}
                            onChange={handleHealthIssueChange}
                            value={issue.value}
                            options={availableIssues.map(issue => ({
                                label: issue.label, // Use label as the option's display text
                                value: issue.value, // Use value as the option's value
                            }))}
                        />
                    ))}
                    <div className="flex items-center justify-between mt-4">
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
