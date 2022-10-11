
const openPhylloSDK = (userId, token) => {

  const config = {
    clientDisplayName: "Test App",
    environment: "dev",
    userId: userId,
    token: token,
    workPlatformId: null,
  };

  const phylloConnect = window.PhylloConnect.initialize(config);
  console.log(phylloConnect);
  return phylloConnect;

};

export default openPhylloSDK;
