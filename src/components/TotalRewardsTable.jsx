const TotalRewardsTable = ({ transactions }) => {
  // Calculate total rewards for each customer
  const totalRewards = transactions.reduce(
    (acc, { customerName, rewardPoints, customerId }) => {
      acc[customerName] = {
        rewardPoints: (acc[customerName]?.rewardPoints || 0) + rewardPoints,
        customerId,
        customerName,
      };
      return acc;
    },
    {}
  );

  // Sort the totalRewards by customerId (converted to number)
  const sortedRewards = Object.values(totalRewards).sort((a, b) => {
    return Number(a.customerId) - Number(b.customerId);
  });

  return (
    <div style={{ overflowX: "auto" }}>
      <h2> Total Rewards</h2>
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
            {["CustomerId", "Customer Name", "Total Reward Points"].map(
              (header, index) => (
                <th
                  key={index}
                  style={{ border: "1px solid black", padding: "8px" }}
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {/* Loop through sorted total rewards and display data in rows */}
          {sortedRewards.map((value, index) => (
            <tr key={index} style={{ backgroundColor: "#ffffff" }}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {value?.customerId}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {value?.customerName}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "right",
                }}
              >
                {value?.rewardPoints}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TotalRewardsTable;
