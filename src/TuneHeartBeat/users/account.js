// Import necessary modules
import * as client from "../users/client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./account.css";


function Account() {
  const [account, setAccount] = useState(null);
  


  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };

  const save = async () => {
    await client.updateUser(account);
  };


  
  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <div className="account-container">
      <h1>Account</h1>
      {account && (
        <div>
     
          <div className="input-group">
            <label>Username</label>
            <input
              value={account.username}
              onChange={(e) => setAccount({ ...account, username: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>First Name</label>
            <input
              value={account.firstName}
              onChange={(e) => setAccount({ ...account, firstName: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input
              value={account.lastName}
              onChange={(e) => setAccount({ ...account, lastName: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>Date of Birth</label>
            <input
              value={account.dob}
              onChange={(e) => setAccount({ ...account, dob: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              value={account.email}
              onChange={(e) => setAccount({ ...account, email: e.target.value })}
            />
          </div>
          

      
          <button className="save-button" onClick={save}>
            Save
          </button>
          {/* <button className="signout-button" onClick={signout}>
            Signout
          </button> */}

        
          {account.role === "Admin" ? (
            <Link to="/TuneHeartBeat/users/table" className="users-link">
              Users
            </Link>
          ) : (
            <p>You do not have permission to access the table.</p>
          )}
        </div>
      )}
    </div>
  );
}


export default Account;
