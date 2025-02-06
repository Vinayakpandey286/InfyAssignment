// /src/App.js

import React, { useEffect, useState } from "react";
import RewardsTable from "./components/RewardsTable";
import TotalRewardsTable from "./components/TotalRewardsTable";
import TransactionTable from "./components/TransactionTable";
import { aggregateByMonthAndYear, sortByDate } from "./utils/calculateRewards";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://mocki.io/v1/8864718a-3a60-421a-a93a-8366e6234b66"
        );
        const response = await res.json();
        setTransaction(response);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let rewards = transaction.map((transaction) => {
      let points = 0;
      if (transaction.price > 100) {
        points += 50 + (Math.floor(transaction.price) - 100) * 2;
      }
      if (transaction.price > 50 && transaction.price <= 100) {
        points += Math.floor(transaction.price) - 50;
      }

      return {
        ...transaction,
        rewardPoints: points,
      };
    });
    const sortedData = sortByDate(rewards);
    setSortedTransactions(sortedData);
  }, [transaction]);

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
          <TransactionTable transactions={sortedTransactions} />
          <RewardsTable aggregatedRewards={aggregatedRewards} />
          <TotalRewardsTable transactions={sortedTransactions} />
        </div>
      )}
    </>
  );
};

export default App;
