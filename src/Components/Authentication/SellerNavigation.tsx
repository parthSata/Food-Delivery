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
import Container from "../Container";
import CheckoutForm from "../../Seller/CheckOutPage";

const SellerNavigation = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<CategoryPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="businessDetail" element={<BusinessDetails />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="productView/:productId" element={<ProductView />} />
        <Route path="productsAdd" element={<ProductAdd />} />
        <Route path="coupons" element={<Coupons />} />
        <Route path="couponAdd" element={<CouponAdd onClose={() => { }} isOpen={true} />} />
        <Route path="couponview/:couponId" element={<CouponView />} />
        <Route path="create-checkout-session" element={<CheckoutForm />} />
      </Routes>
    </Container>
  );
};

export default SellerNavigation;
