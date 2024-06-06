import "./App.css";
import Login from "./Components/Login";
import Home from "./Components/Category/Home";
import Verification from "./Components/Verification";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard/Dashboard";
import Orders from "./Components/Orders/Orders";
import Products from "./Components/Products/Products";
import ProductAdd from "./Components/Products/ProductAdd";
import Category from "./Components/Category/Category";
import ProductView from "./Components/Products/ProductView";
import Coupons from "./Components/Coupons/Coupons";
import CouponAdd from './Components/Coupons/CouponAdd'
import CouponView from "./Components/Coupons/CouponView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/couponview" element={<CouponView />} />
        <Route path="/couponview/:couponId" element={<CouponView />} />
        <Route path="/productView" element={<ProductView />} />
        <Route path="/productView/:productId" element={<ProductView />} />
        <Route path="/productsAdd" element={<ProductAdd />} />
        <Route path="/productsAdd/:updateId" element={<ProductAdd />} />
        <Route path="/productsAdd/:CategoryId" element={<ProductAdd />} />
        <Route path="/category/:CategoryId" element={<Category />} />
        <Route path="/couponAdd" element={<CouponAdd onClose={function (): void {
          throw new Error("Function not implemented.");
        }} isOpen={false} />} />
        <Route path="/couponAdd/:updateId" element={<CouponAdd onClose={function (): void {
          throw new Error("Function not implemented.");
        }} isOpen={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
