import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminNavigation from './Components/Authentication/AdminNavigation';
import SellerNavigation from './Components/Authentication/SellerNavigation';
import CustomerNavigation from './Components/Authentication/CustomerNavigation';
import Login from './Components/Login';
import AdminLogin from './Components/AdminLogin';
import Register from './Components/Register';
import Verification from './Components/Verification';
import NotAuthorized from './Components/NotAuthorized';
import { useAuth, AuthProvider } from './Components/AuthContext';
import ProtectedRoute from "./Components/ProtectedRoute";
import RestaurantTypes from "./Seller/RestaurantTypes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login/adminLogin" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="/restaurantType" element={<RestaurantTypes />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin/*" element={<AdminNavigation />} />
            <Route path="/seller/*" element={<SellerNavigation />} />
            <Route path="/customer/*" element={<CustomerNavigation />} />
            <Route path="/*" element={<RoleBasedNavigation />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

const RoleBasedNavigation = () => {
  const { user } = useAuth();

  if (!user) return <NotAuthorized />;

  switch (user.role) {
    case 'admin':
      return <AdminNavigation />;
    case 'seller':
      return <SellerNavigation />;
    case 'customer':
      return <CustomerNavigation />;
    default:
      return <NotAuthorized />;
  }
};

export default App;
