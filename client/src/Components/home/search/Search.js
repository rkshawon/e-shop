import './search.css'
import axios from 'axios'
import {FaStar} from 'react-icons/fa'
import {useContext, useEffect, useState} from 'react'
import {v4} from 'uuid'
import Modal from '../modal/Modal'
import { useSearchParams } from "react-router-dom";
import { BasketContext } from '../../../context/shooping/BasketContext'
import LoadingCircle from '../loading/LoadingCircle'
import { Context } from '../../../context/shooping/Context'


function Search() {
    const [searchResult, setSearchResult] = useState()
    const {basket, dispatchB} = useContext(BasketContext)
    const [openModal, setOpenModal] = useState(false)
    const [processing, setProcessing] = useState(true)
    const [product, setProduct] = useState()
    const {user} = useContext(Context)
    const [searchParams] = useSearchParams({});
  
    const addToCard = (id, name, price, image)=>{
      let repeatecheck = true
      repeatecheck = basket.every( b => {
        if(b.id === id){
          return false
        }else{
          return true
        }
      })
      repeatecheck === true && dispatchB({
        type: "ADD_TO_CARD",
        item:{
          id:id,
          name:name,
          price:price,
          image: image,
          quantity: 1
        }
      })
    }
  
    useEffect(()=>{
      const searchProduct = async ()=>{
        try{
          const items = searchParams &&  await axios.get('/product/searchproduct?'+searchParams)
          setProcessing(false)
          setSearchResult(items.data)
        }catch(err){
          console.log(err);
        }

      }
      searchProduct()
    },[searchParams, openModal])
    return (
        <div className="search_container">
        {
          openModal && <Modal 
          open = {openModal}
          close = {()=>setOpenModal(false)}
          productid = {product._id}
          userid = {user?._id}/>
        }
        { !processing?
          searchResult.length>0 ?
          <div className='search_result_item_container'>
          <h1 className='search_result_title'>RESULTS:</h1>
          <div className="search_item_wrapper">
         
            {searchResult.map((result, index)=>{
                return <div key ={v4()} className="search_item">
                <div className="search_product_container">
                  <div className="search_product_image_container">
                    <img src= {result.images} alt=''/>
                  </div>
                  <div className="search_product_details_container">
                    <div className='search_product_name'>{result.name}</div>
                    <h5 className="search_product_price">${result.price}</h5>
                    <div className="search_product_rating">
                      {
                        [...Array(5)].map((star, i)=>{
                          let ratingValue = i+1
                          return(
                              <FaStar
                                key={v4()}
                                className='search_star_rating'
                                color={ratingValue <= result.rating.user_rating ? '#ffc107' : '#e4e5e9'}
                                onClick={()=>{ setProduct(result);setOpenModal(true);}}
                              />
                          )
                        })
                      }
                    </div>
                    <button className="search_addto_card"
                      onClick={()=>{addToCard(result._id, result.name, result.price,  result.images)}}>
                      Add to Card
                    </button>
                  </div>
                </div>
              </div>
            })
          }
          </div>
        </div>
            :
            <h2 className='empty_card'>No Product found</h2>
            :
            <LoadingCircle/>
          }
        </div>
    )
}

export default Search