//  API service layer for budget data
// Separates API logic from components (professinal pattern)
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/* 
    Simulates fetching budget statistics
    In real app, this would call actual I-PIM API
*/
export const fetchBudgetStats = async () => {
    try {
        // Using JSONPlaceholder post as mock budget data
        const response = await fetch(`${API_BASE_URL}/posts?_limit=6`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        //Transform API data into our budget card format 
        return transformApiData(data);
    } catch (error) {
        console.error('Failed to fetch budget data:', error);
        throw error; // Re-throw to handle in component 
    }
};

/**
 * Transform external API data to our internal format 
 * This is how adapt third-party APIs to needs 
 */

const transformApiData = (apiData) => {
    const icons = ['💰', '📊', '✅', '⏳', '🎯', '📈'];
    const titles = [
        'Total Budget',
        'Active Projects',
        'Completed',
        'Pending Approval',
        'Annual Growth'
    ];

    return apiData.map((item, index) => ({
        id: item.id,
        icon: icons[index % icons.length],
        title: titles[index % titles.length],
        // Use API data to generate amounts (simulated)
        amount: `$${(item.id * 325000).toLocaleString() }`,
        growth: item.id % 2 === 0
            ? `+${(item.id * 2.5).toFixed(1)}% from last quarter`
            : `-${(item.id * 1.2).toFixed(1)}% from last quarter`,
        growthPositive: item.id % 2 === 0
    }));
};

/**
 * Retry logic for failed requests
 * Professional error handling pattern
 */
export const fetchWithRetry = async (fetchFn, maxRetries = 3) => {
    let lastError;

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fetchFn();
        } catch (error) {
            lastError = error;
            console.log(`Retry attempt ${i + 1 } of ${maxRetries}`);

            //Exponential backoff: wait longer between each retry
            await new Promise(resolve => 
                setTimeout(resolve, Math.pow(2, i) * 1000)
            );
        }
    }

    throw lastError;
}