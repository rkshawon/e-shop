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

function Admin() {
	const {user} = useContext(Context)
	const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
	const [productName, setProductName] = useState()
	const [productPrice, setProductPrice] = useState()
	const [category, setCategory] = useState()
	const options = {
		position: "top-center",
	};

	const notify = () => toast.info("Uploading...", options);
	const notifySuccess = () => toast.success("Upload Successfull !", options);
	const notifyerror = () => toast.error("Something went wrong ?", options);


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
				axios.post('http://localhost:8000/product/singleproduct/'+user._id, productData,
				// {
				// 	headers: {
				// 	  'authToken': `Bearer ${user.accessToken}`
				// 	}
				// }
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
				<input type='text' id="name" onChange={(e)=>setProductName(e.target.value)}/>
				<span>Can not be empty</span>
			</div>
			<div className="p_price">
				<label htmlFor="price">Price</label>
				<input type='number' id="price" onChange={(e)=>setProductPrice(e.target.value)}/>
				<span>Can not be empty</span>
			</div>
			<div className="p_category">
				<label htmlFor="category">Category</label>
				<select onChange={(e)=>setCategory(e.target.value)}>
					<option value="Desktop">Desktop</option>
					<option value="Laptop">Laptop</option>
					<option value="Mobile">Mobile</option>
				</select>
				<span>Can not be empty</span>
			</div>
			<div className="p_image">
				<label>Choose Image</label>
				<input type='file' onChange={handleImageChange} />
				<span>Can not be empty</span>
			</div>
			<div className="image_container">
				{selectedFile &&  <img src={preview} alt='img' /> }
			</div>
			<button className="submit_btn" onClick={submitProduct}>Submit</button>
		</div>
        </div>
    )
}

export default Admin

