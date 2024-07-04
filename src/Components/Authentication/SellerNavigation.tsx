import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
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
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute roles={['seller']} element={<CategoryPage />} />} />
      <Route path="dashboard" element={<ProtectedRoute roles={['seller']} element={<Dashboard />} />} />
      <Route path="businessDetail" element={<ProtectedRoute roles={['seller']} element={<BusinessDetails />} />} />
      <Route path="orders" element={<ProtectedRoute roles={['seller']} element={<Orders />} />} />
      <Route path="products" element={<ProtectedRoute roles={['seller']} element={<Products />} />} />
      <Route path="productView/:productId" element={<ProtectedRoute roles={['seller']} element={<ProductView />} />} />
      <Route path="productsAdd" element={<ProtectedRoute roles={['seller']} element={<ProductAdd />} />} />
      <Route path="coupons" element={<ProtectedRoute roles={['seller']} element={<Coupons />} />} />
      <Route path="couponAdd" element={<ProtectedRoute roles={['seller']} element={<CouponAdd onClose={() => {}} isOpen={true} />} />} />
      <Route path="couponview/:couponId" element={<ProtectedRoute roles={['seller']} element={<CouponView />} />} />
    </Routes>
  );
};

export default SellerNavigation;
