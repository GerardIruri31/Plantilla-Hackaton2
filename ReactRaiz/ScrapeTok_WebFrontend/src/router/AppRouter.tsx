import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CategoryDetail from "../pages/CategoryDetail";

import Summary from "../pages/Summary";
import ViewCategories from "../pages/ViewCategories";
import ManageExpenses from "../pages/ManageExpenses";
import ProtectedLayout from "../components/ProtectedLayout";
import Gastos from "../pages/Gastos";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas privadas protegidas por layout */}
        <Route element={<ProtectedLayout />}>
          <Route path="/expenses_summary" element={<Summary />} />
          <Route path="/expenses_details" element={<Gastos />} />
          <Route path="/expenses_category" element={<ViewCategories />} />
          <Route path="/manage_expenses" element={<ManageExpenses />} />
          <Route path="/category/:id" element={<CategoryDetail />} />
          {/* Fallback interno */}
          <Route path="*" element={<Navigate to="/expenses_summary" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
