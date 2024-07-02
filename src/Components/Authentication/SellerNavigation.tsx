import { Routes, Route } from "react-router-dom";
import {
  BusinessDetails,
  Dashboard,
  Orders,
  Products,
  ProductAdd,
  ProductView,
  Coupons,
  CouponAdd,
  CouponView,
  CategoryPage,
} from "../Config/index";

const SellerNavigation = () => {
  console.log("Seller Component Rendered ....");
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<CategoryPage />} />
      <Route path="/businessDetail" element={<BusinessDetails />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/products" element={<Products />} />
      <Route path="/productView/:productId" element={<ProductView />} />
      <Route path="/productsAdd" element={<ProductAdd />} />
      <Route path="/coupons" element={<Coupons />} />
      <Route
        path="/couponAdd"
        element={<CouponAdd onClose={() => { }} isOpen={true} />}
      />
      <Route path="/couponview/:couponId" element={<CouponView />} />
    </Routes>
  );
};

export default SellerNavigation;
