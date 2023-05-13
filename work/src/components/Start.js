import "./App.css";
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./Signin";
import SignUp from "./Signup";
import AppMain from "./App";
import Dashboard from "./Dashboard";

/*
function Start() {
  const email = localStorage.getItem("email");
  const [authenticated, setAuthenticated] = React.useState(false);
 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route
            path="/Home"
           // element={email ? <AppMain /> : <Navigate to="/" />}
           element={authenticated ? <AppMain /> : <Navigate to="/" />}

          />
        </Routes>
      </BrowserRouter>
    </div>
  );
} */
function Start() {
  const email = localStorage.getItem("email");
 // const [authenticated, setAuthenticated] = React.useState(Boolean(email));
 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route
            path="/Home"
            element={email ? <AppMain /> : <Navigate to="/" />}  
         //   element={authenticated ? <AppMain /> : <Navigate to="/" />}
          />

          <Route
            path="/Homenew"
            element={ <><AppMain  /><AppMain  /></> }  
         //   element={authenticated ? <AppMain /> : <Navigate to="/" />}
          />
             <Route
            path="/Homenew"
            element={ <><Dashboard  /><Dashboard  /></> }  
         //   element={authenticated ? <AppMain /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default Start;
