import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../User/Config/Index";
import Container from "../../User/Components/Container";

const CustomerNavigation = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Container>
  );
};

export default CustomerNavigation;
