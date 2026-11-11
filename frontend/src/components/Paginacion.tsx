interface Props {
  paginaActual: number;
  totalPaginas: number;
  total: number;
  skip: number;
  limit: number;
  onAnterior: () => void;
  onSiguiente: () => void;
}

export default function Paginacion({ paginaActual, totalPaginas, total, skip, limit, onAnterior, onSiguiente }: Props) {
  const desde = total === 0 ? 0 : skip + 1;
  const hasta = Math.min(skip + limit, total);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-4 text-sm text-gray-600">
      <span>Mostrando {desde}–{hasta} de {total} ingredientes</span>
      <div className="flex gap-2">
        <button disabled={paginaActual === 1} onClick={onAnterior}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition">
          ← Anterior
        </button>
        <span className="px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-lg">
          {paginaActual} / {totalPaginas || 1}
        </span>
        <button disabled={paginaActual >= totalPaginas} onClick={onSiguiente}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition">
          Siguiente →
        </button>
      </div>
    </div>
  );
}
