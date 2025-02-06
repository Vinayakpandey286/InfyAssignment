
export const aggregateByMonthAndYear = (transactions) => {
    return transactions.reduce((acc, { purchaseDate, rewardPoints, customerId, customerName }) => {
        // Format purchase date as 'MMM YYYY' (e.g., 'Jan 2024')
        const monthYear = new Date(purchaseDate).toLocaleString('default', { month: 'short', year: 'numeric' });

        // Create a unique key combining month, year, and customer ID
        acc[monthYear + "_" + customerId] = {
            points: (acc[monthYear]?.points || 0) + rewardPoints,
            customerId,
            monthYear,
            customerName
        };
        return acc;
    }, {});
};

// Function to sort transactions by purchase date in ascending order
export const sortByDate = (transactions) => {
    return transactions.sort((a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate));
};

