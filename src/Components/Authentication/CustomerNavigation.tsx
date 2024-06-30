import { Routes, Route } from "react-router-dom";
import { HomePage } from "../../User/Config/Index";

const CustomerNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default CustomerNavigation;
