import axios from "axios";

const PHYLLO_BASE_URL = "https://api.dev.getphyllo.com";
const URL_CREATE_USER = "/v1/users";
const URL_CREATE_USER_TOKEN = "/v1/sdk-tokens";
const URL_GET_ACCOUNT = "/v1/accounts";
const URL_GET_PROFILE = "/v1/profiles";
// const PHYLLO_CLIENT_ID = "3b2c7976-cfed-4b5c-9e41-a681245a9ec6"; //sandbox
// const PHYLLO_SECRET_ID = "412e46c1-2e34-41ae-ae05-d6c3e6f0e04e"; //sandbox
const CLIENT_ID = "3c132d40-2148-49d2-bb8d-cae55873a69d"; //dev-1
const CLIENT_SECRET = "1dcba6d8-a61c-4665-a437-046f4a5303de"; //dev-1
// const CLIENT_ID = "b4767067-ab0a-4002-bd0a-b772eb704774"
// const CLIENT_SECRET = "0b13df2a-5665-4b67-91d6-331388a3f6af"
// const CLIENT_ID = "648114bc-6430-4729-bcdc-674e7192f122";  //preprod
// const CLIENT_SECRET = "bb4a2871-1f0a-4805-9d6c-857569f81014";  //preprod


const getAxiosInstance = () =>{
    const api = axios.create({
      baseURL: PHYLLO_BASE_URL,
      auth : {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
    });
    return api;
}


const createUser = async(username,externalId)=>{
    try{
      const userId = localStorage.getItem("USER_ID");
      if(Boolean(userId)){
        return userId;
      }
      const api = getAxiosInstance();
      let response = await api.post(URL_CREATE_USER,{
        name:username,
        external_id:externalId
      });
      localStorage.setItem("USER_ID",response.data.id);
      return response.data.id;
    }catch(err){
      return err.body;
    }
}

const createUserToken = async(userId)=>{
    try{
      const token = localStorage.getItem("USER_TOKEN");
      if(Boolean(token)){
        return token;
      } 
      const api = getAxiosInstance();
      let response = await api.post(URL_CREATE_USER_TOKEN,{
        user_id: userId,
        products: ["IDENTITY","ENGAGEMENT"],
      });
      console.log(userId);
      console.log(response);
      localStorage.setItem("USER_TOKEN",response.data.sdk_token);
      return response.data.sdk_token;
    }catch(err){
      return err.body;
    }
}

const getAccounts = async(userId)=>{
    try{
        const api = getAxiosInstance();
        let response = await api.get(`${URL_GET_ACCOUNT}?user_id=${userId}`);
        return response;
    }catch(err){
        return err.body;
    }
}

const getProfile = async(accountId)=>{
    try{
        const api = getAxiosInstance();
        let response = await api.get(`${URL_GET_PROFILE}?account_id=${accountId}`);
        return response;
    }catch(err){
        return err.body;
    }
}

export {createUser,createUserToken,getAccounts,getProfile}