import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const { state, dispatch } = useAuth();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href = "/login";
  };

  return (
    <nav className="bg-red-700 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="text-xl font-bold">🍔 Food Store</span>
          <div className="flex gap-1">
            <Link to="/" className={`px-3 py-1 rounded-lg text-sm transition ${pathname === "/" ? "bg-white/20" : "hover:bg-white/10"}`}>
              Inicio
            </Link>
            <Link to="/ingredientes" className={`px-3 py-1 rounded-lg text-sm transition ${pathname === "/ingredientes" ? "bg-white/20" : "hover:bg-white/10"}`}>
              Ingredientes
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {state.usuario && (
            <span className="text-sm text-white/80 hidden sm:block">Hola, {state.usuario.nombre}</span>
          )}
          <button onClick={handleLogout} className="border border-white/40 hover:bg-white/10 text-sm px-3 py-1 rounded-lg transition">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
