import { Route, Routes } from "react-router-dom";
import { Home, CheckoutPage, Category, UserContainer, UserProductView, RestaurantNearby, RestaurantView, Reviews, Overview } from "@/Components/index";

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
        </Route>

      </Routes>
    </UserContainer>
  );
};

export default CustomerNavigation;
