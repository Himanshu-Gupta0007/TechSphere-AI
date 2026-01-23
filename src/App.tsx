import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Generate from "./pages/Generate";
import MyGenerate from "./pages/MyGenerate";
import YTPreview from "./pages/YTPreview";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";

import "./globals.css";
import LenisScroll from "./components/LenisScroll";

import { AuthProvider } from "./context/AuthContext";
import { GenerateProvider } from "./context/GenerateContext";  // ✅ IMPORT HERE

export default function App() {
  return (
    <AuthProvider>
      <GenerateProvider>  {/* ✅ WRAP HERE */}
        <LenisScroll />
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* dynamic route */}
          <Route path="/generate" element={<Generate />} />
          <Route path="/generate/:id" element={<Generate />} />

          {/* static routes */}
          <Route path="/my-generate" element={<MyGenerate />} />
          <Route path="/ytpreview" element={<YTPreview />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <Footer />
      </GenerateProvider>
    </AuthProvider>
  );
}
