import { Route, Routes } from "react-router-dom";
import { Home, CheckoutPage, Category, UserContainer, UserProductView, RestaurantNearby, RestaurantView, Reviews, Overview, OrderOnline, Photos } from "@/Components/index";


const CustomerNavigation = () => {
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
        </Route>

      </Routes>
    </UserContainer>
  );
};

export default CustomerNavigation;
