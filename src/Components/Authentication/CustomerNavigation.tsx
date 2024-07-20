import { Route, Routes } from "react-router-dom";
import { HomePage, CheckoutPage } from '../Config/index'
import { Category, Container } from "../../User/Config/Index";

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
