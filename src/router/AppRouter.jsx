import { Navigate, Route, Routes } from "react-router-dom";
import DashBoard from "../pages/Dashboard/Dashboard";
import ProductList from "../pages/Dashboard/ProductList";
import AddProduct from "../pages/Dashboard/AddProduct";
import ErrorPage from "../pages/404ErrorPage/ErrorPage";
import LandingPage from "../pages/landing/LandingPage";
import DashBoardLayout from "../pages/Dashboard/DashBoardLayout";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/landingPage" element={<LandingPage />} />

      <Route path="/Dashboard" element={<DashBoardLayout />}>
        <Route index element={<Navigate to="Home" replace />} />

        <Route path="Home" element={<DashBoard />} />

        <Route path="ProductList" element={<ProductList />} />

        <Route path="AddProduct" element={<AddProduct />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
