import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import AuthForms from "./components/AuthForms";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AuthForms />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
