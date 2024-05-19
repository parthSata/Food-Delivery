import "./App.css";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Verification from "./Components/Verification";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Table from "./Components/Table";
import Dashboard from "./Components/Dashboard/Dashboard";
import Orders from "./Components/Orders/Orders";
import Products from "./Components/Products";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
