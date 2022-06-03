import "./payment.css"
import { NavLink } from "react-router-dom";
import { useStripe, useElements, CardElement} from "@stripe/react-stripe-js"
import { useContext, useState } from "react";
import { Context } from "../../../context/shooping/Context";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { BasketContext } from "../../../context/shooping/BasketContext";


function Payment() {
  let {user} = useContext(Context)
  const {basket, dispatchB} = useContext(BasketContext)
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)
  const [paySuccess, setPaySuccess] = useState(false)
  const [payFailed, setPayFailed] = useState(false)


  const totalPrice = ()=>{
    let totalSum = 0
    basket?.forEach(b => { totalSum = totalSum + (b.price * b.quantity)})
    return totalSum
  }
  
  const removeItemsfromCard = ()=>{
    try{
      basket.forEach( async (b)=>{
        await axios.put("http://localhost:8000/order/orders/"+ user._id, {
          orders:{
            name:b.name,
            price: b.price * b.quantity,
            quantity: b.quantity
          }
        })
        removeItemFromCart(b.id)
      })
    }catch(err){
      console.log(err);
    }
    
  }
  const removeItemFromCart = (id)=>{
    dispatchB({
        type: 'REMOVE_FROM_BASKET',
        id: id
    })
}


  const handlePayment = async () => {
    if (elements == null) {
      return;
    }
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if(!error){
      const {id} = paymentMethod
      setProcessing(true)
      try {
        const response = await axios({
          url: 'http://localhost:8000/auth/payment/' + user._id,
          method: 'post',
          data: {
            id,
            basket: basket,
            amount: totalPrice(),
          },
        });
        if(response.status === 200){
          setPaySuccess(true)
          removeItemsfromCard()
        }
      } catch (error) {
        setPayFailed(true)
        setProcessing(false)
      }
    }
  };

  if(basket?.length > 0 || payFailed || paySuccess)
  if(paySuccess)
    return (
      <div className='empty_card'>
      <span> Payment Successfull</span>
      <NavLink to="/" style={{ color: 'inherit',  textDecoration: 'inherit'}}>
          <button>Continue Shoping</button>
      </NavLink> 
    </div>
  )
  else if(payFailed)
  return(
    <div className='empty_card'>
      <span> Payment Failed</span>
      <NavLink to='/payment' style={{ color: 'inherit',  textDecoration: 'inherit'}}>
          <button onClick={()=>setPayFailed(false)}>Try Again</button>
      </NavLink> 
    </div>
  )
  else
  return(
    <div className="payment_container">
      <div className="payment_left">
      <div className="credit_card_container">
        <form>
          <CardElement/>
        </form>
      </div>
        <h2>Review Your Order</h2>
        <div className="user_address"></div>
        <div className="product_list">
          { basket && basket.map((b)=>{
            return  <div key={b.id} className="payment_order_list_container">
                <div className="payment_product_image">
                    <img src={b.image} alt="product"/>
                </div>
                <div className="payment_product_description">
                    <div className="payment_product_name">{b.name}
                    </div>
                    <div className="payment_product_price">${b.price}</div>
                </div>
            </div>
        })}
        </div>
      </div>
      <div className="payment_right">
        <div className="checkout_container">
        {
          processing?
          <div className="loading_circle">
            <div className="outer_circle">
              <div className="inner_circle"></div>
            </div>
          </div>
          :
          <button className="pay_button" onClick={handlePayment}>
            Place your order
          </button>
        }


          <div className="term_condition">
              <p>By placing your order ,you agree to Amazon's
              <a href="none">privacy notic</a> and <a href="none">condition of use.</a>
            </p>
            <p>You also agree to AmazonGlobal's <a href="none">terms and conditions</a>
            </p>
          </div>
          <div className="order_summary_container">
            <h4>Order Summary</h4>
          <h5>
            <span>Items</span>
            <span>$59.99</span>
          </h5>
          <h5>
            <span>Shipping and handling</span>
            <span>$28.99</span>
          </h5>					<h5>
            <span>Total before tax</span>
            <span>$88.99</span>
          </h5>					<h5>
            <span>Estimated tax to be collected</span>
            <span>$00.00</span>
          </h5>
          <div className="totol_order">
            <h3>Order total</h3>
            <h3>${totalPrice()}</h3>
          </div>
          </div>
          <div className="order_description">
            <p>
              You can track your shipment and view any application
              import fees deposite before placing your order.
              <a href='none'>Learn more</a>
            </p>
            <a href='none'>How are shipping consts calculated?</a>
            <a href='none'>Why didn't I qualify for the free shipping</a>
          </div>
        </div>
      </div>
    </div>
  )
  else
  return(
      <div className='empty_card'>
          <span> Your cart is empty</span>
          <NavLink to="/" style={{ color: 'inherit',  textDecoration: 'inherit'}}>
              <button>Shop Now</button>
          </NavLink> 
      </div>
  )
}

export default Payment