import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {FiEyeOff,FiEye} from 'react-icons/fi'
import { useAuth } from "../../contexts/auth-context";

const SignUp = () => {
  const { addUserData } = useAuth();
  const [passwordType, setPasswordType] = useState(false);
  const navigate = useNavigate();
  const [newUserData, setNewUserData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const signupHandler = () => {
    if (
      newUserData.email !== "" &&
      newUserData.password !== "" &&
      newUserData.firstName !== "" &&
      newUserData.lastName !== ""
    ) {
      addUserData(newUserData);
      navigate("/");
    } else {
      alert("Enter proper details");
    }
  };
  return (
    <div className="signup">
      <h2>Sign up</h2>
      <label className="name">
        <p className="first-name">First name:</p>
        <input
          placeholder="Enter your first name"
          onChange={(e) =>
            setNewUserData({ ...newUserData, firstName: e.target.value })
          }
          className="first-name-input"
        />
        <p className="last-name">Last name:</p>
        <input
          placeholder="Enter your Last name"
          onChange={(e) =>
            setNewUserData({ ...newUserData, lastName: e.target.value })
          }
          className="last-name-input"
        />
      </label>
     
      <label>
        <p>
          Email Address:
          </p>
        <input
          placeholder="Enter your email"
          onChange={(e) =>
            setNewUserData({ ...newUserData, email: e.target.value })
          }
        />
      </label>
      
      <label>
        <p>Password:</p>
        <input
          type={passwordType ? "text" : "password"}
          onChange={(e) =>
            setNewUserData({ ...newUserData, password: e.target.value })
          }
        />
        <button onClick={() => setPasswordType((prev) => !prev)} className="show">
          {passwordType ? <FiEyeOff/> : <FiEye/>}
        </button>
      </label>
      <label>
        <p>Confirm password:</p>
        <input type={passwordType ? "text" : "password"} />
      </label>
      <button onClick={signupHandler} className="signup-button">Create New Account</button>
      <span>
        Already have an account? <NavLink to="/login">sign in</NavLink>
      </span>
    </div>
  );
};

export default SignUp;
