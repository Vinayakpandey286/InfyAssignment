const TotalRewardsTable = ({ transactions }) => {
  const totalRewards = transactions.reduce(
    (acc, { customerName, rewardPoints }) => {
      acc[customerName] = (acc[customerName] || 0) + rewardPoints;
      return acc;
    },
    {}
  );

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
            {["Customer Name", "Total Reward Points"].map((header, index) => (
              <th
                key={index}
                style={{ border: "1px solid black", padding: "8px" }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(totalRewards).map(([name, points]) => (
            <tr key={name} style={{ backgroundColor: "#ffffff" }}>
              {[name, points].map((value, index) => (
                <td
                  key={index}
                  style={{ border: "1px solid black", padding: "8px" }}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TotalRewardsTable;
