import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function AuthButtons() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = e => {
    e.preventDefault();
    history.push("/register");
  };
  const login = e => {
    e.preventDefault();
    history.push("/login");
  };
  const logout = e => {
    e.preventDefault();
    setUserData({ token: undefined, user: undefined });
    localStorage.setItem(("auth-token": ""));
  };
  return (
    <nav>
      {userData.user ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Log in</button>
        </>
      )}
    </nav>
  );
}
