import { createContext, useContext, useState } from "react";
import {toast} from 'react-hot-toast';
const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(localStorage?.user);
  const getLoginData = async (userEmail, userPassword) => {
    try {
      const creds = {
        email: userEmail,
        password: userPassword,
      };
      const response = await fetch("/api/auth/login", {
        method: "POST", // or 'PUT'
        body: JSON.stringify(creds),
      });
      const { foundUser, encodedToken } = await response.json();
      localStorage.setItem("encodedToken", encodedToken);
      localStorage.setItem("user", JSON.stringify({ user: foundUser }));
      setUserData(foundUser);
      toast.success("LoggedIn Successfully")
    } catch (e) {
      toast.error("Something went wrong")
    }
  };
  const addUserData = async ({ firstName, email }) => {
    try {
      const userData = {
        email,
        firstName,
      };

      const response = await fetch("/api/auth/signup", {
        method: "POST", // or 'PUT'
        body: JSON.stringify(userData),
      });
      const { encodedToken, createdUser } = await response.json();
      localStorage.setItem("encodedToken", encodedToken);
      localStorage.setItem("user", JSON.stringify({ user: createdUser }));
      setUserData(createdUser);
      toast.success("Profile created successfully")
    } catch (e) {
      toast.error("Something went wrong")
    }
  };
  return (
    <AuthContext.Provider
      value={{
        getLoginData,
        isLoggedIn,
        setIsLoggedIn,
        addUserData,
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
