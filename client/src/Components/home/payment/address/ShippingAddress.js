import './shippingAddress.css'
import { NavLink, useNavigate  } from "react-router-dom";
import amazoneLogo from './Amazon logo.png';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { Context } from '../../../../context/shooping/Context';

function ShippingAddress() {
    const {user, dispatch} = useContext(Context) 
    const [shippingName, setShippingName] = useState('')
	const [address, setShippingAddress] = useState('')
	const [shippingCity, setShippingCity] = useState('')
	const [zipCode, setZipCode] = useState('')
	const [shippingPhone, setShippingPhone] = useState('')
	const [shippingEmail, setShippingEmail] = useState('')
    let navigate = useNavigate();
    const [errorMessageName, setErrorMessageName] = useState('')
    const [errorMessageEmail, setErrorMessageEmail] = useState('')
    const [errorMessagePhone, setErrorMessagePhone] = useState('')
    const [errorMessageAddress, setErrorMessageAddress] = useState('')
    const [errorMessageCity, setErrorMessageCity] = useState('')
    const [errorMessageZip, setErrorMessageZip] = useState('')
    const [serverError, setServerError] = useState('')
    let ename, eemail, eaddress, ephone, ezip, ecity = true

    
  const nameCheck = ()=>{
    let spaceCheck = shippingName
    const validateName=()=>{
      if(String(spaceCheck.split(/\s/).join('')).match(/^[a-zA-Z\-]+$/))
        return true
      else
        return false
    }

    if(!validateName()){
      ename = true
      setErrorMessageName("Only Characters A-Z, a-z and '-' are  acceptable.")
    }
    else{
      if(shippingName.length > 30){
        ename = true
        setErrorMessageName("Name must be less than 30 characters")
      }
      else{
        ename = false
        setErrorMessageName("")
      }
    }

  }
  const emailCheck = ()=>{
    const validateEmail = () => {
      if(String(shippingEmail).match(
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
  const phoneCheck = ()=>{
    if(shippingPhone?.length <9 || shippingPhone?.length > 12){
      ephone = true
      setErrorMessagePhone("Phone must be between 9 to 12")
    }
    else{
      ephone = false
      setErrorMessagePhone("")
    }
  }
  const addressCheck = ()=>{
    if(address.length < 10 || address.length > 100){
      eaddress = false
      setErrorMessageAddress("Address must be between 10 to 100")
    }
    else{
      eaddress = true
      setErrorMessageAddress("")
    }
  }
  const cityCheck = ()=>{
    if(shippingCity.length > 30 || shippingCity.length < 2){
      ecity = false
      setErrorMessageCity("City name must be between 2 to 30")
    }
    else{
      ecity = true
      setErrorMessageCity("")
    }
  }
  const zipCheck = ()=>{
    if(zipCode.length > 6 || zipCode.length < 4){
      ezip = false
      setErrorMessageZip("Zip Code must be between 4 to 6")
    }
    else{
      ezip = true
      setErrorMessageZip("")
    }
  }
    
    const formValidation = ()=>{
        if(shippingName ===''){
          ename = true
          setErrorMessageName("Name can not be empty")
        }
        else{
          nameCheck()
        }
        
      
        if(shippingEmail ===''){
          eemail = true
          setErrorMessageEmail("Email can not be empty")
        }
        else{
          emailCheck()
        }
          
        
        if(shippingPhone ===''){
          ephone = true
          setErrorMessagePhone("Phone can not be empty")
        }
        else{
          phoneCheck()
        }
        
        if(address ===''){
          eaddress =true
          setErrorMessageAddress("Address can not be empty")
        }
        else{
          addressCheck()
        }

        if(shippingCity ===''){
            ecity =true
            setErrorMessageCity("City can not be empty")
          }
          else{
            cityCheck()
          }

          if(zipCode ===''){
            ezip =true
            setErrorMessageZip("ZipCode can not be empty")
          }
          else{
            zipCheck()
          }
      }
    
    const errorContainer = ()=>{
      if(ename || eemail || ephone || eaddress || ecity || ezip)
        return true
      else
        return false
    }

    const updateAddress = async ()=>{
        formValidation()
        const shippingAddress = {
            ownerName: shippingName,
            address: address,
            city: shippingCity,
            zipCode: zipCode,
            phone:shippingPhone,
            shippingEmail: shippingEmail
        }
        if(!errorContainer()){
          console.log(shippingAddress);
          const update = await axios.put("http://localhost:8000/auth/shipping/" + user._id, {shippingAddress})
        if(update.status === 200){
            dispatch({ type: "UPDATE_ADDRESS", payload: shippingAddress });
            navigate('/payment')
        }
        else{
            setServerError("Something went wrong")
        }
    }       
}

    return (
    <div className='shipping_Container'>
            <NavLink  to="/"
                style={{ color: 'inherit',  textDecoration: 'inherit'}} className="amazon_logo">
                <img src={amazoneLogo} alt='amazon logo' />
            </NavLink>
            <div className="shipping_form">
			<h2>Shipping Address</h2>
			<div className="s_name">
				<label htmlFor="name">Name</label>
				<input type='text' id="name"
          onChange={(e)=>setShippingName(e.target.value)}
          onClick= {()=>setErrorMessageName('')}/>
				<span>{errorMessageName}</span>
			</div>
			<div className="s_address">
				<label htmlFor="address">Address</label>
				<input type='text' id="address"
          onChange={(e)=>setShippingAddress(e.target.value)}
          onClick= {()=>setErrorMessageAddress('')}/>
				<span>{errorMessageAddress}</span>
			</div>
            <div className="s_cityzip">
                <div className="s_city">
                <label htmlFor="cty">City</label>
                <input type='email' id="email"
                  onChange={(e)=>setShippingCity(e.target.value)}
                  onClick= {()=>setErrorMessageCity('')}/>
                </div>
                <div className="s_zipcode">
                <label htmlFor="zipcode">Zip Code</label>
                <input type='email' id="email" 
                  onChange={(e)=>setZipCode(e.target.value)}
                  onClick= {()=>setErrorMessageZip('')}/>
                </div>
            </div>
            <span>{errorMessageCity}</span>
            <span>{errorMessageZip}</span>
            <div className="s_phone">
            <label htmlFor="phone">Phone</label>
            <input type='text' id="phone"
              onChange={(e)=>setShippingPhone(e.target.value)}
              onClick= {()=>setErrorMessagePhone('')}/>
            <span>{errorMessagePhone}</span>
        </div>
            <div className="s_email">
            <label htmlFor="email">Email</label>
            <input type='email' id="email"
              onChange={(e)=>setShippingEmail(e.target.value)}
              onClick= {()=>setErrorMessageEmail('')}/>
            <span>{errorMessageEmail}</span>
            </div>
            <button className="submit_btn" onClick={updateAddress}>Submit</button>
            <span>{serverError}</span>
		</div>
        </div>
    )
}

export default ShippingAddress