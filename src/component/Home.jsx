import React from "react";
import PhylloSDK from "../service/phyllosdk";

const Home = () => {
  const phylloSDK = new PhylloSDK();

  const handleGetStarted = async () => {
    await phylloSDK.openPhylloSDK();
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flex: "wrap",
        flexDirection: "column",
      }}
    >
      <h1>Get Started With Phyllo</h1>
      <button
        style={{
          height: "6%",
          width: "30%",
          borderRadius: "10px",
          border: "1px solid lightblue",
          background: "aqua",
        }}
        onClick={handleGetStarted}
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;
