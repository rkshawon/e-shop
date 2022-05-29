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

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={[<Navbar/>,<Navbar2/>,<Home />, <Footer/>]} />
      <Route path="/search" element={[<Navbar/>,<Navbar2/>,<Search/>, <Footer/>]} />
      <Route path="/payment" element={[<Navbar/>,<Navbar2/>,<Payment/>, <Footer/>]} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/cart" element={[<Navbar/>,<Navbar2/>,<Cart/>, <Footer/>]} />
      <Route path="/orderhistory" element={[<Navbar/>,<Navbar2/>,<OrderHistory/>, <Footer/>]} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
