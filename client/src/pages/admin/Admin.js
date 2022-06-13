import './admin.css'
import { NavLink  } from "react-router-dom";
import amazoneLogo from './Amazon logo.png'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {storage} from './Firebase';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../context/shooping/Context';
import jwt_decode from "jwt-decode";

function Admin() {
	const {user, dispatch} = useContext(Context)
	const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
	const [productName, setProductName] = useState('')
	const [productPrice, setProductPrice] = useState(0)
	const [category, setCategory] = useState()
	const [errorMessageName, setErrorMessageName] = useState('')
    const [errorMessagePrice, setErrorMessagePrice] = useState('')
    const [errorMessageImage, setErrorMessageImage] = useState('')

    let ename, eprice, eimage = true

	const options = {
		position: "top-center",
	};

	const notify = () => toast.info("Uploading...", options);
	const notifySuccess = () => toast.success("Upload Successfull !", options);
	const notifyerror = () => toast.error("Something went wrong ?", options);

	const axiosJWT = axios.create()

	const refreshToken = async () => {
		try {
		  const res = await axios.post("http://localhost:8000/auth/refreshtoken", { refreshToken: user.refreshToken });
		  dispatch({ type: "UPDATE_TOKEN", payload: {
			accessToken: res.data.accessToken,
			refreshToken: res.data.refreshToken
		}});
		return res.data;
		} catch (err) {
		  console.log(err);
		}
	  };

	  axiosJWT.interceptors.request.use( async (config) => {
		  let currentDate = new Date();
		  const decodedToken = jwt_decode(user.accessToken);
		  if (decodedToken.exp * 1000 < currentDate.getTime()) {
			const data = await refreshToken();
			config.headers["authToken"] = "Bearer " + data.accessToken;
		  }
		  return config;
		},
		(error) => {
		  return Promise.reject(error);
		}
	  );


	     
  const nameCheck = ()=>{
	let spaceCheck = productName
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
      if(productName.length > 80){
        ename = true
        setErrorMessageName("Name must be less than 80 characters")
      }
      else{
        ename = false
        setErrorMessageName("")
      }
    }

  }
  const priceCheck = ()=>{
    if(productPrice < 1 || productPrice > 9999999){
      eprice = true
      setErrorMessagePrice("Price must be between 1 to 9999999")
    }
    else{
      eprice = false
      setErrorMessagePrice("")
    }
  }
    
    const formValidation = ()=>{
        if(productName ===''){
          ename = true
          setErrorMessageName("Name can not be empty")
        }
        else{
          nameCheck()
        }
        
        if(!selectedFile){
          eimage = true
          setErrorMessageImage("Image not selected or unsupported")
        }else{
			eimage = false
			setErrorMessageImage("")
		}
          
        if(productPrice === 0){
          eprice = true
          setErrorMessagePrice("Price can not be empty")
        }
        else{
          priceCheck()
        }
      }
    
    const errorContainer = ()=>{
      if(ename || eimage || eprice)
        return true
      else
        return false
    }

	useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

	const handleImageChange = (e)=>{
		if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
	}
	const submitProduct = ()=>{
		formValidation()
		if(!errorContainer()){
		notify()
		if(selectedFile == null) return
		const imageRef = ref(storage, `EShopImages/${selectedFile.name + v4()}`)
		uploadBytes(imageRef, selectedFile)
		.then(snapshot=>{
			getDownloadURL(snapshot.ref)
			.then(url=>{
				const productData = {
					name: productName,
					price: productPrice,
					category: category,
					images: url
				}
				axiosJWT.post('http://localhost:8000/product/singleproduct/' + user._id, productData,
				{
					headers: {
					  'authToken': `Bearer ${user.accessToken}`
					}
				}
				)
				.then(res=>{
					notifySuccess()
				})
				.catch(err=>{
					notifyerror()
				})
			})
			.catch(err=>{
				notifyerror()
			})
		})
		.catch(err=>{
			notifyerror()
		})
	}
}
	
    return (
        <div className='admin_Container'>
		<ToastContainer theme="colored"/>
            <NavLink  to="/"
                style={{ color: 'inherit',  textDecoration: 'inherit'}} className="amazon_logo">
                <img src={amazoneLogo} alt='amazon logo' />
            </NavLink>
            <div className="product_form">
			<h2>Product Form</h2>
			<div className="p_name">
				<label htmlFor="name">Name</label>
				<input type='text' id="name"
					onChange={(e)=>setProductName(e.target.value)}
					onClick= {()=>setErrorMessageName('')}
				/>
				<span>{errorMessageName}</span>
			</div>
			<div className="p_price">
				<label htmlFor="price">Price</label>
				<input type='number' id="price"
					onChange={(e)=>setProductPrice(e.target.value)}
					onClick= {()=>setErrorMessagePrice('')}
				/>
				<span>{errorMessagePrice}</span>
			</div>
			<div className="p_category">
				<label htmlFor="category">Category</label>
				<select onChange={(e)=>setCategory(e.target.value)}>
					<option value="Desktop">Desktop</option>
					<option value="Laptop">Laptop</option>
					<option value="Mobile">Mobile</option>
				</select>
			</div>
			<div className="p_image">
				<label>Choose Image</label>
				<input type='file' onChange={handleImageChange} onClick= {()=>setErrorMessageImage('')}/>
				<span>{errorMessageImage}</span>
			</div>
			<div className="image_container">
				{selectedFile &&  <img src={preview} alt='img' /> }
			</div>
			<button className="submit_btn" onClick={submitProduct}>Submit</button>
			<NavLink  to="/deleteprodduct" className="review_product_btn">
				<small>Review your product</small>
			</NavLink>
		</div>
		
        </div>
    )
}

export default Admin

