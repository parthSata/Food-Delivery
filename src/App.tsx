import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext";
import {
  HomePage, Login, AdminLogin, Register, Verification, AdminNavigation,
  SellerNavigation,
  CustomerNavigation,
  NotAuthorized,
  ProtectedRoute,
  RestaurantTypes,
} from './Components/Config/index'


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
          {/* <Route path="/restaurantType" element={<RestaurantTypes />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute roles={["admin"]} element={<AdminNavigation />} />
            }
          />
          <Route
            path="/seller/*"
            element={
              <ProtectedRoute
                roles={["seller"]}
                element={<SellerNavigation />}
              />
            }
          />
          <Route
            path="/customer/*"
            element={
              <ProtectedRoute
                roles={["customer"]}
                element={<CustomerNavigation />}
              />
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
