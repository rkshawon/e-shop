import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Footer from "./Components/footer/Footer";
import Navbar from './Components/header/Navbar';
import Cart from "./Components/home/cart/Cart";
import Home from './Components/home/Home';
import OrderHistory from "./Components/home/payment/orderHistory/OrderHistory";
import Payment from "./Components/home/payment/Payment";
import Search from "./Components/home/search/Search";
import Navbar2 from './Components/navbar2/Navbar2';
import Admin from "./pages/admin/Admin";
import Login from './pages/login/Login';
import Register from "./pages/register/Register";
import { Elements} from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js'
import ShippingAddress from "./Components/home/payment/address/ShippingAddress";
import ReviewProduct from "./Components/home/reviewproduct/ReviewProduct";
const stripePromise = loadStripe("pk_test_51KyZM6IP0ODYVACVqmX4DX6hxiHc10xeSIZmu92WFOLgKe4cF526wX66uWgSQk3d6s2sNrsDxqilHQmKYnD19JGi00BzXEw8kg")

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={[<Navbar/>,<Navbar2/>,<Home />, <Footer/>]} />
      <Route path="/search" element={[<Navbar/>,<Navbar2/>,<Search/>, <Footer/>]} />
      <Route path="/deleteprodduct" element={[<Navbar/>,<Navbar2/>,<ReviewProduct/>, <Footer/>]} />
      <Route path="/payment"
        element={[
          <Navbar/>,<Navbar2/>,
            <Elements stripe={stripePromise}>
              <Payment/>
            </Elements>,
          <Footer/>
        ]} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/shipping" element={<ShippingAddress/>} />
      <Route path="/cart" element={[<Navbar/>,<Navbar2/>,<Cart/>, <Footer/>]} />
      <Route path="/orderhistory" element={[<Navbar/>,<Navbar2/>,<OrderHistory/>]} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
