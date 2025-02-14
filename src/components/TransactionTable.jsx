const TransactionTable = ({ transactions }) => {
  // Define table headers for transaction details
  const headers = [
    "Transaction ID",
    "Customer Name",
    "Purchase Date",
    "Product",
    "Price",
    "Reward Points",
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <h2> Transactions</h2>
      <table
        style={{
          minWidth: "100%",
          border: "1px solid black",
          textAlign: "left",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            {/* Render table headers dynamically */}
            {headers.map((header, index) => (
              <th
                key={index}
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Loop through transactions and display data in rows */}
          {transactions.map((transaction, index) => (
            <tr
              key={transaction.transactionId}
              style={{
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
              }}
            >
              {/* Map transaction details into table cells */}
              {[
                transaction.transactionId,
                transaction.customerName,
                new Date(transaction.purchaseDate).toLocaleDateString(),
                transaction.product,
                transaction.price,
                transaction.rewardPoints,
              ].map((value, idx) => (
                <td
                  key={idx}
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    ...(typeof value === "number"
                      ? { textAlign: "right" }
                      : {}),
                  }}
                >
                  {idx === 4 ? ` $${value.toFixed(2)}` : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
