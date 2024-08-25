import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import { jwtDecode } from "jwt-decode";

import { signOut_ } from "./api";
function App() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    async function isAuth() {
      const token = currentUser?.access_token;
      if (token) {
        let decodedtoken = jwtDecode(token);

        if (decodedtoken.exp * 1000 < new Date().getTime()) {
          try {
            await signOut_(); // Make a POST request to clear the cookie
            localStorage.setItem("currentUser", null);

            window.location.reload();
          } catch (error) {
            console.error("Error logging out", error);
          }
        }
      }
    }
    isAuth();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            exact
            Component={() => (currentUser ? <Home /> : <Navigate to="/auth" />)}
          />
          {/* <Route path='/' exact Component={()=><Home/>}/>   */}
          <Route path="/auth" Component={Auth} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
