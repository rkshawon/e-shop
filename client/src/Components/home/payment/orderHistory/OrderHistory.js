import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {v4} from 'uuid'
import { Context } from '../../../../context/shooping/Context'
import LoadingCircle from '../../loading/LoadingCircle'
import './orderHistory.css'

function OrderHistory() {
  const[orderHistory, setOrderhistory] = useState([])
  const {user} = useContext(Context)
  const [processing, setProcessing] = useState(true)

  useEffect(()=>{
    const fetchOrderHistory= async ()=>{
      const p = await axios.get("/order/getorders/" + user?._id)
      setOrderhistory(p.data[0].orders)
      setProcessing(false)
    }
    fetchOrderHistory()
    
  },[user?._id])

  if(!processing)
  if(user && orderHistory.length > 0)
  return (
    <div className="order_history_container">
      <h1>Your Orders</h1>
      <div className="order_history">
        <table className="order_table">
          <thead className="order_header">
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Payment</th>
          </tr>
          </thead>
          <tbody className="order_body">
          {
            orderHistory && orderHistory.map((o)=>{
              return <tr key={v4()}>
                <td>{o.name}</td>
                <td>{o.quantity}</td>
                <td>{o.price}</td>
                <td>processing</td>
                <td>paid</td>
              </tr>	
            })
          }
          </tbody>
        </table>
      </div>
    </div>
  )
  else
  return(
    <div className="empty_card">
      <span>Not orders yet</span>
        <NavLink to="/" style={{ color: 'inherit',  textDecoration: 'inherit'}}>
        <button className='shop_now'>Order Now</button>
    </NavLink>
    </div>
  )
  else{
    return <LoadingCircle/>
  }
}

export default OrderHistory