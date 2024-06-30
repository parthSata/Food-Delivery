import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminNavigation from "./Components/Authentication/AdminNavigation";
import SellerNavigation from "./Components/Authentication/SellerNavigation";
import CustomerNavigation from "./Components/Authentication/CustomerNavigation";
import Login from "./Components/Login";
import AdminLogin from "./Components/AdminLogin";
import Register from "./Components/Register";
import Verification from "./Components/Verification";
import NotAuthorized from "./Components/NotAuthorized";
import { AuthProvider } from "./Components/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Payment from "./Components/Payment/Payment";

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
          <Route path="/payment" element={<Payment />} />
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
