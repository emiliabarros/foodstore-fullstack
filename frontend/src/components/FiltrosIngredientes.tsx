import { useIngredientes } from "../context/IngredientesContext";

export default function FiltrosIngredientes() {
  const { state, dispatch } = useIngredientes();
  const { filtros, ingredientes } = state;

  // .filter() client-side — estado derivado
  const totalAlergenos = ingredientes.filter((i) => i.es_alergeno).length;
  const totalNoAlergenos = ingredientes.filter((i) => !i.es_alergeno).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-gray-600">Filtros</h3>
        <div className="flex gap-2 text-xs">
          <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">⚠️ {totalAlergenos} alérgenos</span>
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✅ {totalNoAlergenos} sin alérgeno</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Filtro nombre - Input */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Nombre</label>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={filtros.nombre}
            onChange={(e) => dispatch({ type: "SET_FILTRO_NOMBRE", payload: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>

        {/* Filtro alérgeno - Select */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Alérgeno</label>
          <select
            value={filtros.esAlergeno}
            onChange={(e) => dispatch({ type: "SET_FILTRO_ALERGENO", payload: e.target.value as "" | "true" | "false" })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 bg-white"
          >
            <option value="">Todos</option>
            <option value="true">Alérgenos</option>
            <option value="false">No alérgenos</option>
          </select>
        </div>

        {/* Filtro incluir eliminados - Checkbox */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Estado</label>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="incluirEliminados"
              checked={filtros.incluirEliminados}
              onChange={(e) => dispatch({ type: "SET_INCLUIR_ELIMINADOS", payload: e.target.checked })}
              className="w-4 h-4 accent-red-500"
            />
            <label htmlFor="incluirEliminados" className="text-sm text-gray-600 cursor-pointer">
              Incluir eliminados
            </label>
          </div>
        </div>
      </div>

      {(filtros.nombre || filtros.esAlergeno || filtros.incluirEliminados) && (
        <button onClick={() => dispatch({ type: "RESET_FILTROS" })} className="mt-3 text-xs text-red-500 hover:underline">
          ✕ Limpiar filtros
        </button>
      )}
    </div>
  );
}
