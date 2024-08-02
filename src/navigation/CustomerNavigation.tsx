import { Route, Routes } from "react-router-dom";
import { HomePage, CheckoutPage, Category, UserContainer, UserProductView } from "@/navigation";

const CustomerNavigation = () => {
  return (
    <UserContainer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<Category />} />
        <Route path="checkOutPage" element={<CheckoutPage />} />
        <Route path="/userProductView" element={<UserProductView />} />
      </Routes>
    </UserContainer>
  );
};

export default CustomerNavigation;
