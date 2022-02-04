import { Routes, Route } from "react-router-dom";
import SubscriptionsList from "./components/SubscriptionsList";
import SideNav from "./components/nav/SideNav";
import "./App.css";
import SignUpForm from "./components/SignUpForm";
import LandingPage from "./components/LandingPage";
import AddNew from "./components/AddNew";
import "./firebase/config"

function App() {
  return (
    <div className="App">
      <SideNav />
      <div className="main-content">
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/add-new" element={<AddNew />} />
          <Route path="subscriptions" element={<div> Subscriptions </div>} />
        </Routes>{" "}
      </div>
    </div>
  );
}

export default App;
