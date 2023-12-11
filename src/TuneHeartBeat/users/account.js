import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import {
  BsFillHeartFill,
  BsFillPersonFill,
  BsFillEnvelopeFill,
  BsCalendarFill,
} from "react-icons/bs";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import * as followsClient from "../follows/client";
import * as client from "../users/client";
import { useSelector } from "react-redux";
import "./account.css";

function Account() {
  const [account, setAccount] = useState(null);
  const { accountId } = useParams();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const { currentUser } = useSelector((state) => state.userReducer);

  const fetchAccount = async () => {
    try {
      const userAccount = accountId
        ? await client.findUserById(accountId)
        : await client.account();
      setAccount(userAccount);
    } catch (error) {
      console.error("Error fetching user account:", error);
    }
  };

  const followUser = async () => {
    try {
      await followsClient.userFollowsUser(accountId);
      await fetchFollowers();
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const save = async () => {
    try {
      if (currentUser && currentUser._id === account._id) {
        await client.updateUser(account);
        console.log("Account information updated successfully!");
      } else {
        console.error("You do not have permission to edit this account.");
      }
    } catch (error) {
      console.error("Error updating user account:", error);
    }
  };

  const unfollowUser = async () => {
    try {
      await followsClient.userUnFollowsUser(accountId);
      await fetchFollowers();
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const fetchFollowers = async () => {
    try {
      let userFollowers;
      if (account && account._id) {
        userFollowers = await followsClient.findFollowersOfUser(account._id);
      } else {
        console.error("Cannot fetch followers: account._id is null.");
        return;
      }
      setFollowers(userFollowers);
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  const fetchFollowing = async () => {
    try {
      let userFollowing;
      if (accountId) {
        userFollowing = await followsClient.findFollowedUsersByUser(accountId);
      } else if (account && account._id) {
        userFollowing = await followsClient.findFollowedUsersByUser(
          account._id
        );
      } else {
        console.error(
          "Cannot fetch following: account or account._id is null."
        );
        return;
      }
      setFollowing(userFollowing);
    } catch (error) {
      console.error("Error fetching following:", error);
    }
  };

  const alreadyFollowing = () => {
    return followers.some((follow) => {
      return follow.follower._id === currentUser._id;
    });
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
          {alreadyFollowing() ? (
            <Button
              onClick={unfollowUser}
              variant="danger"
              className="float-end"
            >
              Unfollow <BsFillHeartFill />
            </Button>
          ) : (
            <Button onClick={followUser} variant="warning" className="float-end">
              Follow <BsFillHeartFill />
            </Button>
          )}
        </div>
      )}

      {account && (
        <div style={{ overflowY: "auto", overflowX: "auto", width: "750px", height: "580px" }}>
          <h1>
            <RiAccountPinBoxFill /> Account
          </h1>
          <div className="input-group">
            <label>
              <BsFillPersonFill /> Username
            </label>
            <input
              value={account.username}
              onChange={(e) =>
                setAccount({ ...account, username: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label>
              <BsFillPersonFill /> First Name
            </label>
            <input
              value={account.firstName}
              onChange={(e) =>
                setAccount({ ...account, firstName: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label>
              <BsFillPersonFill /> Last Name
            </label>
            <input
              value={account.lastName}
              onChange={(e) =>
                setAccount({ ...account, lastName: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label>
              <BsCalendarFill /> Date of Birth
            </label>
            <input
              value={account.dob}
              onChange={(e) =>
                setAccount({ ...account, dob: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label>
              <BsFillEnvelopeFill /> Email
            </label>
            <input
              value={account.email}
              onChange={(e) =>
                setAccount({ ...account, email: e.target.value })
              }
            />
          </div>

          {currentUser && account._id === currentUser._id && (
            <Button onClick={save} variant="primary" className="save-button">
              Save
            </Button>
          )}

          {currentUser && account.role === "ADMIN" ? (
            <Link to="/TuneHeartBeat/users/table" className="users-link">
              Users
            </Link>
          ) : (
            <p>
              The above user is not an admin<br />
              In order to update the user details, You must go to your Admin account page by clicking on account and select users and update the information of the above user
            </p>
          )}

          <h3>
            <BsFillHeartFill /> Followers
          </h3>
          <div style={{ overflowY: "auto", overflowX: "auto", width: "750px", height: "200px" }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                </tr>
              </thead>
              <tbody>
                {followers.map((follow, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={`/TuneHeartBeat/Account/${follow.follower._id}`}>
                        {follow.follower.firstName}
                      </Link>
                    </td>
                    <td>{follow.follower.lastName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3>
            <BsFillHeartFill /> Following
          </h3>
          <div style={{ overflowY: "auto", overflowX: "auto", width: "750px", height: "200px" }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                </tr>
              </thead>
              <tbody>
                {following.map((follow, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={`/TuneHeartBeat/Account/${follow.followed._id}`}>
                        {follow.followed.firstName}
                      </Link>
                    </td>
                    <td>{follow.followed.lastName}</td>
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
