import './items.css'
import axios from 'axios'
import {FaStar} from 'react-icons/fa'
import {useContext, useEffect, useRef, useState} from 'react'
import {v4} from 'uuid'
import Modal from '../modal/Modal'
import { BasketContext } from '../../../context/shooping/BasketContext'
import { Context } from '../../../context/shooping/Context'


function Items({scroll}) {
  const [products, setProducts] = useState()
  const {basket, dispatchB} = useContext(BasketContext)
  const [openModal, setOpenModal] = useState(false)
  const [product, setProduct] = useState()
  const {user} = useContext(Context)
  const scrlRef = useRef()

  const addToCard = (id, name, price, image)=>{
    let repeatecheck = true
    repeatecheck = basket?.every( b => {
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
    const fetchProduct = async ()=>{
      try{
        const items = await axios.get('http://localhost:8000/product/allproduct')
        //console.log(items.data);
        setProducts(items.data)
      }catch(err){
        
      }
    }
    fetchProduct()
    scroll(scrlRef)
  },[])

  return (
      <div className="ItemContainer1" ref={scrlRef}>
      {
        openModal && <Modal 
        open = {openModal}
        close = {()=>setOpenModal(false)}
        productid = {product._id}
        userid = {user._id}/>
      }
        <div className="itemWrapper">
        <h2>Popular Smart Phones</h2>
        {
          products && products.map((product, index)=>{
            if(product.category === 'Mobile')
              return <div key ={v4()} className="item">
              <div className="product_container">
                <div className="product_image_container">
                  <img src= {product.images} alt=''/>
                </div>
                <div className="product_details_container">
                  <div className='product_name'>{product.name}</div>
                  <h5 className="product_price">${product.price}</h5>
                  <div className="product_rating">
                    {
                      [...Array(5)].map((star, i)=>{
                        let ratingValue = i+1
                        return(
                            <FaStar
                              key={v4()}
                              className='star_rating'
                              color={ratingValue <= product.rating.user_rating ? '#ffc107' : '#e4e5e9'}
                              onClick={()=>{ setProduct(product);setOpenModal(true);}}
                            />
                        )
                      })
                    }
                  </div>
                  <button className="addto_card"
                    onClick={()=>{addToCard(product._id, product.name, product.price, product.images)}}>
                    Add to Card
                  </button>
                </div>
              </div>
            </div>
            else
              return undefined
          })
        }
        </div>
      </div>
  )
}

export default Items