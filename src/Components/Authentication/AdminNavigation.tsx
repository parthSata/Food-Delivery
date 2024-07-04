import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import {
  CategoryPage,
  Dashboard,
  Products,
  ProductAdd,
  ProductView,
  Restaurant,
  AddRestaurants,
  TeamAdd,
  OurTeam,
} from "../Config/index";

const AdminNavigation = () => {
  return (
    <Routes>
      <Route path="categoryPage" element={<ProtectedRoute roles={['admin']} element={<CategoryPage />} />} />
      <Route path="dashboard" element={<ProtectedRoute roles={['admin']} element={<Dashboard/>} />} />
      <Route path="products" element={<ProtectedRoute roles={['admin']} element={<Products/>} />} />
      <Route path="productView/:productId" element={<ProtectedRoute roles={['admin']} element={<ProductView/>} />} />
      <Route path="productsAdd" element={<ProtectedRoute roles={['admin']} element={<ProductAdd/>} />} />
      <Route path="restaurants" element={<ProtectedRoute roles={['admin']} element={<Restaurant/>} />} />
      <Route path="addrestaurants" element={<ProtectedRoute roles={['admin']} element={<AddRestaurants/>} />} />
      <Route path="team" element={<ProtectedRoute roles={['admin']} element={<OurTeam/>} />} />
      <Route path="teamAdd/:updateId" element={<ProtectedRoute roles={['admin']} element={<TeamAdd onClose={() => { }} isOpen={true} />} />} />
    </Routes>
  );
};

export default AdminNavigation;
