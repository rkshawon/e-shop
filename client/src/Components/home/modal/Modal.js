import './modal.css'
import ReactDOM from 'react-dom'
import {FaStar} from 'react-icons/fa'
import { v4 } from 'uuid'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {ImCross} from 'react-icons/im'
import { NavLink } from 'react-router-dom'

function Modal({open, close, productid, userid}) {
    const [rating, setRating] = useState(0)
    const [hoverOverRating, setHoveroverRating] = useState(null)
    const [allowtoRate, setAllowtoRate] = useState(true)
    const [product, setProduct] = useState()
    const [rateSuccess, setRateSuccess] = useState(false)

    useEffect(()=>{
        const fetchProduct = async ()=>{
            try{
                const items = await axios.get('http://localhost:8000/product/getsingleproduct/' + productid)
                checkUser(items.data)
                setProduct(items.data)
            }catch(err){
                console.log(err);
            }
        }
        fetchProduct()
          
        const checkUser = ((prdt)=>{
            prdt.user_id.forEach((id)=>{
                if(userid === id)
                    setAllowtoRate(false)
                    return
            })
        })
        
    },[])

    const sendRating = async ()=>{
        const ratings = {
            rating:{
                user_rating: Math.floor((product.rating.total_rating + rating) / (product.rating.total_user + 1)),
                total_rating: product.rating.total_rating + rating,
                total_user: product.rating.total_user + 1,
            }
        }
        try{
            await axios.put('http://localhost:8000/product/updaterating/'+product._id, ratings)
            await axios.put('http://localhost:8000/product/pushidinrating/'+product._id, {userid: userid})
            setRateSuccess(true)
        }catch(err){
            console.log(err);
        }
        
    }

    if(!open) return null
    return ReactDOM.createPortal(
        <div className='modal_container'>
            <div className="modal">
                <button className='close_btn' onClick={close}><ImCross/></button>
                {
                userid?
                allowtoRate === true ?
                rateSuccess === false?
                <div className="submit_rating">
                    <div className="rating_title">
                        <h3>Rate this Product</h3>
                        <h5>This product was rated by {product?.rating?.total_user} users</h5>
                    </div>
                <div className="stars">
                {
                    [...Array(5)].map((star, i)=>{
                        let ratingValue = i+1
                        return(
                            <label key={v4()}>
                            <input type='radio' value={ratingValue} onClick={()=>setRating(ratingValue)} />
                            <FaStar
                            onMouseEnter={()=>setHoveroverRating(ratingValue)}
                            onMouseLeave={()=>setHoveroverRating(null)}
                            className='star'
                            color={ratingValue <= (hoverOverRating || rating) ? '#ffc107' : '#e4e5e9'}
                            size={30}
                            /> 
                            </label>
                        )
                    }) 
                }
                </div>
                <button className='submit_rating_btn' onClick={sendRating}>Submit</button>
            </div>:
            <div className = 'already_rated' >Rate Successful</div>
            :
            <div className='already_rated'><span>You already rated</span> </div>
            :
            <NavLink to="/login" style={{ color: 'inherit',  textDecoration: 'inherit'}}>
                <button className='submit_rating_btn already_rated' onClick={sendRating}>Sing in</button>
            </NavLink>
            
        }
        </div>
            
    </div>,
        document.getElementById('portal')
    )  
}

export default Modal
