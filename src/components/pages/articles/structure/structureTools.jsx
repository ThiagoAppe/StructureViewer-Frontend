import React from "react";

import Loading from "../../../utils/loading";

export default function StructureTools({
  Codigo,
  SetCodigo,
  buscarEstructura,
  expandAll,
  collapseAll,
  loading
}) {
  return (
    <aside className="w-fit bg-white rounded-md shadow-md p-4 flex gap-6 overflow-y-auto ml-6 mt-2 mb-4">
      <h2 className="text-black font-semibold text-3xl">Estructura</h2>

      {/* Barra de búsqueda*/}
      <div>
        <input
          type="text"
          placeholder="Código de artículo"
          value={Codigo}
          onChange={(e) => SetCodigo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscarEstructura()}
          className="w-full text-md border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
      </div>

      {/*3 botones */}
      <div className="flex gap-2">
        <button
          onClick={buscarEstructura}
          className="flex-1 px-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex justify-center items-center"
          disabled={loading}
        >
          {loading ? <Loading inline className="w-6 h-6" /> : "Buscar"}
        </button>

        <button
          onClick={expandAll}
          className="flex-1 px-2 bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          Expandir
        </button>

        <button
          onClick={collapseAll}
          className="flex-1 px-2 bg-gray-600 text-white rounded-md py-2 hover:bg-gray-700 transition-colors"
          disabled={loading}
        >
          Contraer
        </button>
      </div>
    </aside>
  );
}
