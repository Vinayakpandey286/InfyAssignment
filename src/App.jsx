import React, { useEffect, useState, useMemo } from "react";
import RewardsTable from "./components/RewardsTable";
import TotalRewardsTable from "./components/TotalRewardsTable";
import TransactionTable from "./components/TransactionTable";
import { aggregateByMonthAndYear, calculateRewardPoints, sortByDate } from "./utils/CalculateRewards";
import { fetchTransactions } from "./service/TransactionService";
import Tab from "./components/Tab";
import log from "loglevel"; // Import loglevel

// Set the log level (optional: debug, info, warn, error)
log.setLevel("debug");

const App = () => {
  // State variables to manage data fetching, error handling, and transactions
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState(0); // State for active tab
  const [buttonActive, setButtonActive] = useState(false); // State for the filter button

  // Fetch transaction data from the service on component mount
  useEffect(() => {
    const getTransactions = async () => {
      log.debug("Fetching transactions..."); // Log debug message when fetching transactions
      try {
        const data = await fetchTransactions(); // Use the service function
        const rewards = data.map((transaction) => {
          const points = calculateRewardPoints(transaction?.price);
          return { ...transaction, rewardPoints: points };
        });
        const sortedData = sortByDate(rewards); // Sort transactions by date
        setTransactions(sortedData);
        setIsLoading(false);
        log.info("Transactions fetched successfully"); // Log info message on success
      } catch (error) {
        setError(error);
        setIsLoading(false);
        log.error("Error fetching transactions:", error); // Log error message if fetching fails
      }
    };

    getTransactions(); // Call the async function to fetch transactions
  }, []);

  // Memoize filtered transactions for last 3 months
  const filteredTransactions = useMemo(() => {
    if (!transactions.length) return [];

    const today = new Date();
    const threeMonthsAgo = new Date(today.setMonth(today.getMonth() - 3));

    log.debug("Filtering transactions from the last 3 months...");
    return transactions.filter((transaction) => {
      const purchaseDate = new Date(transaction.purchaseDate);
      return purchaseDate > threeMonthsAgo;
    });
  }, [transactions]);

  // Aggregate rewards by month and year
  const aggregatedRewards = aggregateByMonthAndYear(
    buttonActive ? filteredTransactions : transactions
  );

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {/* Title and Button Section */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1>User Rewards</h1>
            <button
              style={{
                height: "30px",
                padding: "8px",
                alignSelf: "center",
                marginRight: "20px",
                ...(buttonActive && { backgroundColor: "lightblue" }),
              }}
              onClick={() => setButtonActive((prev) => !prev)}
            >
              Last 3 months
            </button>
          </div>

          {/* Tab component for selecting between tables */}
          <Tab
            label1="Transactions"
            label2="Rewards"
            label3="Total Rewards"
            onClickTab={setActiveTab} // Set active tab based on selection
            activeTab={activeTab} // Pass active tab to Tab component
          />

          {/* Conditionally render the tables based on active tab */}
          {activeTab === 0 && (
            <TransactionTable
              transactions={buttonActive ? filteredTransactions : transactions}
            />
          )}
          {activeTab === 1 && (
            <RewardsTable aggregatedRewards={aggregatedRewards} />
          )}
          {activeTab === 2 && (
            <TotalRewardsTable
              transactions={buttonActive ? filteredTransactions : transactions}
            />
          )}
        </div>
      )}
    </>
  );
};

export default App;
