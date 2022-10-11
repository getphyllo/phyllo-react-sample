import React from "react";
import { useEffect, useState } from "react";
import PhylloSDK from "../service/phyllosdk";
import { getAccounts } from "../service/phylloservice";

const Users = () => {
  let [accounts, setAccounts] = useState([]);
  let [attributes, setAttributes] = useState({});
  let phylloSDK = new PhylloSDK();
  
  const handleAddAccount = async () => {
    await phylloSDK.openPhylloSDK();
  };

  const flattenObj = (ob) => {
    let result = {};
    for (const i in ob) {
      if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
        const temp = flattenObj(ob[i]);
        for (const j in temp) {
          result[i + "." + j] = temp[j];
        }
      } else {
        result[i] = ob[i];
      }
    }
    return result;
  };

  useEffect(() => {
    (async () => {
      let response = await getAccounts(localStorage.getItem("USER_ID"));
      let arr = response.data.data;
      let updatedArray = arr.map((obj) => {
        let flattenedObj = flattenObj(obj);
        return flattenedObj;
      });
      console.log(updatedArray);
      setAccounts(updatedArray);
      setAttributes(updatedArray[0]);
    })();
  }, []);

  return (
    <div>
      <h1 style={{ margin: "20px" }}>Accounts</h1>
      <div
        class="table-responsive"
        style={{ display: "block", margin: "auto", width: "80%" }}
      >
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Attribute</th>
              {accounts.map((obj, idx) => {
                return (
                  <th scope="col" key={idx}>
                    Account-{idx + 1}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {Object.entries(attributes).map((val, idx) => {
                  return <tr key={idx}>{val[0]}</tr>;
                })}
              </td>
              {accounts.map((obj, idx) => {
                return <User user={obj} key={idx} />;
              })}
            </tr>
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
  return (
    <td className="data">
      {Object.entries(props.user).map((val, idx) => {
        if (
          val[0] === "profile_pic_url" ||
          val[0] === "work_platform.logo_url"
        ) {
          return (
            <tr key={idx}>
              <img src={val[1]} alt="" />
            </tr>
          );
        } else if (val[0] === "status") {
          return (
            <tr key={idx}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {val[1]}
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    background:
                      val[1] === "CONNECTED"
                        ? "green"
                        : val[1] === "NOT_CONNECTED"
                        ? "red"
                        : "yellow",
                    borderRadius: "50%",
                    marginLeft: "10px",
                  }}
                ></div>
              </div>
            </tr>
          );
        }
        return <tr key={idx}>{val[1]}</tr>;
      })}
    </td>
  );
}

export default Users;
