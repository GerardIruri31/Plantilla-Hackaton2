//import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import AuthForms from "./components/AuthForms";
import { AuthProvider } from "./contexts/AuthContext";
import Gastos from "./components/Gastos";
import Summary from "./components/Summary";
import ViewCategories from "./components/ViewCategories";
import ProtectedLayout from "./components/ProtectedLayout";
import ManageExpenses from "./components/ManageExpenses";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Ruta pública (login/signup), sin NavBar */}
            <Route path="/" element={<AuthForms />} />

            {/* Aquí van todas las rutas que deben llevar NavBar */}
            <Route element={<ProtectedLayout />}>
              <Route path="expenses_details" element={<Gastos />} />
              <Route path="expenses_summary" element={<Summary />} />
              <Route path="expenses_category" element={<ViewCategories />} />
              <Route path="manage_expenses" element={<ManageExpenses />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
