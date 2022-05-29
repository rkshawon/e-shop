import './login.css'
import { NavLink  } from "react-router-dom";
import amazoneLogo from './Amazon logo.png'
import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Context } from '../../context/shooping/Context'

function Login() {
  const email = useRef();
  const password = useRef();
  const {dispatch} = useContext(Context);
  let navigate = useNavigate();
  const [errorMessageEmail, setErrorMessageEmail] = useState('')
  const [errorMessagePass, setErrorMessagePass] = useState('')
  const [serverError, setServerError] = useState('')
  let eemail, epass = true


  const emailCheck = ()=>{
    const validateEmail = () => {
      if(String(email.current.value).match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ))
        return true
      else
        return false
    };
   
    if(!validateEmail()){
      eemail = true
      setErrorMessageEmail("Email is not valid")
    }
    else{
      eemail = false
      setErrorMessageEmail("")
    }
  }

  const passCheck = ()=>{
    if(password.current.value?.length <6){
      epass = true
      setErrorMessagePass("Password can not be less than 6 character")
    }
    else{
      epass = false
      setErrorMessagePass("")
    }
  }

  const formValidation = ()=>{
    if(email.current.value ===''){
      eemail = true
      setErrorMessageEmail("Email can not be empty")
    }
  else
    emailCheck()
  
    if(password.current.value ===''){
      epass = true
      setErrorMessagePass("Password can not be empty")
    }
  else
    passCheck()
  }

  const errorContainer = ()=>{
    if(eemail || epass)
      return true
    else
      return false
  }
  const handleLoginClick = async  (e)=>{
    e.preventDefault()
    formValidation()
    dispatch({ type: "LOGIN_START" });
    try {
      if(!errorContainer()){
      const res = await axios.post("http://localhost:8000/auth/login", {
        email: email.current.value,
        password: password.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      console.log(res.data);
      res.data && navigate('/')
    }
    } catch (err) {
      setServerError("Username or password not valid")
      dispatch({ type: "LOGIN_FAILURE" });
    }
  }
  return (
    <div className="log_in_container">
    <NavLink  to="/"
      style={{ color: 'inherit',  textDecoration: 'inherit'}} className="amazon_logo">
      <img src={amazoneLogo} alt='amazon logo' />
    </NavLink>
    <div className="login_container">
      <div className="sing_in">
      <h2>Sing-In</h2>
      <label>Email</label>
      <input type = 'text' placeholder='email' className="sing_in_field"  ref = {email}/>
      <small >{errorMessageEmail}</small>
      <label>Password</label>
      <input type = "password" placeholder='password' className="sing_in_field"  ref = {password}/>
      <small >{errorMessagePass}</small>
      <div className="sing_in_btn" onClick={handleLoginClick}><button>Continue</button></div>
      <span>
        By continueing, you agree to Amazon's 
        <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=508088"> Condition of Use </a>
        and
        <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=468496"> Privacy Notic</a>
      </span>
      <small className="small">{serverError}</small>
      </div>
    </div>
    <div className="create_new_id">
      <h5>New to Amazon?</h5>
      <a href="register" className="new_account"><button>Create your Amazon account</button></a>
  </div>
    </div>
  )
}

export default Login