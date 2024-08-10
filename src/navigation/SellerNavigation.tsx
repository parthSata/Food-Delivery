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
  CategoryProducts,
  CheckoutPage,
  Container
} from "@/Components/index";

const SellerNavigation = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<CategoryPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="businessDetail" element={<BusinessDetails />} />
        <Route path="category/:CategoryId" element={<CategoryProducts />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="productView/:productId" element={<ProductView />} />
        <Route path="productsAdd/:productId" element={<ProductAdd />} />
        <Route path="productsAdd/:updateId" element={<ProductAdd />} />
        <Route path="productsAdd" element={<ProductAdd />} />
        <Route path="coupons" element={<Coupons />} />
        <Route path="couponAdd" element={<CouponAdd onClose={() => { }} isOpen={true} />} />
        <Route
          path="/couponAdd/:updateId"
          element={
            <CouponAdd
              onClose={function (): void {
                throw new Error("Function not implemented.");
              }}
              isOpen={true}
            />
          }
        />
        <Route path="couponview" element={<CouponView />} />
        <Route path="couponview/:couponId" element={<CouponView />} />
        <Route path="create-checkout-session" element={<CheckoutPage />} />

      </Routes>
    </Container>
  );
};

export default SellerNavigation;
