import React, { useContext, useEffect } from "react";
import "./App.css";

import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Context, { userContext } from "./store/Context";
import Create from "./Components/Create/Create";


function App() {
 
  return (
    <div>
      <Context>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/create"} element={<Create/>}></Route>
        </Routes>
      </Context>
    </div>
  );
}

export default App;
