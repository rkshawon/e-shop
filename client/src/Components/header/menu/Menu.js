import { useContext } from "react";
import { Context } from "../../../context/shooping/Context";
import { NavLink } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { BiHistory, BiLogOut } from "react-icons/bi";
import "./menu.css";

function Menu({ open, close }) {
  const { user, dispatch } = useContext(Context);

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
  };

  if (!open) return null;
  return (
    <div className="menu_container">
      <div className="menu_list">
        <div className="menu_amazon_title">
          <a
            href="/login"
            onClick={logOut}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <div className="menu_navbar">
              <FiUser className="menu_navbar_profile_icon" />
              <div className="menu_navbar_text">
                <h5>{user ? `Hello, ${user.name}` : `Welcome to Amazon`}</h5>
              </div>
            </div>
          </a>

          <small>Browse</small>
          <div>Amazon</div>
        </div>
        <NavLink
          to="/"
          style={{ color: "inherit", textDecoration: "inherit" }}
          onClick={close}
        >
          <div className="menu_navbars">
            <AiOutlineHome className="menu_navbar_icon" />
            <h5 className="menu_navbar_text">Home</h5>
          </div>
        </NavLink>
        <NavLink
          to="/orderhistory"
          style={{ color: "inherit", textDecoration: "inherit" }}
          onClick={close}
        >
          <div className="menu_navbars">
            <BiHistory className="menu_navbar_icon" />
            <h5 className="menu_navbar_text">Orders</h5>
          </div>
        </NavLink>
        {user?.isAdmin && (
          <a
            href="/admin"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <div className="menu_navbars">
              <RiAdminLine className="menu_navbar_icon" />
              <h5 className="menu_navbar_text">Admin</h5>
            </div>
          </a>
        )}
        {user ? (
          <a
            href="/login"
            onClick={logOut}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <div className="menu_navbars">
              <BiLogOut className="menu_navbar_icon" />
              <h5 className="menu_navbar_text">Sign Out</h5>
            </div>
          </a>
        ) : (
          <a
            href="/login"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <div className="menu_navbars">
              <BiLogOut className="menu_navbar_icon" />
              <h5 className="menu_navbar_text">Sign in</h5>
            </div>
          </a>
        )}
      </div>
      <div onClick={close}>
        <button className="menu_close_btton">
          <MdOutlineClose />
        </button>
      </div>
    </div>
  );
}

export default Menu;
