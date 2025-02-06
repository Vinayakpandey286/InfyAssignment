
export const calculatePoints = (price) => {
    return Math.floor(price / 2);
};

export const aggregateByMonthAndYear = (transactions) => {
    return transactions.reduce((acc, { purchaseDate, rewardPoints, customerId, customerName }) => {
        const monthYear = new Date(purchaseDate).toLocaleString('default', { month: 'short', year: 'numeric' });
        acc[monthYear + "_" + customerId] = {
            points: (acc[monthYear]?.points || 0) + rewardPoints,
            customerId,
            monthYear,
            customerName
        };
        return acc;
    }, {});
};

export const sortByDate = (transactions) => {
    return transactions.sort((a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate));
};
