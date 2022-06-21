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
import { useState } from "react";
import { useEffect } from "react";
const stripePromise = loadStripe("pk_test_51KyZM6IP0ODYVACVqmX4DX6hxiHc10xeSIZmu92WFOLgKe4cF526wX66uWgSQk3d6s2sNrsDxqilHQmKYnD19JGi00BzXEw8kg")

function App() {
  const [scrTop, setScrTop] = useState()
  const [scrController, setScrController] = useState()

  function scroll(scrl) {
    setScrTop(scrl)
  }
  function scrollController(scrcontroller) {
    setScrController(scrcontroller)
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/"
      element={[<Navbar scroll={scroll}
        scrollController= {scrollController}/>
        ,<Navbar2/>,<Home />,
        <Footer scrTop={scrTop}/>]}
      />
      <Route path="/search"
        element={[<Navbar scroll={scroll} scrollController= {scrollController}/>,
        <Navbar2/>,<Search/>,
        <Footer scrTop={scrTop}/>]}
      />
      <Route path="/deleteprodduct"
        element={[<Navbar scroll={scroll} scrollController= {scrollController}/>,
        <Navbar2/>,<ReviewProduct/>,
        <Footer scrTop={scrTop}/>]}
       />
      <Route path="/payment"
        element={[
          <Navbar scroll={scroll}/>,<Navbar2/>,
            <Elements stripe={stripePromise}>
              <Payment/>
            </Elements>,
          <Footer scrTop={scrTop}/>
        ]} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/shipping" element={<ShippingAddress/>} />
      <Route path="/cart"
        element={[<Navbar scroll={scroll} scrollController= {scrollController}/>,
        <Navbar2/>,<Cart/>,
        <Footer scrTop={scrTop}/>]}
      />
      <Route path="/orderhistory"
        element={[<Navbar scroll={scroll} scrollController= {scrollController}/>,
        <Navbar2/>,<OrderHistory/>]}
      />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
