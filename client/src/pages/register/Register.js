import './register.css'
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import amazoneLogo from './Amazon logo.png'

function Register() {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const [isAdmin, setIsAdmin] = useState(false)
  let navigate = useNavigate();
  const [errorMessageName, setErrorMessageName] = useState('')
  const [errorMessageEmail, setErrorMessageEmail] = useState('')
  const [errorMessagePass, setErrorMessagePass] = useState('')
  const [errorMessagePass2, setErrorMessagePass2] = useState('')
  let ename, eemail, epass, epass2 = true

  const nameCheck = ()=>{
    const validateName=()=>{
      if(String(name.current.value).match(/^[a-zA-Z\-]+$/))
        return true
      else
        return false
    }

    if(!validateName()){
      ename = true
      setErrorMessageName("Only Characters A-Z, a-z and '-' are  acceptable.")
    }
    else{
      ename = false
      setErrorMessageName("")
    }

  }
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
  const pass2Check = ()=>{
    if(password.current.value === confirmPassword.current.value){
      epass2 = false
      setErrorMessagePass2("")
    }
    else{
      epass2 = true
      setErrorMessagePass2("Password does not match")
    }
  }
  const handleChange = (e) => {
    setIsAdmin( e.target.checked )
  };
  const formValidation = ()=>{
    if(name.current.value ===''){
      ename = true
      setErrorMessageName("Name can not be empty")
    }
    else{
      nameCheck()
    }
    
  
    if(email.current.value ===''){
      eemail = true
      setErrorMessageEmail("Email can not be empty")
    }
    else{
      emailCheck()
    }
      
    
    if(password.current.value ===''){
      epass = true
      setErrorMessagePass("Password can not be empty")
    }
    else{
      passCheck()
    }
    
    if(confirmPassword.current.value ===''){
      epass2  =true
      setErrorMessagePass2("Confirm Password can not be empty")
    }
    else{
      pass2Check()
    }
  }


  const errorContainer = ()=>{
    if(ename || eemail || epass || epass2)
      return true
    else
      return false
  }

  const handleRegisterClick = async  (e)=>{
    e.preventDefault()
    const userInfo = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      isAdmin: isAdmin
    }
    formValidation()
    if(!errorContainer()){
      try{
        const reg = await axios.post('http://localhost:8000/auth/register', userInfo)
        await axios.post("http://localhost:8000/order/orders",{ user_id: reg.data._id })
        reg && navigate('/login')
      }catch(err){
        console.log(err);
      }

    }
  }

  return (
    <div className='sing_up_container'>
    <NavLink  to="/"
      style={{ color: 'inherit',  textDecoration: 'inherit'}} className="amazon_logo">
      <img src={amazoneLogo} alt='amazon logo' />
    </NavLink>
      <div className="registration_login_container">
      <div className="sing_up">
        <h2>Create Account</h2>
        <div className="singup_name">
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" className="name_field" ref = {name}/>
          <small >{errorMessageName}</small>
        </div>
        <div className="singup_email">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" className="email_field" ref = {email}/>
          <small >{errorMessageEmail}</small>
        </div>
        <div className="singup_password">
          <label htmlFor="password">Password</label>
          <input type="text" id="password" placeholder='At least 6 characters' className="password_field" ref = {password}/>
          <small >{errorMessagePass}</small>
        </div>
        <div className="singup_confirm_password">
          <label htmlFor="confirm_password">Re-enter password</label>
          <input type="text" id="confirm_password" className="confirm_password_field" ref = {confirmPassword}/>
          <small >{errorMessagePass2}</small>
        </div>
        <div className="isAdmin">
          <input type="checkbox" id='checkBox' onChange={handleChange}></input>
          <label htmlFor="checkBox">Admin</label>
        </div>
        
        <div className="sing_up_btn"  onClick={handleRegisterClick}><button>Continue</button></div>
        <span>
          By createing an account, you agree to Amazon's
          <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=508088"> Condition of Use </a>
           and
          <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=468496"> Privacy Notic </a>
        </span>
        <p>Already have an account? <Link to="/login">Sing-In</Link></p>
      </div>
      </div>
    </div>
  )
}

export default Register