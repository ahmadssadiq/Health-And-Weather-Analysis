// healthStatsAPI.js

async function fetchHealthCondition(condition, apiKey) {
    const url = `https://api.nhs.uk/conditions/${condition}`;

    try {
        const response = await fetch(url, {
            headers: {
                'subscription-key': apiKey,
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching health condition:', error);
    }
}

export { fetchHealthCondition };