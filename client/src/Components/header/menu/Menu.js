import { useContext } from 'react'
import { Context } from '../../../context/shooping/Context'
import { NavLink } from "react-router-dom";
import {RiAdminLine} from 'react-icons/ri'
import {FiUser} from 'react-icons/fi'
import {AiOutlineHome} from 'react-icons/ai'
import {BiHistory, BiLogOut} from 'react-icons/bi'
import './menu.css'

function Menu({open, close}) {
  const {user, dispatch} = useContext(Context)

  const logOut = ()=>{
      dispatch({type: "LOGOUT"})
    }

  if(!open) return null
  return (
    <div className='menu_container'>
    <div className="menu_list">
    <div className="menu_amazon_title">
    
      <NavLink to="/login" onClick={logOut} style={{ color: 'inherit',  textDecoration: 'inherit'}}>
      <div className="menu_navbar">
          <FiUser className='menu_navbar_icon'/>
          <div className="menu_navbar_text">
              <h5>{user? `Hello, ${user.name}`: `Welcome to Amazon`}</h5>
          </div>
      </div>
    </NavLink> 

      <small>Browse</small>
      <div>Amazon</div>
    </div>
    <NavLink to="/" style={{ color: 'inherit',  textDecoration: 'inherit'}}  onClick={close}>
    <div className='menu_navbars'>
        <AiOutlineHome className='menu_navbar_icon'/>
        <h5 className="menu_navbar_text">Home</h5> 
    </div>
</NavLink>
    <NavLink to="/orderhistory" style={{ color: 'inherit',  textDecoration: 'inherit'}}  onClick={close}>
        <div className='menu_navbars'>
            <BiHistory className='menu_navbar_icon'/>
            <h5 className="menu_navbar_text">Orders</h5> 
        </div>
    </NavLink>
    {
        user?.isAdmin &&
        <NavLink to="/admin" style={{ color: 'inherit',  textDecoration: 'inherit'}}>
        <div className="menu_navbars">
            <RiAdminLine className='menu_navbar_icon'/>
            <h5 className="menu_navbar_text">Admin</h5>
        </div>
    </NavLink>
} 
{
  user ?
  <NavLink to="/login" onClick={logOut} style={{ color: 'inherit',  textDecoration: 'inherit'}}>
  <div className="menu_navbars">
      <BiLogOut className='menu_navbar_icon'/>
      <h5 className="menu_navbar_text">Sing Out</h5>
  </div>
</NavLink> :
<NavLink to="/login" style={{ color: 'inherit',  textDecoration: 'inherit'}}>
<div className="menu_navbars">
  <BiLogOut className='menu_navbar_icon'/>
  <h5 className="menu_navbar_text">Sing in</h5>
</div>
</NavLink>
}
</div>  
<button className="close_btton" onClick={close}>X</button>
</div>
  )
}

export default Menu