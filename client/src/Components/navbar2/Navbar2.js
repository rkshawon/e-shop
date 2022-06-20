import './navbar2.css'
import {FiMenu} from 'react-icons/fi'

function Navbar2() {
  return (
    <div className='navbar2'>
        <ul className='ulContainer'>
            <FiMenu className='menuicon2'/>
            <li> All</li>
            <li>Today's Deals</li>
            <li>Service</li>
            <li>Registry</li>
            <li>Gift</li>
            <li>Sell</li>
        </ul>
        
    </div>
  )
}

export default Navbar2