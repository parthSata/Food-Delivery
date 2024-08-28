import { Route, Routes, useNavigate } from "react-router-dom";
import { Home, CheckoutPage, Category, UserContainer, UserProductView, RestaurantNearby, RestaurantView, Reviews, Overview, OrderOnline, Photos, ImagePreview, Orders, OrderView } from "@/Components/index";
import { useAuth } from "@/context/AuthContext"

const CustomerNavigation = () => {
  const { user } = useAuth()
  const navigate = useNavigate();

  const handleNavigation = (path: any) => {
    if (user?.role === 'admin') {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };

  return (
    <UserContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="checkOutPage" element={<CheckoutPage />} />
        <Route path="/userProductView" element={<UserProductView />} />
        <Route path="/restaurantNearBy" element={<RestaurantNearby />} />
        <Route path="/restaurantView" element={<RestaurantView />}>
          <Route path="overView" element={<Overview />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="orderOnline" element={<OrderOnline />} />
          <Route path="photos" element={<Photos />} />
          <Route path="image" element={<ImagePreview onClose={() => handleNavigation('/restaurantView/photos')} isOpen={true} images={[]} currentImageIndex={0} onPrevImage={() => { }} onNextImage={() => { }} />} />
        </Route>
        <Route path="orders" element={<Orders />} />
        <Route path="orderView" element={<OrderView />} />
      </Routes>
    </UserContainer>
  );
};

export default CustomerNavigation;
