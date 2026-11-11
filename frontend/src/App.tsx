import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import IngredientesPage from "./pages/IngredientesPage";
import Navbar from "./components/Navbar";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { state } = useAuth();
  if (!state.isAuthenticated) return <Navigate to="/login" replace />;
  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">{children}</main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <PrivateLayout>
            <div className="max-w-5xl mx-auto px-4 py-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Bienvenido 👋</h2>
              <p className="text-gray-500">Usá el menú para navegar al módulo de ingredientes.</p>
            </div>
          </PrivateLayout>
        } />
        <Route path="/ingredientes" element={<PrivateLayout><IngredientesPage /></PrivateLayout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
