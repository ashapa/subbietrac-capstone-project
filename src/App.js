import React from "react";
import Navbar from "./components/NavBar";
import SideNav from "./components/nav/SideNav";
import Login from "./components/Login";
import SubscriptionsList from "./components/SubscriptionsList";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import "./App.css"

// https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom
function App() {
  return (
    <>
      {/* <Navbar /> */}
      {/* <SideNav /> */}
        <Routes>
        <Route path="/" element={<Login />}/>
          <Route path="/subscriptions" element={<SubscriptionsList />} />
        </Routes>
    </>
  );
}

export default App;
