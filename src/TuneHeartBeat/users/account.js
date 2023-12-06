import * as client from "../users/client";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as followsClient from "../follows/client";
import "./account.css";
import { useSelector } from "react-redux";


function Account() {
  const [account, setAccount] = useState(null);
  const { accountId } = useParams();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const { currentUser } = useSelector((state) => state.userReducer);

  const fetchAccount = async () => {
    try {
      const account = accountId ? await client.findUserById(accountId) : await client.account();
      setAccount(account);
    } catch (error) {
      console.error("Error fetching user account:", error);
    }
  };

  const followUser = async () => {
    const status = await followsClient.userFollowsUser(accountId);
  };

  const save = async () => {
    try {
      // Ensure that the current user is editing their own account
      if (currentUser && currentUser._id === account._id) {
        await client.updateUser(account);
        // You can add additional logic or feedback here if needed
        console.log("Account information updated successfully!");
      } else {
        // Handle the case where the user is not allowed to edit this account
        console.error("You do not have permission to edit this account.");
      }
    } catch (error) {
      console.error("Error updating user account:", error);
    }
  };
  const UnfollowUser = async () => {
    const status = await followsClient.userUnFollowsUser(accountId);

  };
  const fetchFollowers = async () => {
    try {
      let followers;

      if (account && account._id) {
        followers = await followsClient.findFollowersOfUser(account._id);
      } else {
        // Handle the case when account._id is not available
        console.error("Cannot fetch followers: account._id is null.");
        return;
      }

      setFollowers(followers);
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };


  const fetchFollowing = async () => {
    try {
      let following;

      if (accountId) {
        following = await followsClient.findFollowedUsersByUser(accountId);
      } else if (account && account._id) {
        following = await followsClient.findFollowedUsersByUser(account._id);
      } else {
        // Handle the case when account is still null or account._id is not available
        console.error("Cannot fetch following: account or account._id is null.");
        return;
      }

      setFollowing(following);
    } catch (error) {
      console.error("Error fetching following:", error);
    }
  };

  const alreadyFollowing = () => {
    return followers.some((follows) => {
      return follows.follower._id === account._id;
    })
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAccount();
      await fetchFollowers();
      await fetchFollowing();
    };

    fetchData();

  }, [accountId, account?._id]);

  return (
    <div className="account-container">
      {accountId && account && account._id && currentUser && (
        <div>
          {alreadyFollowing() ? (<button onClick={UnfollowUser} className="btn btn-danger float-end">Unfollow</button>)
            : (
              <button onClick={followUser} className="btn btn-warning float-end">
                Follow
              </button>
            )}

        </div>
      )}

      {account && (
        <div style={{ overflowY: "auto", overflowX: "auto", width: "750px", height: "580px" }}>
          <h1>Account </h1>
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

          {currentUser && account._id === currentUser._id && (
            <button className="save-button" onClick={save}>
              Save
            </button>
          )}



          {account.role === "Admin" ? (
            <Link to="/TuneHeartBeat/users/table" className="users-link">
              Users
            </Link>
          ) : (
            <p>You do not have permission to access the table.</p>
          )}
          <h3>Followers</h3>
          <div style={{ overflowY: "auto", overflowX: "auto", width: "750px", height: "200px" }}>

            <table className="table table-striped">
              <thead>
                <tr>

                  <th>First Name</th>
                  <th>Last Name</th>

                </tr>
              </thead>
              <tbody>
                {followers.map((follows, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={`/TuneHeartBeat/Account/${follows.follower._id}`}>

                        {follows.follower.firstName}

                      </Link>
                    </td>
                    <td>{follows.follower.lastName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3>Following</h3>
          <div style={{ overflowY: "auto", overflowX: "auto", width: "750px", height: "200px" }}>

            <table className="table table-striped">
              <thead>
                <tr>

                  <th>First Name</th>
                  <th>Last Name</th>

                </tr>
              </thead>
              <tbody>
                {following.map((follows, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={`/TuneHeartBeat/Account/${follows.followed._id}`}>

                        {follows.followed.firstName}

                      </Link>
                    </td>
                    <td>{follows.followed.lastName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}
    </div>
  );
}

export default Account;
