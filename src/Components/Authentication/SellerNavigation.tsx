import { Routes, Route } from 'react-router-dom';
import { BusinessDetails, Dashboard, Orders, Products, ProductAdd, ProductView, Coupons, CouponAdd, CouponView } from '../Config/index';
import ProtectedRoute from '../ProtectedRoute';

const SellerNavigation = () => {
    return (
        <Routes>
            <Route path="/businessDetail" element={<ProtectedRoute element={<BusinessDetails />} roles={['seller']} />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} roles={['seller']} />} />
            <Route path="/orders" element={<ProtectedRoute element={<Orders />} roles={['seller']} />} />
            <Route path="/products" element={<ProtectedRoute element={<Products />} roles={['seller']} />} />
            <Route path="/productView/:productId" element={<ProtectedRoute element={<ProductView />} roles={['seller']} />} />
            <Route path="/productsAdd" element={<ProtectedRoute element={<ProductAdd />} roles={['seller']} />} />
            <Route path="/coupons" element={<ProtectedRoute element={<Coupons />} roles={['seller']} />} />
            <Route path="/couponAdd" element={<ProtectedRoute element={<CouponAdd onClose={() => {}} isOpen={true} />} roles={['seller']} />} />
            <Route path="/couponview/:couponId" element={<ProtectedRoute element={<CouponView />} roles={['seller']} />} />
        </Routes>
    );
};

export default SellerNavigation;
