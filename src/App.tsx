import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import {
  Login,
  AdminLogin,
  Register,
  AdminNavigation,
  SellerNavigation,
  CustomerNavigation,
  NotAuthorized,
  ProtectedRoute,
  HomePage,
} from "./navigation/index";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login/adminLogin" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/verification" element={<Verification />} /> */}
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="/home" element={<HomePage />} />
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
          <Route path="*" element={<NotAuthorized />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
