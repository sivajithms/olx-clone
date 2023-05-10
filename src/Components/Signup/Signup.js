import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import Logo from "../../olx-logo.png";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import "./Signup.css";
import { auth, db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: name,
        }).then(() => {
          // Profile updated!
          console.log('updated',user.displayName);
          // ...
        }).catch((error) => {
          // An error occurred
          // ...
        });
        await addDoc(collection(db, "users"), {
          uid:user.uid,
          name,
          phone,
        }).then((doc) => {
          console.log("Document written with ID: ", doc.id);
          navigate("/login");
        });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
    console.log(name);
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo"></img>
        <label htmlFor="fname">Username</label>
        <br />
        <input
          className="input"
          type="text"
          id="fname"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
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
        <label htmlFor="lname">Phone</label>
        <br />
        <input
          className="input"
          type="number"
          id="lname"
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <label htmlFor="lname">Password</label>
        <br />
        <input
          value={password}
          className="input"
          type="password"
          id="lname"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button onClick={handleSubmit}>Signup</button>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
