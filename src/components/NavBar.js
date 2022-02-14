import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTypo3, FaTimes, FaBars } from "react-icons/fa";

function NavBar() {
  //create initial menuIconClick state using useState hook
  const [menuIconClick, setMenuIconClick] = useState(false);

  //create a function that will change menuIconClick state from false to true and true to false
  const handleMenuIconClick = () => setMenuIconClick(!menuIconClick);

  const closeMobileMenu = () => setMenuIconClick(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
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
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
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
          </ul>
          {/* 'button && <button className="btn--outline">SIGN UP</button>' means the same thing as below. && is a shortcut, meaning anything after the '?' will be returned if the preceeding conditonal is true */}
          {/* {button ? <button className="btn--outline">SIGN UP</button> : ''} */}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
