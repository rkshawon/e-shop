import './modal.css'
import ReactDOM from 'react-dom'
import {FaStar} from 'react-icons/fa'
import { v4 } from 'uuid'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Modal({open, close, productid, userid}) {
    const [rating, setRating] = useState(0)
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
                <button className='close_btn' onClick={close}>X</button>
                {
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
                            className='star'
                            color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                            size={30}
                            /> 
                            </label>
                        )
                    }) 
                }
                </div>
                <button className='submit_rating_btn' onClick={sendRating}>Submit</button>
            </div>:
            <div>Rate Successffull</div>:
            <div>Not Allowed</div>
        }
        </div>
            
    </div>,
        document.getElementById('portal')
    )  
}

export default Modal
