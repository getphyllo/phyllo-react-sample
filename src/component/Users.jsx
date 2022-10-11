import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import openPhylloSDK from "../service/phyllosdk";
import { getAccounts, createUserToken } from "../service/phylloservice";

const Users = () => {
  let [accounts, setAccounts] = useState([]);
  var heading = [
    "Account ID",
    "Platform Profile Name",
    "Work Platform",
    "Status",
    "Platform Username",
    "Created At",
    "Updated At",
    "UserId",
    "Work-PlatformId",
    "Engagement Status",
    "Enagagement Last Sync",
  ];
  let navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let response = await getAccounts(localStorage.getItem("USER_ID"));
      console.log(response.data.data);
      setAccounts(response.data.data);
    })();
  }, []);

  const handleRetryAccountConnection = async () => {
    let userId = localStorage.getItem("USER_ID");
    let token = await createUserToken(userId);
    let phylloConnect = openPhylloSDK(userId, token);
    phylloConnect.open();
  };

  const handleAddAccount = () => {
    let userId = localStorage.getItem("USER_ID");
    let token = localStorage.getItem("USER_TOKEN");
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
      if (
        window.confirm("Your session has expired, but we can help you fix it")
      ) {
        localStorage.removeItem("USER_TOKEN");
        handleRetryAccountConnection();
      } else {
        navigate("/");
      }
    });

    phylloConnect.on("exit", (reason, userId) => {
      console.log(`onExit: ${reason}, ${userId}`);
      window.location.reload();
      alert(reason);
    });

    phylloConnect.on("connectionFailure", (reason, workplatformId, userId) => {
      console.log(
        `onConnectionFailure: ${reason}, ${workplatformId}, ${userId}`
      );
      alert("reason");
    });

    phylloConnect.open();
  };

  return (
    <div>
      <h1 style={{ margin: "20px" }}>Accounts</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <table
          className="table table-bordered table-striped"
          style={{ width: "95%" }}
        >
          <thead>
            <tr>
              {heading.map((head, idx) => {
                return (
                  <th scope="col" key={idx}>
                    {head}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {accounts.map((obj, idx) => {
              return <User user={obj} key={idx} />;
            })}
          </tbody>
        </table>
      </div>
      <button
        style={{
          border: "1px solid lightgray",
          borderRadius: "8px",
          height: "50px",
          width: "20%",
          display: "block",
          margin: "auto",
          background: "aquamarine",
          cursor: "pointer",
        }}
        onClick={handleAddAccount}
      >
        Add Another Account
      </button>
    </div>
  );
};

function User(props) {
  const {
    id,
    platform_profile_name,
    username,
    work_platform,
    status,
    created_at,
    updated_at,
    user,
    data,
  } = props.user;

  const getDate = (created_at) => {
    var date = new Date(created_at);
    var dateWithoutTime =
      date.getFullYear().toString() +
      "-" +
      date.getMonth().toString() +
      "-" +
      date.getDate().toString();
    return dateWithoutTime;
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{platform_profile_name}</td>
      <td>{work_platform.name}</td>
      <td>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {status}
          <div
            style={{
              width: "10px",
              height: "10px",
              background:
                status === "CONNECTED"
                  ? "green"
                  : status === "NOT_CONNECTED"
                  ? "red"
                  : "yellow",
              borderRadius: "50%",
              marginLeft: "10px",
            }}
          ></div>
        </div>
      </td>
      <td>{username}</td>
      <td>{getDate(created_at)}</td>
      <td>{getDate(updated_at)}</td>
      <td>{user.id}</td>
      <td>{work_platform.id}</td>
      <td>{data.engagement.status}</td>
      <td>{getDate(data.engagement.last_sync_at)}</td>
    </tr>
  );
}

export default Users;
