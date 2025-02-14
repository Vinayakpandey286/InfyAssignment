import React, { useEffect, useState } from "react";
import RewardsTable from "./components/RewardsTable";
import TotalRewardsTable from "./components/TotalRewardsTable";
import TransactionTable from "./components/TransactionTable";
import {
  aggregateByMonthAndYear,
  calculateRewardPoints,
  sortByDate,
} from "./utils/calculateRewards";
import { transactions } from "./utils/mockData";

const App = () => {
  // State variables to manage data fetching, error handling, and transactions
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [buttonactive, setButtonActive] = useState(false);

  // Fetch transaction data from the API on component mount
  useEffect(() => {
    const fetchData = () => {
      try {
        // const res = await fetch(
        //   "https://mocki.io/v1/8864718a-3a60-421a-a93a-8366e6234b66"
        // );
        // const response = await res.json();

        setTransaction(transactions); // Store the fetched transactions
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
    console.log(transactions)
    let rewards = transaction.map((transaction) => {
      const points = calculateRewardPoints(transaction?.price);

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

  const getLastThreeMonthData = () => {
    setButtonActive((prev) => !prev);
  };
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
                ...(buttonactive && { backgroundColor: "lightcoral" }),
              }}
              onClick={getLastThreeMonthData}
            >
              Last 3 months
            </button>
          </div>
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
