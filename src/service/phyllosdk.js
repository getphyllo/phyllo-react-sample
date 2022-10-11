import { createUser, createUserToken } from "./phylloservice";

class PhylloSDK{

  async openPhylloSDK(){
    const timeStamp = new Date();
    let userId = await createUser("Sample App", timeStamp.getTime());
    let token = await createUserToken(userId);

    const config = {
      clientDisplayName: "Test App",
      environment: "dev",
      userId: userId,
      token: token,
      workPlatformId: null,
    };

    const handleRetryAccountConnection = async () => {
      let userId = localStorage.getItem("USER_ID");
      await createUserToken(userId);
      phylloConnect.open();
    };
  
    const phylloConnect = window.PhylloConnect.initialize(config);
    
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
      if (
        window.confirm("Your session has expired, but we can help you fix it")
      ) {
        localStorage.removeItem("USER_TOKEN");
        handleRetryAccountConnection();
      }else{
        window.location.href = 'http://localhost:3000';
      }
    });

    phylloConnect.on("exit", (reason, userId) => {
      console.log(`onExit: ${reason}, ${userId}`);
      alert("Phyllo-SDK Exit Reason: " + reason);
      window.location.href = 'http://localhost:3000/users';
    });

    phylloConnect.on("connectionFailure", (reason, workplatformId, userId) => {
      console.log(
        `onConnectionFailure: ${reason}, ${workplatformId}, ${userId}`
      );
      alert("WorkPlatform Connection Failure Reason: " + reason);
    });

    phylloConnect.open();
  
  };

}

export default PhylloSDK;
