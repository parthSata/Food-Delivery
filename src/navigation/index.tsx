import Login from "../Components/Login";
import CategoryPage from "../Components/Category/CategoryPage";
import Verification from "../Components/Verification";
import Register from "../Components/Register";
import Dashboard from "../Components/Dashboard/Dashboard";
import Orders from "../pages/seller/Order/Orders";
import Products from "@/Components/Products/AllProducts";
import ProductAdd from "@/Components/Products/ProductAdd";
import Category from "@/pages/user/category/Category";
import ProductView from "../Components/Products/ProductView";
import Coupons from "../pages/seller/coupon/Coupons";
import CouponAdd from "../pages/seller/coupon/components/CouponAdd";
import CouponView from "../pages/seller/coupon/components/CouponView";
import Restaurant from "../pages/admin/restaurants/Restaurant";
import AddRestaurants from "@/pages/admin/restaurants/components/AddRestaurants";
import Gallary from "../Components/Restaurant/Gallary";
import OurTeam from "../pages/admin/team/OurTeam";
import TeamAdd from "@/pages/admin/team/components/TeamAdd";
import AdminLogin from "../Components/AdminLogin";
import BusinessDetails from "../pages/seller/businessdetails/BusinessDetail";
import CategoryProducts from "../Components/Category/CategoryProducts";

import HomePage from "../pages/user/HomePage";
import AdminNavigation from "./AdminNavigation";
import SellerNavigation from "./SellerNavigation";
import CustomerNavigation from "./CustomerNavigation";
import NotAuthorized from "../Components/NotAuthorized";
import ProtectedRoute from "../Components/ProtectedRoute";
import RestaurantTypes from "../pages/seller/restauranttypes/RestaurantTypes";
import CheckoutPage from "../pages/user/checkout/CheckOutPage";
import GallaryHeader from "../Components/Restaurant/GallaryHeader";
import GallaryModelAdd from "../Components/Restaurant/GallaryModelAdd";
import Container from "@/Components/Container";
import UserCategory from "@/pages/user/category/Category";
import UserContainer from "@/pages/user/components/UserContainer";
import usePreventBack from "@/Components/hooks/usePreventBack";
import AboutUs from "@/pages/user/home/components/AboutUs";
import BestSeller from "@/pages/user/home/components/BestSeller";
import LatestNews from "@/pages/user/home/components/LatestNews"
import ProductGallary from "@/pages/user/home/components/ProductGallary";
import Team from "@/pages/user/home/components/Team";
import TodaySpecial from "@/pages/user/home/components/TodaySpecial";
import Button from "@/Components/ReusableComponent/Button";
import Testimonials from "@/pages/user/testimonials/Testimonials";
import Footer from "@/pages/user/components/Footer";
import UserProductView from '@/pages/user/category/UserProductView'
import Home from "@/pages/user/home/Home";


export {
  Home,
  UserProductView,
  Footer,
  AboutUs,
  BestSeller,
  LatestNews,
  ProductGallary,
  Team,
  TodaySpecial,
  Button,
  Testimonials,
  usePreventBack,
  UserContainer,
  Container,
  UserCategory,
  GallaryHeader,
  GallaryModelAdd,
  CheckoutPage,
  AdminNavigation,
  SellerNavigation,
  CustomerNavigation,
  NotAuthorized,
  ProtectedRoute,
  RestaurantTypes,
  HomePage,
  Login,
  CategoryProducts,
  BusinessDetails,
  AdminLogin,
  CategoryPage,
  Verification,
  Register,
  Dashboard,
  Orders,
  Products,
  ProductAdd,
  Category,
  ProductView,
  Coupons,
  CouponAdd,
  CouponView,
  Restaurant,
  AddRestaurants,
  Gallary,
  OurTeam,
  TeamAdd,
};
