import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import ProtectedLayout from "../Dashboard/ProtectedLayout";
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
      <Route path="/" element={<ProtectedRoute roles={['admin']} element={<ProtectedLayout />} />}>
        <Route path="categoryPage" element={<CategoryPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="productView/:productId" element={<ProductView />} />
        <Route path="productsAdd" element={<ProductAdd />} />
        <Route path="restaurants" element={<Restaurant />} />
        <Route path="addrestaurants" element={<AddRestaurants />} />
        <Route path="team" element={<OurTeam />} />
        <Route path="teamAdd/:updateId" element={<TeamAdd onClose={() => { }} isOpen={true} />} />
      </Route>
    </Routes>
  );
};

export default AdminNavigation;
