
const Tab = ({ label1, label2, label3, onClickTab, activeTab }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <div
        style={{
          display: "flex",
          padding: "8px 0",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          width: "50%",
          cursor: "pointer",
          borderBottom:
            activeTab === 0 ? "2px solid #0073BB" : "1px solid #A6A8A9",
          color: activeTab === 0 ? "#0073BB" : "#A6A8A9",
        }}
        onClick={() => onClickTab(0)}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: "16px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            wordBreak: "break-word",
          }}
        >
          {label1}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          padding: "8px 0",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          width: "50%",
          cursor: "pointer",
          borderBottom:
            activeTab === 1 ? "2px solid #0073BB" : "1px solid #A6A8A9",
          color: activeTab === 1 ? "#0073BB" : "#A6A8A9",
        }}
        onClick={() => onClickTab(1)}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: "16px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            wordBreak: "break-word",
          }}
        >
          {label2}
        </div>
      </div>
    </div>
  );
};

export default Tab;
