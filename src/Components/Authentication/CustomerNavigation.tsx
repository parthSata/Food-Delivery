// CustomerNavigation.js
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { HomePage } from "../../User/Config/Index";

const CustomerNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute roles={['customer']} element={<HomePage />} />} />
      </Routes>
  );
};

export default CustomerNavigation;
