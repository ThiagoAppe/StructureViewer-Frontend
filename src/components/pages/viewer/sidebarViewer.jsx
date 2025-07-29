import React from "react";

export default function SidebarViewer({
  codigo,
  setCodigo,
  buscarEstructura,
  expandAll,
  collapseAll,
  setVisible,
  codigosComparar,
  setCodigosComparar,
  buscarEstructuraComparar,
  expandAllComparar,
  collapseAllComparar,
  eliminarComparar,
}) {
  return (
    <aside className="w-80 min-w-[20rem] max-w-[20rem] bg-white shadow p-4 flex flex-col gap-4 rounded-xl self-start">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-blue-700">Herramientas</h2>
        <button
          onClick={setVisible}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Cerrar herramientas"
          title="Cerrar herramientas"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Artículo principal */}
      <div className="flex flex-col gap-2 max-w-xs">
        <input
          type="text"
          placeholder="Código de artículo"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscarEstructura()}
          className="border px-3 py-2 rounded shadow"
        />
        <button
          onClick={buscarEstructura}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
        <button
          onClick={expandAll}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Expandir todo
        </button>
        <button
          onClick={collapseAll}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-slate-900"
        >
          Contraer todo
        </button>
      </div>

      {/* Comparaciones */}
      <div className="mt-4 flex flex-col gap-4">
  {codigosComparar.map((item, idx) => (
    <div
      key={idx}
      className="border p-2 rounded bg-gray-50 relative max-w-xs"
    >
      <div className="flex items-center justify-between gap-2">
        <input
          type="text"
          placeholder={`Código comparar #${idx + 1}`}
          value={item.codigo}
          onChange={(e) => {
            const nuevos = [...codigosComparar];
            nuevos[idx].codigo = e.target.value;
            setCodigosComparar(nuevos);
          }}
          onKeyDown={(e) => e.key === "Enter" && buscarEstructuraComparar(idx)}
          className="border px-3 py-2 rounded shadow w-full"
        />
        <button
          onClick={() => eliminarComparar(idx)}
          className="text-red-600 px-2 py-1 rounded hover:bg-red-100"
          title="Eliminar comparación"
        >
          &times;
        </button>
      </div>

      <div className="flex gap-2 mt-2 flex-wrap">
        <button
          onClick={() => buscarEstructuraComparar(idx)}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
        <button
          onClick={() => expandAllComparar(idx)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Expandir
        </button>
        <button
          onClick={() => collapseAllComparar(idx)}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-slate-900"
        >
          Contraer
        </button>
      </div>
    </div>
  ))}

  <button
    onClick={() =>
      setCodigosComparar([
        ...codigosComparar,
        {
          codigo: "",
          estructura: [],
          error: "",
          loading: false,
          expandedNodes: new Set(),
        },
      ])
    }
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 max-w-xs"
  >
    + Agregar artículo para Visualizar
  </button>
</div>

    </aside>
  );
}
