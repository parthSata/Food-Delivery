import { Routes, Route } from 'react-router-dom';
import { CategoryPage, Dashboard, Products, ProductAdd, ProductView, Restaurant, AddRestaurants, TeamAdd, OurTeam } from '../Config/index';
import ProtectedRoute from '../ProtectedRoute';

const AdminNavigation = () => {
  console.log("Admin Component Rendered ....")
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute element={<CategoryPage />} roles={['admin']} />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} roles={['admin']} />} />
      <Route path="/products" element={<ProtectedRoute element={<Products />} roles={['admin']} />} />
      <Route path="/productView/:productId" element={<ProtectedRoute element={<ProductView />} roles={['admin']} />} />
      <Route path="/productsAdd" element={<ProtectedRoute element={<ProductAdd />} roles={['admin']} />} />
      <Route path="/restaurants" element={<ProtectedRoute element={<Restaurant />} roles={['admin']} />} />
      <Route path="/addrestaurants" element={<ProtectedRoute element={<AddRestaurants />} roles={['admin']} />} />
      <Route path="/team" element={<ProtectedRoute element={<OurTeam />} roles={['admin']} />} />
      <Route path="/teamAdd/:updateId" element={<ProtectedRoute element={<TeamAdd onClose={() => { }} isOpen={true} />} roles={['admin']} />} />
   
    </Routes>
  );
};

export default AdminNavigation;
