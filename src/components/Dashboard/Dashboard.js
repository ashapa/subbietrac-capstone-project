import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../NavBar"
import "./Dashboard.css";
import { auth, db, logout } from "../../firebase/config";
import { query, collection, getDocs, where } from "firebase/firestore";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  return (
    <div>
      <NavBar />
      {/* <div>
        <div>
          Logged in as
        </div>
        <div>{name}</div>
        <div>{user?.email}</div>
      </div>
        
      <button className="dashboard__btn" onClick={logout}>
        Logout
      </button> */}

      <div className="hero home">
        <div className="hero__container">
          <h1 className="hero__heading">Welcome <span className="hero-head__span">{name}</span></h1>
          <p className="hero__description">Click on <span className="hero-des__span">subscriptions</span> to start tracking!</p>
          <button className="main__btn"><Link to='/subscriptions' className='link'>Add Now</Link></button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;