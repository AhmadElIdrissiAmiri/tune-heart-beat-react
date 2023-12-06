import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "../users/client";
import "./signup.css";

function Signup() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "user",
    dateOfBirth: ""
  });
  const navigate = useNavigate();

  const signup = async () => {
    try {
      await client.signup(credentials);
      navigate("/TuneHeartBeat/home");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="signup-container ">
      <h1>Signup</h1>
      {error && <div className="error-message">{error}</div>}
      <input
        className="input-field"
        type="text"
        placeholder="First Name"
        value={credentials.firstName}
        onChange={(e) =>
          setCredentials({ ...credentials, firstName: e.target.value })
        }
      />
      <input
        className="input-field"
        type="text"
        placeholder="Last Name"
        value={credentials.lastName}
        onChange={(e) =>
          setCredentials({ ...credentials, lastName: e.target.value })
        }
      />
      <input
        className="input-field"
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <input
        className="input-field"
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      <input
        className="input-field"
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <select
        className="input-field"
        value={credentials.role}
        onChange={(e) =>
          setCredentials({ ...credentials, role: e.target.value })
        }
      >
        <option value="USER">User</option>
        <option value="ARTIST">Artist</option>
        <option value="ADMIN">Admin</option>
      </select>
      <input
        className="input-field"
        type="date"
        placeholder="Date of Birth"
        value={credentials.dob}
        onChange={(e) =>
          setCredentials({ ...credentials, dob: e.target.value })
        }
      />
      <button className="signup-button" onClick={signup}>
        Signup
      </button>
    </div>
  );
}

export default Signup;
