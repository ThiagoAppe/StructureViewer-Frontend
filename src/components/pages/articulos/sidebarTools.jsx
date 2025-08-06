import React from "react";

import Loading from "../../utils/loading";

export default function SidebarTools({
  Codigo,
  SetCodigo,
  buscarEstructura,
  expandAll,
  collapseAll,
  CodigosComparar,
  SetCodigosComparar,
  buscarEstructuraComparar,
  expandAllComparar,
  collapseAllComparar,
  eliminarComparar,
  loading,           // loading global principal
  loadingComparar,   // loading individual comparaciones (array)
  agregarComparar,
  AnalizarComparacion, // <-- NUEVO prop para la función que analiza la comparación
  loadingComparacion,  // loading para comparación global (opcional, si lo querés mostrar)
}) {
  return (
    <aside className="min-w-[320px] max-w-[320px] bg-white rounded-md shadow-md p-4 flex flex-col gap-6 overflow-y-auto m-6">
      <h2 className="text-black font-semibold text-3xl">Herramientas</h2>

      {/* Barra de búsqueda arriba */}
      <div>
        <input
          type="text"
          placeholder="Código de artículo | Ej: 02429-01"
          value={Codigo}
          onChange={(e) => SetCodigo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscarEstructura()}
          className="w-full text-md border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
      </div>

      {/* Fila con los 3 botones */}
      <div className="flex gap-2">
        <button
          onClick={buscarEstructura}
          className="flex-1 bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-colors flex justify-center items-center"
          disabled={loading}
        >
          {loading ? <Loading inline className="w-6 h-6" /> : "Buscar"}
        </button>

        <button
          onClick={expandAll}
          className="flex-1 bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          Expandir
        </button>

        <button
          onClick={collapseAll}
          className="flex-1 bg-gray-600 text-white rounded-md py-2 hover:bg-gray-700 transition-colors"
          disabled={loading}
        >
          Contraer
        </button>
      </div>

      {/* Botón verde Agregar artículo abajo */}
      <div>
        <button
          onClick={agregarComparar}
          className="w-full bg-green-600 text-white rounded-md py-2 cursor-pointer hover:bg-green-700 transition-colors"
          disabled={loading}
        >
          + Agregar artículo para Visualizar
        </button>
      </div>

      {/* BOTÓN PARA ANALIZAR COMPARACIÓN
      <div>
        <button
          onClick={AnalizarComparacion}
          className="w-full bg-gray-600 text-white rounded-md py-1 cursor-pointer hover:bg-gray-900 transition-colors flex justify-center items-center"
          disabled={loading}
        >
          {loadingComparacion ? <Loading inline className="w-5 h-5" /> : "Analizar Comparacion"}
        </button>
      </div> */}

      {/* Comparaciones */}
      <div className="flex flex-col gap-4">
        {CodigosComparar.map((item, idx) => {
          const loadingItem = loadingComparar[idx] || false;
          return (
            <div
              key={idx}
              className="border border-gray-200 p-3 rounded-md bg-gray-50"
            >
              <div className="flex justify-between gap-2">
                <input
                  type="text"
                  placeholder={`Código comparar #${idx + 1}`}
                  value={item.Codigo}
                  onChange={(e) => {
                    const nuevos = [...CodigosComparar];
                    nuevos[idx].Codigo = e.target.value;
                    SetCodigosComparar(nuevos);
                  }}
                  onKeyDown={(e) =>
                    e.key === "Enter" && buscarEstructuraComparar(idx)
                  }
                  className="flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loadingItem}
                />
                <button
                  onClick={() => eliminarComparar(idx)}
                  title="Eliminar comparación"
                  className="text-red-600 font-bold text-2xl cursor-pointer p-0 leading-none bg-transparent border-0"
                  disabled={loadingItem}
                >
                  &times;
                </button>
              </div>

              {/* Mostrar mensaje de error si existe */}
              {item.Error && (
                <div className="mt-1 text-sm text-red-600">{item.Error}</div>
              )}

              <div className="flex gap-2 mt-2 flex-wrap">
                <button
                  onClick={() => buscarEstructuraComparar(idx)}
                  className="bg-blue-600 text-white rounded-md px-2.5 py-1.5 hover:bg-blue-700 transition-colors flex justify-center items-center min-w-[70px] h-[42px]"
                  disabled={loadingItem}
                >
                  {loadingItem ? (
                    <div className="flex justify-center items-center w-full h-full">
                      <Loading inline className="w-5 h-5" />
                    </div>
                  ) : (
                    "Buscar"
                  )}
                </button>

                <button
                  onClick={() => expandAllComparar(idx)}
                  className="bg-blue-500 text-white rounded-md px-2.5 py-1.5 hover:bg-blue-600 transition-colors"
                  disabled={loadingItem}
                >
                  Expandir
                </button>
                <button
                  onClick={() => collapseAllComparar(idx)}
                  className="bg-gray-600 text-white rounded-md px-2.5 py-1.5 hover:bg-gray-700 transition-colors whitespace-nowrap"
                  disabled={loadingItem}
                >
                  Contraer
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
