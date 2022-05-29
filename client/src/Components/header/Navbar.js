import './navbar.css'
import { NavLink } from "react-router-dom";
import {FiSearch} from 'react-icons/fi'
import {FiShoppingCart} from 'react-icons/fi'
import {RiAdminLine} from 'react-icons/ri'
import {FiUser} from 'react-icons/fi'
import {FiMenu} from 'react-icons/fi'
import {BiHistory} from 'react-icons/bi'
import amazonLogo from './amazonlogo.png'
import { Context } from '../../context/shooping/Context';
import { useContext, useState } from 'react';
import { BasketContext } from '../../context/shooping/BasketContext';
import Menu from './menu/Menu';

function Navbar() {
    const {user, dispatch} = useContext(Context)
    const {basket} = useContext(BasketContext)
    const [searchText, setSearchtext] = useState('')
    const [openMenu, setOpenMenu] = useState(false)

    const logOut = ()=>{
        dispatch({type: "LOGOUT"})
      }


  return (
      <header className='headerContainer'>
      {
        openMenu && <Menu 
        open = {openMenu}
        close = {()=>setOpenMenu(false)}/>
    }
        <div className = "leftheader">
        <NavLink  to="/" style={{ color: 'inherit',  textDecoration: 'inherit'}}>
            <div className="logo_container">
                <div onClick={()=>setOpenMenu(true)}  className="menu">
                <FiMenu className='menuicon'/>
            </div>
                <img src={amazonLogo} alt="amazon" />
            </div>    
        </NavLink>
         
            <div className="search">
                <input type="text" onChange={(e)=>setSearchtext(e.target.value)}/>
                <NavLink to={searchText && `/search?name=${searchText}`}
                className='searchicon'
                style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <FiSearch/>
                </NavLink>
            </div>
        </div>

        <div className="middleheader">
            <NavLink to="/cart" style={{ color: 'inherit',  textDecoration: 'inherit'}}>
                <div className="shoopingCard">
                    <div className='card_container'>
                        <FiShoppingCart className='cardicon'/>
                        <span>{basket?.length}</span>
                    </div> 
                    <h5 className="card">Card</h5> 
                </div>
            </NavLink>
        </div>
        <div className="rigthheader ">
            {
                user ? <NavLink to="/login" onClick={logOut} style={{ color: 'inherit',  textDecoration: 'inherit'}}>
                <div className="navbars">
                    <FiUser className='navbar_icon'/>
                    <div className="navbar_text">
                        <h5>{`Hi, ${user.name}`}</h5>
                        <h5 className='singout'>Sing out</h5>
                    </div>
                </div>
            </NavLink> :
            <NavLink to="/login" style={{ color: 'inherit',  textDecoration: 'inherit'}}>
            <div className="navbars">
                <FiUser className='navbar_icon'/>
                <h5 className="navbar_text">Sing in</h5>
            </div>
            </NavLink>
        }
            <NavLink to="/orderhistory" style={{ color: 'inherit',  textDecoration: 'inherit'}}>
                <div className='navbars'>
                    <BiHistory className='navbar_icon'/>
                    <h5 className="navbar_text">Orders</h5> 
                </div>
            </NavLink>
            <NavLink to="/cart" style={{ color: 'inherit',  textDecoration: 'inherit'}}>
                <div className="shoopingCard">
                    <div className='card_container'>
                        <FiShoppingCart className='cardicon'/>
                        <span>{basket?.length}</span>
                    </div> 
                    <h5 className="card navbar_text">Card</h5> 
                </div>
            </NavLink>
            {
                user?.isAdmin &&
                <NavLink to="/admin" style={{ color: 'inherit',  textDecoration: 'inherit'}}>
                <div className="navbars">
                    <RiAdminLine className='navbar_icon'/>
                    <h5 className="navbar_text">Admin</h5>
                </div>
            </NavLink>
        } 
        </div>
      </header>
  )
}

export default Navbar