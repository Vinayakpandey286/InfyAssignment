export const fetchTransactions = async () => {
    try {
        const response = await fetch("/TransactionData.json");

        if (!response.ok) {
            throw new Error('Failed to fetch transactions');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error; // Rethrow the error for the calling component to handle
    }
};
