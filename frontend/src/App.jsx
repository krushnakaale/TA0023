import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomePage from "./pages/Home/HomePage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import AboutPage from "./pages/About/AboutPage";
import AuthPage from "./pages/AuthPage";

export default function App() {
  return (
    <div className="flex bg-background min-h-screen text-neutral">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 p-6 px-20 pb-20 md:pb-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/auth" element={<AuthPage />} />;
        </Routes>
      </div>
    </div>
  );
}
