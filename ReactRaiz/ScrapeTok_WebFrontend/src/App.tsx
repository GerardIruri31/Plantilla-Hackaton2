//import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import AuthForms from "./components/AuthForms";
import ShowCredentials from "./components/ShowCredentials";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AuthProvider>
                <AuthForms />
              </AuthProvider>
            }
          />
          <Route
            path="/temp"
            element={
              <AuthProvider>
                <ShowCredentials />
              </AuthProvider>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
