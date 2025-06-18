import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import CategoryDetail from "../pages/CategoryDetail";

import Summary from "../components/Summary";
import ViewCategories from "../components/ViewCategories";
import ManageExpenses from "../components/ManageExpenses";
import ProtectedLayout from "../components/ProtectedLayout";

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
          <Route path="/expenses_details" element={<Dashboard />} />
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
