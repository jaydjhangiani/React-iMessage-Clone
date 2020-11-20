import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "./firebase";
import logo from './releaf.jpg'
import "./Login.css";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src= {logo}
          alt=""
        />
        <h1>Welcome to the Chat Room</h1>
      </div>

      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
