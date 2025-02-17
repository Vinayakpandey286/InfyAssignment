import React, { useEffect, useState, useMemo } from "react";
import RewardsTable from "./components/RewardsTable";
import TotalRewardsTable from "./components/TotalRewardsTable";
import TransactionTable from "./components/TransactionTable";
import {
  aggregateByMonthAndYear,
  calculateRewardPoints,
  sortByDate,
} from "./utils/calculateRewards";
import { fetchTransactions } from "./service/TransactionService";

const App = () => {
  // State variables to manage data fetching, error handling, and transactions
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [buttonactive, setButtonActive] = useState(false);

  // Fetch transaction data from the service on component mount
  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await fetchTransactions(); // Use the service function
        const rewards = data.map((transaction) => {
          const points = calculateRewardPoints(transaction?.price);
          return { ...transaction, rewardPoints: points };
        });
        const sortedData = sortByDate(rewards); // Sort transactions by date
        setTransactions(sortedData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    getTransactions(); // Call the async function to fetch transactions
  }, []);

  // Memoize filtered transactions for last 3 months
  const filteredTransactions = useMemo(() => {
    if (!transactions.length) return [];
    
    const today = new Date();
    const threeMonthsAgo = new Date(today.setMonth(today.getMonth() - 3));

    return transactions.filter((transaction) => {
      const purchaseDate = new Date(transaction.purchaseDate);
      return purchaseDate > threeMonthsAgo;
    });
  }, [transactions]);

  // Aggregate rewards by month and year
  const aggregatedRewards = aggregateByMonthAndYear(
    buttonactive ? filteredTransactions : transactions
  );

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>User Rewards</h1>
            <button
              style={{
                height: "30px",
                padding: "8px",
                alignSelf: "center",
                marginRight: "20px",
                ...(buttonactive && { backgroundColor: "lightblue" }),
              }}
              onClick={() => setButtonActive((prev) => !prev)}
            >
              Last 3 months
            </button>
          </div>
          {/* Table displaying transaction details */}
          <TransactionTable
            transactions={buttonactive ? filteredTransactions : transactions}
          />
          {/* Table displaying aggregated rewards per month */}
          <RewardsTable aggregatedRewards={aggregatedRewards} />
          {/* Table displaying total rewards earned */}
          <TotalRewardsTable
            transactions={buttonactive ? filteredTransactions : transactions}
          />
        </div>
      )}
    </>
  );
};

export default App;
