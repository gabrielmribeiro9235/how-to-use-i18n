import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "@/pages/Home/Home";
import { Section1PageA } from "@/pages/Sections/Section1/PageA/PageA";
import { Section1PageB } from "@/pages/Sections/Section1/PageB/PageB";
import { Section2PageA } from "@/pages/Sections/Section2/PageA/PageA";
import { Section2PageB } from "@/pages/Sections/Section2/PageB/PageB";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />

      <Route path="/home" element={<Home />} />

      <Route path="/section1/pageA" element={<Section1PageA />} />

      <Route path="/section1/pageB" element={<Section1PageB />} />

      <Route path="/section2/pageA" element={<Section2PageA />} />

      <Route path="/section2/pageB" element={<Section2PageB />} />
    </Routes>
  );
}