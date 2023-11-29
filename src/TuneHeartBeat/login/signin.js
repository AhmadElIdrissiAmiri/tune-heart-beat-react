import * as client from "../users/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";

function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const signin = async () => {
    await client.signin(credentials);
    navigate("/TuneHeartBeat/home/home");
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
