import React from "react";

const RewardsTable = ({ aggregatedRewards , custId}) => {
  // Inline styles for table and its elements
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse", 
    margin: "20px 0",
  };

  const thTdStyle = {
    border: "1px solid #ddd",
    padding: "8px 12px",
    textAlign: "left",
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: "#f4f4f4",
    fontWeight: "bold",
  };

  const trEvenStyle = {
    backgroundColor: "#f9f9f9",
  };

  const trHoverStyle = {
    backgroundColor: "#e2e2e2",
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <h2> User Monthly Rewards</h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Month/Year</th>
            <th style={thStyle}>Reward Points</th>
            <th style={thStyle}>Customer Id</th>
            <th style={thStyle}>Customer Name</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(aggregatedRewards).map(
            ([monthYear, value], index) => (
              <tr
                key={monthYear}
                style={{
                  ...trEvenStyle,
                  backgroundColor: custId === Number(value?.customerId) ? 'lightblue' : "#ffffff"
                }}
                
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    trHoverStyle.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    index % 2 === 0 ? trEvenStyle.backgroundColor : "")
                }
              >
                <td style={thTdStyle}>{value?.monthYear}</td>
                <td style={{...thTdStyle, textAlign: "right"}}>{value?.points}</td>
                <td style={{...thTdStyle, textAlign: "right"}}>{value?.customerId}</td>
                <td style={thTdStyle}>{value?.customerName}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RewardsTable;
