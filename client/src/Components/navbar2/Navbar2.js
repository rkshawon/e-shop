import './navbar2.css'
import {FiMenu} from 'react-icons/fi'

function Navbar2() {
  return (
    <div className='navbar2'>
      
        <ul className='ulContainer'>
            <li><FiMenu className='menuicon2'/> All</li>
            <li>Today's Deals</li>
            <li>Customer Service</li>
            <li>Registry</li>
            <li>Gift Card</li>
            <li>Sell</li>
        </ul>
        
    </div>
  )
}

export default Navbar2