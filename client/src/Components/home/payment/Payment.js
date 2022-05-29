import "./payment.css"
import { NavLink } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';
import { useContext } from "react";
import { Context } from "../../../context/shooping/Context";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BasketContext } from "../../../context/shooping/BasketContext";


const PUBLIC_KEY="pk_test_51KyZM6IP0ODYVACVqmX4DX6hxiHc10xeSIZmu92WFOLgKe4cF526wX66uWgSQk3d6s2sNrsDxqilHQmKYnD19JGi00BzXEw8kg"


function Payment() {
  let {user} = useContext(Context)
  const {basket, dispatchB} = useContext(BasketContext)

  const options = {
		position: "top-center",
	};
	const notifyerror = () => toast.error("Payment could not be complete !", options);
	const notifySuccess = () => toast.success("Payment Successfull !", options);

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
  const payNow = async token => {
    try {
      const response = await axios({
        url: 'http://localhost:8000/auth/payment/' + user._id,
        method: 'post',
        data: {
          basket: basket,
          amount: totalPrice(),
          token,
        },
      });
      if(response.status === 200){
        notifySuccess()
        removeItemsfromCard()
      }
    } catch (error) {
      notifyerror()
    }
  };
 
  if(basket?.length > 0)
    return (
    <div className="payment_container">
    <ToastContainer theme="colored"/>
      <div className="payment_left">
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
            <StripeCheckout className="order_btn"
            stripeKey= {PUBLIC_KEY}
            label="Place your order"
            name="Pay With Credit Card"
            billingAddress
            shippingAddress
            amount={totalPrice() *  100}
            description={`Your total is $${totalPrice()}`}
            token={payNow}
          />
          <p>By placing your order ,you agree to Amazon's
            <a href="none">privacy notic</a> and <a href="none">condition of use.</a>
          </p>
          <p>You also agree to AmazonGlobal's <a href="none">terms and conditions</a>
          </p>
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
          <span> You did not shop previously</span>
          <NavLink to="/" style={{ color: 'inherit',  textDecoration: 'inherit'}}>
              <button>Shop Now</button>
          </NavLink>
          
      </div>
  )
}

export default Payment