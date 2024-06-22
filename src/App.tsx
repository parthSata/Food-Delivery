import "./App.css";
import { AddRestaurants, Category, CouponAdd, CouponView, Coupons, Dashboard, Gallary, Orders, OurTeam, ProductAdd, ProductView, Products, Register, Restaurant, TeamAdd, CategoryPage, Verification, Login, AdminLogin } from './Components/Config/index'
import { HomePage } from './User/Config/Index'
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* Admin */}
      <Routes>
        <Route path="/" element={<CategoryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/adminLogin" element={<AdminLogin />} />
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
        <Route path="/restaurants" element={<Restaurant />} />
        <Route path="/addrestaurants" element={<AddRestaurants />} />
        <Route path="/addrestaurants/:updateId" element={<AddRestaurants />} />
        <Route path="/team" element={<OurTeam />} />
        <Route path="/teamAdd/:updateId" element={<TeamAdd onClose={function (): void {
          throw new Error("Function not implemented.");
        }} isOpen={true} />} />
        <Route path="/teamAdd" element={<TeamAdd onClose={function (): void {
          throw new Error("Function not implemented.");
        }} isOpen={true} />} />


        {/* @ts-ignore */}
        <Route path="/gallary" element={<Gallary onClose={function (): void {
          throw new Error("Function not implemented.");
        }} isOpen={true} />} />
        <Route path="/couponAdd" element={<CouponAdd onClose={function (): void {
          throw new Error("Function not implemented.");
        }} isOpen={true} />} />
        <Route path="/couponAdd/:updateId" element={<CouponAdd onClose={function (): void {
          throw new Error("Function not implemented.");
        }} isOpen={true} />} />






        {/* User Side Routes */}
        <Route path="/homepage" element={<HomePage />} />



      </Routes>
    </BrowserRouter >
  );
}

export default App;
