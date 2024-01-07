import { useState } from "react";
import { useAuth } from "../../contexts/auth-context";
import { useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import {toast} from  'react-hot-toast';


export const Login = () => {
  const { getLoginData, setIsLoggedIn, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const guestCreds = {
    firstName: "Aakarsha",
    lastName: "Shetty",
    email: "aakarshashetty@gmail.com",
    password: "aakarshashetty",
  };
  const loginHandler = () => {
    const { email, password } = userData;
    if (email !== "" && password !== "") {
      setIsLoggedIn(!isLoggedIn);
      getLoginData(email, password);
      navigate(location?.state?.from?.pathname);
    } else {
      toast.error("Invalid Credentials")
    }
  };
  const loginAsGuestHandler = () => {
    setIsLoggedIn(!isLoggedIn);
    getLoginData(guestCreds.email, guestCreds.password);
    navigate("/");
  };
  const handleCredentials = (e) => {
    if (e.target.type === "email" && e.target.value !== "") {
      setUserData({ ...userData, email: e.target.value });
    }
    if (e.target.type === "password" && e.target.value !== "") {
      setUserData({ ...userData, password: e.target.value });
    }
  };
  return (
    <div className="login">
      <h2>Login</h2>
      <label>
        <p>Email address</p>
        <input
        className=".login-inputs"
          placeholder="Enter email"
          type="email"
          onChange={(e) => handleCredentials(e)}
        />
      </label>
      <label>
        <p>Password</p>
        <input
        className=".login-inputs"
          placeholder="Enter password"
          type="password"
          onChange={(e) => handleCredentials(e)}
        />
      </label>

      <button onClick={loginHandler} className="login-button">{isLoggedIn ? "Logout" : "Login"}</button>
      <button onClick={loginAsGuestHandler} className="login-guest">Login As a Guest</button>
      <span>
        Don't have an account? <NavLink to="/signup">Sign up</NavLink>
      </span>
    </div>
  );
};
