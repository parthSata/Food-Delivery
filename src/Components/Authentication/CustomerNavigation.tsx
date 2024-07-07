import { Route, Routes } from "react-router-dom";
import { HomePage, Category, Container } from "../../User/Config/Index";
import CheckoutPage from "../../Seller/CheckOutPage";

const CustomerNavigation = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<Category />} />
        <Route path="checkOutPage" element={<CheckoutPage />} />
      </Routes>
    </Container>
  );
};

export default CustomerNavigation;
