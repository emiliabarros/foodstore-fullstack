import { Ingrediente } from "../services/ingredientes";

interface Props {
  ingredientes: Ingrediente[];
  onEditar: (i: Ingrediente) => void;
  onEliminar: (id: number) => void;
  onReactivar: (id: number) => void;
}

export default function TablaIngredientes({ ingredientes, onEditar, onEliminar, onReactivar }: Props) {
  if (ingredientes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-100">
        No se encontraron ingredientes
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-100">
      <table className="w-full bg-white text-sm">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Nombre</th>
            <th className="px-4 py-3 text-left">Descripción</th>
            <th className="px-4 py-3 text-left">Alérgeno</th>
            <th className="px-4 py-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {ingredientes.map((i) => (
            <tr key={i.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3 text-gray-400">#{i.id}</td>
              <td className="px-4 py-3 font-medium text-gray-800">{i.nombre}</td>
              <td className="px-4 py-3 text-gray-500">{i.descripcion || "—"}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${i.es_alergeno ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>
                  {i.es_alergeno ? "⚠️ Sí" : "✅ No"}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button onClick={() => onEditar(i)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-lg transition">
                    Editar
                  </button>
                  <button onClick={() => onEliminar(i.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-lg transition">
                    Eliminar
                  </button>
                  <button onClick={() => onReactivar(i.id)}
                    className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-lg transition">
                    Reactivar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
