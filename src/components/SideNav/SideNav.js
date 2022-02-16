import { Link } from "react-router-dom";
//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaTypo3, FaList } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { GoGraph } from "react-icons/go";
// import { AiOutlineForm } from "react-icons/ai"
// import { BiCog } from "react-icons/bi";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./SideNav.css";

const Header = () => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    //   menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    // };
    if (menuCollapse) {
      return setMenuCollapse(false);
    } else {
      return setMenuCollapse(true);
    }
  };

  return (
    <>
      <div id="sidebar">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            {/* Add a header for the sidebar ex: logo */}
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? <FaTypo3 /> : "SubbieTrac"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            {/* Add the content of the sidebar ex: menu details */}
            <Menu iconShape="square">
              <MenuItem
                active={window.location.pathname === "/home"}
                icon={<FiHome />}
              >
                <Link to="/home"> Home </Link>
              </MenuItem>
              <MenuItem
                active={window.location.pathname === "/subscriptions"}
                icon={<FaList />}
              >
                <Link to="/subscriptions">Subscriptions</Link>
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            {/* Add a footer for the sidebar ex: logout button */}
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
