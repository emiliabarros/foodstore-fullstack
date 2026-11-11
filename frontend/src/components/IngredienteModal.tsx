import { useState, useEffect } from "react";
import { Ingrediente } from "../services/ingredientes";

interface Props {
  ingrediente: Ingrediente | null;
  onGuardar: (data: { nombre: string; descripcion: string; es_alergeno: boolean }) => Promise<void>;
  onCerrar: () => void;
}

export default function IngredienteModal({ ingrediente, onGuardar, onCerrar }: Props) {
  const [form, setForm] = useState({ nombre: "", descripcion: "", es_alergeno: false });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ingrediente) {
      setForm({
        nombre: ingrediente.nombre,
        descripcion: ingrediente.descripcion || "",
        es_alergeno: ingrediente.es_alergeno,
      });
    } else {
      setForm({ nombre: "", descripcion: "", es_alergeno: false });
    }
  }, [ingrediente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onGuardar(form);
    } catch {
      setError("Error al guardar. Revisá los datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            {ingrediente ? "Editar ingrediente" : "Nuevo ingrediente"}
          </h3>
          <button onClick={onCerrar} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Nombre - Input controlado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text" name="nombre" value={form.nombre} onChange={handleChange}
              placeholder="Ej: Queso cheddar" required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>

          {/* Descripción - Input controlado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <input
              type="text" name="descripcion" value={form.descripcion} onChange={handleChange}
              placeholder="Ej: Queso fundido (opcional)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>

          {/* Alérgeno - Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox" name="es_alergeno" id="es_alergeno"
              checked={form.es_alergeno} onChange={handleChange}
              className="w-4 h-4 accent-red-500"
            />
            <label htmlFor="es_alergeno" className="text-sm font-medium text-gray-700 cursor-pointer">
              Es alérgeno ⚠️
            </label>
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60">
              {loading ? "Guardando..." : "Guardar"}
            </button>
            <button type="button" onClick={onCerrar}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg transition">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
