import { Route, Routes } from "react-router-dom";
import { HomePage, CheckoutPage, Category, usePreventBack, UserContainer } from "@/navigation";

const CustomerNavigation = () => {
  usePreventBack()
  return (
    <UserContainer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<Category />} />
        <Route path="checkOutPage" element={<CheckoutPage />} />
      </Routes>
    </UserContainer>
  );
};

export default CustomerNavigation;
