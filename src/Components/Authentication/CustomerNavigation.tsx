import { Route, Routes } from "react-router-dom";
import { HomePage, Category, Container } from "../../User/Config/Index";

const CustomerNavigation = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </Container>
  );
};

export default CustomerNavigation;
