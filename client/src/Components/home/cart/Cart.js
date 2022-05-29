import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { BasketContext } from '../../../context/shooping/BasketContext'
import './cart.css'

function Cart() {
    const {basket, dispatchB} = useContext(BasketContext)
    const totalPrice = ()=>{
        let totalSum = 0
        basket.forEach(b => { totalSum = totalSum + b.price * b.quantity})
        return totalSum
    }
    const changeQuantity = (val, id)=>{
        if(val === "minus"){
            dispatchB({
                type: 'CHANGE_PRODUCT_QUANTITY',
                id: id,
                quantityType: val
            }) 
        }
            
        if(val === "plus"){
            dispatchB({
                type: 'CHANGE_PRODUCT_QUANTITY',
                id: id,
                quantityType: val
            })
        }      
    }

    const removeItemFromCart = (id)=>{
        dispatchB({
            type: 'REMOVE_FROM_BASKET',
            id: id
        })
    }

      if(basket?.length > 0)
      return (
        <div className='cart_container'>
        <div className="card_page_container">
        <div className="card_page_left">
            <h2>Shopping Cart</h2>
            {
                basket && basket.map((b)=>{
                    return  <div key={b.id} className="order_list_container">
                        <div className="card_image">
                            <img src= {b.image} alt=''/>
                        </div>
                        <div className="card_description">
                            <div className="product_name">{b.name}
                            </div>
                            <div className="product_price">${b.price}</div>
                            <div className="product_rating">5start</div>
                            <div className="quantity_container">
                                <button className="decrease"
                                    onClick={()=>changeQuantity("minus", b.id)}>
                                    -
                                </button>
                                <span className="quantity">{b.quantity}</span>
                                <button className="increase"
                                    onClick={()=>changeQuantity("plus", b.id)}>
                                    +
                                </button>
                            </div>
                            <button className="remove_from_card_btn" onClick={()=>removeItemFromCart(b.id)}>Remove from Basket</button>
                        </div>
                    </div>
                })
            }
    
            </div>
                <div className="card_page_right">
                    <div className="total_amount">{`Subtotal (${basket.length} items)`}: ${totalPrice()}</div>
                    <div className="check_box">
                        <input type="checkbox"/>
                        <p>This order contains a gift</p>
                    </div> 
                    <NavLink to='/payment' className="checkout_button"> <button >Proceed to checkout</button></NavLink>
                </div>
            </div>
        </div>
      )
      else
        return(
            <div className='empty_card'>
                <span> Card is empty</span>
                <NavLink to="/" style={{ color: 'inherit',  textDecoration: 'inherit'}}>
                    <button>Shop Now</button>
                </NavLink>
                
            </div>
        )
  }

export default Cart