import { Route, Routes } from "react-router-dom";
import { Home, CheckoutPage, Category, UserContainer, UserProductView, RestaurantNearby } from "@/Components/index";

const CustomerNavigation = () => {
  return (
    <UserContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="checkOutPage" element={<CheckoutPage />} />
        <Route path="/userProductView" element={<UserProductView />} />
        <Route path="/restaurantNearBy" element={<RestaurantNearby />} />
      </Routes>
    </UserContainer>
  );
};

export default CustomerNavigation;
