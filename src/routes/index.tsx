import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "@/pages/Home/Home";
import { Section1PageA } from "@/pages/Sections/Section1/PageA/PageA";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />

      <Route path="/home" element={<Home />} />

      <Route path="/section1/pageA" element={<Section1PageA />} />

      <Route path="/section1/pageB" element={<h1>Section 1 - Page B</h1>} />

      <Route path="/section2/pageA" element={<h1>Section 2 - Page A</h1>} />

      <Route path="/section2/pageB" element={<h1>Section 2 - Page B</h1>} />
    </Routes>
  );
}