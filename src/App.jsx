import React, { useEffect, useState } from "react";
import RewardsTable from "./components/RewardsTable";
import TotalRewardsTable from "./components/TotalRewardsTable";
import TransactionTable from "./components/TransactionTable";
import { aggregateByMonthAndYear, sortByDate } from "./utils/calculateRewards";

const App = () => {
  // State variables to manage data fetching, error handling, and transactions
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [transaction, setTransaction] = useState([]);

  // Fetch transaction data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://mocki.io/v1/8864718a-3a60-421a-a93a-8366e6234b66"
        );
        const response = await res.json();
        setTransaction(response); // Store the fetched transactions
        setIsLoading(false); // Mark data as loaded
      } catch (err) {
        setError(err); // Store the error in state
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Process transactions to calculate reward points whenever transactions update
  useEffect(() => {
    let rewards = transaction.map((transaction) => {
      let points = 0;
      // Calculate reward points: 2 points for every dollar spent above $100, 1 point for every dollar above $50
      if (transaction.price > 100) {
        points += 50 + (Math.floor(transaction.price) - 100) * 2;
      }
      if (transaction.price > 50 && transaction.price <= 100) {
        points += Math.floor(transaction.price) - 50;
      }

      return {
        ...transaction,
        rewardPoints: points, // Add reward points to transaction object
      };
    });
    const sortedData = sortByDate(rewards); // Sort transactions by date
    setSortedTransactions(sortedData);
  }, [transaction]);

  // Aggregate rewards by month and year
  const aggregatedRewards = aggregateByMonthAndYear(sortedTransactions);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          <h1>User Rewards</h1>
          {/* Table displaying transaction details */}
          <TransactionTable transactions={sortedTransactions} />
          {/* Table displaying aggregated rewards per month */}
          <RewardsTable aggregatedRewards={aggregatedRewards} />
          {/* Table displaying total rewards earned */}
          <TotalRewardsTable transactions={sortedTransactions} />
        </div>
      )}
    </>
  );
};

export default App;