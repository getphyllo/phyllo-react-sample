import React from "react";
import { useNavigate } from "react-router-dom";
import { createUser, createUserToken } from "../service/phylloservice";
import openPhylloSDK from "../service/phyllosdk";

const Home = () => {
  let navigate = useNavigate();

  const handleGetStarted = async () => {
    const timeStamp = new Date();
    let userId = await createUser("Sample App", timeStamp.getTime());
    let token = await createUserToken(userId);
    let phylloConnect = openPhylloSDK(userId, token);

    phylloConnect.on(
      "accountConnected",
      (accountId, workplatformId, userId) => {
        console.log(
          `onAccountConnected: ${accountId}, ${workplatformId}, ${userId}`
        );
      }
    );

    phylloConnect.on(
      "accountDisconnected",
      (accountId, workplatformId, userId) => {
        console.log(
          `onAccountDisconnected: ${accountId}, ${workplatformId}, ${userId}`
        );
      }
    );

    phylloConnect.on("tokenExpired", (userId) => {
      console.log(`onTokenExpired: ${userId}`);
    });

    phylloConnect.on("exit", (reason, userId) => {
      console.log(`onExit: ${reason}, ${userId}`);
      getUser();
    });

    phylloConnect.on("connectionFailure", (reason, workplatformId, userId) => {
      console.log(
        `onConnectionFailure: ${reason}, ${workplatformId}, ${userId}`
      );
    });

    phylloConnect.open();
  };

  function getUser() {
    navigate("/users");
  }

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
