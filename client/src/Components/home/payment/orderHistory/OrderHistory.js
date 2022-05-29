import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import {v4} from 'uuid'
import { Context } from '../../../../context/shooping/Context'
import './orderHistory.css'

function OrderHistory() {
  const[orderHistory, setOrderhistory] = useState([])
  const {user} = useContext(Context)

  useEffect(()=>{
    const fetchOrderHistory= async ()=>{
      const p = await axios.get("http://localhost:8000/order/getorders/" + user._id)
      setOrderhistory(p.data[0].orders)
    }
    fetchOrderHistory()
    
  },[user._id])

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
}

export default OrderHistory