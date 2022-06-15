import './reviewproduct.css'
import {FaStar} from 'react-icons/fa'
import {v4} from 'uuid'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../../context/shooping/Context'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import LoadingCircle from '../loading/LoadingCircle'

function ReviewProduct() {
    const [searchResult, setSearchResult] = useState()
    const {user} = useContext(Context)
    const [processing, setProcessing] = useState(true)


    useEffect(()=>{
        const adminProduct = async ()=>{
          try{
            const items = await axios.get('http://localhost:8000/product/adminproduct/'+user._id)
            setSearchResult(items.data)
            setProcessing(false)
          }catch(err){
            console.log(err);
          }
        }
        adminProduct()
      },[user._id])

  return (
    <div className="admin_item_wrapper">
    {
      !searchResult ?
      !processing? searchResult.map((result, index)=>{
          return <div key ={v4()} className="admin_item">
          <div className="admin_product_container">
            <div className="admin_product_image_container">
              <img src= {result.images} alt=''/>
            </div>
            <div className="admin_product_details_container">
              <div className='admin_product_name'>{result.name}</div>
              <h5 className="admin_product_price">${result.price}</h5>
              <div className="admin_product_rating">
                {
                  [...Array(5)].map((star, i)=>{
                    let ratingValue = i+1
                    return(
                        <FaStar
                          key={v4()}
                          className='admin_star_rating'
                          color={ratingValue <= result.rating.user_rating ? '#ffc107' : '#e4e5e9'}
                        />
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      })
      :
      <LoadingCircle loadingSize = 'vh'/>
      :
      <div className='empty_card'>
      <span> No Product</span>
      <NavLink to="/admin" style={{ color: 'inherit',  textDecoration: 'inherit'}}>
          <button className="shop_now">Submit</button>
      </NavLink> 
    </div>
    }
  </div>
  )
}

export default ReviewProduct