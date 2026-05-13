import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Audit from "./pages/Audit";
import Result from "./pages/Result";
import PublicReportPage from "./pages/PublicReportPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/result" element={<Result />} />
          <Route path="/a/:id" element={<PublicReportPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
