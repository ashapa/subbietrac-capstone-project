import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../firebase/config";
import { query, collection, getDocs, where } from "firebase/firestore"
import { FaTypo3, FaTimes, FaBars } from "react-icons/fa";
import "./NavBar.css";

function NavBar() {
  //create initial menuIconClick state using useState hook
  const [menuIconClick, setMenuIconClick] = useState(false);

  //create a function that will change menuIconClick state from false to true and true to false
  const handleMenuIconClick = () => setMenuIconClick(!menuIconClick);

  const closeMobileMenu = () => setMenuIconClick(false);
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
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/dashboard" className="navbar-logo">
            SubbieTrac <FaTypo3 className="fab fa-typo3" />
          </Link>
          {/* pass a function to the onClick property to update the usestate of menuIconClick to be the opposite of whatever the current state of menuIconClick is*/}
          <div className="menu-icon" onClick={handleMenuIconClick}>
            {/* set the hamburger menu below */}
            {/* set the usestate of menuIconClick so that when the icon is clicked it changes from an 'X' to a 'hamburger menu' icon */}
            {/* changing menu icon depending on the state of menuIconClick */}
            {menuIconClick ? (
              <FaTimes className="fas fa-times" />
            ) : (
              <FaBars className="fas fa-bars" />
            )}
          </div>
          {/* set the nav menu to disappear when the menu icon is clicked */}
          <ul className={menuIconClick ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/subscriptions"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Subscriptions
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/sign-up"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Sign up
              </Link>
            </li>
          <button className="button" onClick={logout}>LOGOUT</button>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
