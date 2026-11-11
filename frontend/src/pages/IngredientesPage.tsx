import { useEffect, useState } from "react";
import { useIngredientes } from "../context/IngredientesContext";
import {
  getIngredientes, createIngrediente, updateIngrediente,
  deleteIngrediente, reactivarIngrediente, Ingrediente,
} from "../services/ingredientes";
import FiltrosIngredientes from "../components/FiltrosIngredientes";
import TablaIngredientes from "../components/TablaIngredientes";
import IngredienteModal from "../components/IngredienteModal";
import Paginacion from "../components/Paginacion";

export default function IngredientesPage() {
  const { state, dispatch } = useIngredientes();
  const { ingredientes, total, skip, limit, filtros, loading } = state;
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState<Ingrediente | null>(null);

  // Estado derivado
  const totalPaginas = Math.ceil(total / limit);
  const paginaActual = Math.floor(skip / limit) + 1;

  const cargar = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const params: Record<string, unknown> = { skip, limit };
      if (filtros.nombre) params.nombre = filtros.nombre;
      if (filtros.esAlergeno !== "") params.es_alergeno = filtros.esAlergeno === "true";
      if (filtros.incluirEliminados) params.incluir_eliminados = true;
      const data = await getIngredientes(params);
      dispatch({ type: "SET_INGREDIENTES", payload: { ingredientes: data.items, total: data.total } });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => { cargar(); }, [skip, filtros]);

  const abrirCrear = () => { setEditando(null); setShowModal(true); };
  const abrirEditar = (i: Ingrediente) => { setEditando(i); setShowModal(true); };

  const guardar = async (data: { nombre: string; descripcion: string; es_alergeno: boolean }) => {
    if (editando) {
      await updateIngrediente(editando.id, data);
    } else {
      await createIngrediente(data);
    }
    setShowModal(false);
    cargar();
  };

  const eliminar = async (id: number) => {
    if (!confirm("¿Eliminar este ingrediente?")) return;
    await deleteIngrediente(id);
    cargar();
  };

  const reactivar = async (id: number) => {
    await reactivarIngrediente(id);
    cargar();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Ingredientes</h2>
          <p className="text-gray-500 text-sm">{total} ingredientes encontrados</p>
        </div>
        <button onClick={abrirCrear}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition">
          + Nuevo ingrediente
        </button>
      </div>

      {/* Filtros */}
      <FiltrosIngredientes />

      {/* Tabla */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Cargando...</div>
      ) : (
        <TablaIngredientes
          ingredientes={ingredientes}
          onEditar={abrirEditar}
          onEliminar={eliminar}
          onReactivar={reactivar}
        />
      )}

      {/* Paginación */}
      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        total={total}
        skip={skip}
        limit={limit}
        onAnterior={() => dispatch({ type: "SET_SKIP", payload: skip - limit })}
        onSiguiente={() => dispatch({ type: "SET_SKIP", payload: skip + limit })}
      />

      {/* Modal */}
      {showModal && (
        <IngredienteModal
          ingrediente={editando}
          onGuardar={guardar}
          onCerrar={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
