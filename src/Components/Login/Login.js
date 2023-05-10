import React, { useContext, useState } from "react";

import Logo from "../../olx-logo.png";
import "./Login.css";
import { auth, db } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../store/Context";

function Login() {

const {setUser} = useContext(userContext)


  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = () => {
    

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        
        // ...
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <label htmlFor="fname">Email</label>
        <br />
        <input
          className="input"
          type="email"
          id="fname"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="lname">Password</label>
        <br />
        <input
          className="input"
          type="password"
          id="lname"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button onClick={handleSubmit}>Login</button>
        <a href="/signup">Signup</a>
      </div>
    </div>
  );
}

export default Login;
