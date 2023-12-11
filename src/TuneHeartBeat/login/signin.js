import * as client from "../users/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../users/reducer";

import "./signin.css";

function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signin = async () => {
    try {
      // Perform the asynchronous sign-in operation
      const signinResult = await client.signin(credentials);
      localStorage.setItem('currentUser', JSON.stringify(signinResult));
      // Assuming signinResult contains user information after signing in
      // Update the Redux state with the user information
      dispatch(setCurrentUser(signinResult));

      // Navigate to the desired location
      navigate("/TuneHeartBeat/home/");
    } catch (error) {
      console.error("Error during sign-in:", error);
      // Handle any errors that occurred during sign-in
    }
  };

  return (
    <div className="signin-container">
      <h1 className="signin-heading">Signin</h1>
      <input
        className="input-field"
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        className="input-field"
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button className="signin-button" onClick={signin}>
        Signin
      </button>
    </div>
  );
}

export default Signin;