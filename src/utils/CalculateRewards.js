
export const aggregateByMonthAndYear = (transactions) => {
    return transactions.reduce((acc, { purchaseDate, rewardPoints, customerId, customerName }) => {
        // Format purchase date as 'MMM YYYY' (e.g., 'Jan 2024')
        const monthYear = new Date(purchaseDate).toLocaleString('default', { month: 'short', year: 'numeric' });

        // Create a unique key combining month, year, and customer ID
        acc[monthYear + "_" + customerId] = {
            points: (acc[monthYear + "_" + customerId]?.points || 0) + rewardPoints,
            customerId,
            monthYear,
            customerName
        };
        return acc; 
    }, {});
};

// Function to sort transactions by purchase date in descending order
export const sortByDate = (transactions) => {
    return transactions.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
};


export const calculateRewardPoints = (price) => {
    let points = 0;
    // Calculate reward points: 2 points for every dollar spent above $100, 1 point for every dollar above $50
    if (price > 100) {
        points += 50 + (Math.floor(price) - 100) * 2;
    }
    if (price > 50 && price <= 100) {
        points += Math.floor(price) - 50;
    }

    return points
}
