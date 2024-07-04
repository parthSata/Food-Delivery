import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import ProtectedLayout from "../Dashboard/ProtectedLayout";
import { HomePage } from "../../User/Config/Index";

const CustomerNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute roles={['customer']} element={<ProtectedLayout />} />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default CustomerNavigation;
