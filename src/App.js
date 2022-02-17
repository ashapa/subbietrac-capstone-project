import React from "react";
// import SideNav from "./components/SideNav";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Dashboard from "./components/Dashboard";
import SubscriptionsList from "./components/SubscriptionsList";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import "./App.css"

// https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <SubscriptionsList /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="/subscriptions" element={<SubscriptionsList />} />
      </Routes>
    </>
  );
}

export default App;
