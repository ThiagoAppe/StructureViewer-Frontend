import React from "react";

// Nodo básico: renderiza un nodo sin diferencias
export function NodoBasico({
  nodo,
  isExpanded,
  toggleNode,
  nodeId,
  nivel,
  hasChildren,
}) {
  return (
    <div
      onClick={() => hasChildren && toggleNode(nodeId)}
      className={`inline-flex items-center gap-2 px-2 py-1 rounded border w-max transition-all duration-150 border-gray-300 bg-white ${
        hasChildren ? "cursor-pointer" : ""
      }`}
      style={{ marginLeft: nivel > 0 ? 24 : 0 }}
    >
      {hasChildren && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 text-blue-500 transform transition-transform duration-200 ${
            isExpanded ? "rotate-90" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}

      <span className="font-bold text-sm">{nodo.codigo}</span>
      <span className="text-xs text-gray-600">{nodo.cantidad}</span>
      <span className="text-sm">{nodo.descripcion}</span>
    </div>
  );
}

// Nodo con diferencias: resalta nodos con diferencias usando props diferencias y codigoActual
export function NodoConDiferencias({
  nodo,
  isExpanded,
  toggleNode,
  nodeId,
  nivel,
  hasChildren,
  diferencias,
  codigoActual,
}) {
  const codigosConDiferencia = new Set(
    diferencias
      .filter((dif) => dif.codigo && dif.faltantes?.includes(codigoActual))
      .map((dif) => dif.codigo)
  );

  const isDiferente = codigosConDiferencia.has(nodo.codigo);
  const diferenciaData = diferencias.find((d) => d.codigo === nodo.codigo);

  return (
    <div
      onClick={() => hasChildren && toggleNode(nodeId)}
      className={[
        "inline-flex items-center gap-2 px-2 py-1 rounded border w-max transition-all duration-150",
        "border-gray-300 bg-white",
        diferenciaData
          ? diferenciaData.cantidades
            ? "bg-yellow-400 border-yellow-700"
            : "bg-yellow-200 border-yellow-500"
          : "",
        hasChildren ? "cursor-pointer" : "",
      ].join(" ")}
      style={{ marginLeft: nivel > 0 ? 24 : 0 }}
    >
      {hasChildren && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 text-blue-500 transform transition-transform duration-200 ${
            isExpanded ? "rotate-90" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}

      <span className="font-bold text-sm">{nodo.codigo}</span>
      <span className="text-xs text-gray-600">{nodo.cantidad}</span>
      <span className="text-sm">{nodo.descripcion}</span>

      {/* Icono con tooltip diferencia */}
      {diferenciaData && (
        <div className="relative group ml-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-yellow-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l5.515 9.814c.75 1.335-.213 3.087-1.742 3.087H4.484c-1.53 0-2.492-1.752-1.742-3.087l5.515-9.814zM10 12a1 1 0 100-2 1 1 0 000 2zm.25-4.75a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z"
              clipRule="evenodd"
            />
          </svg>
          <div className="absolute z-10 top-5 left-0 hidden group-hover:block bg-yellow-300 border border-yellow-700 text-yellow-900 text-xs rounded px-2 py-1 shadow-lg whitespace-pre">
            {(() => {
              let msg = "";
              if (diferenciaData.faltantes?.length > 0) {
                msg += `Falta en: ${diferenciaData.faltantes.join(", ")}\n`;
              }
              if (diferenciaData.cantidades) {
                msg += "Cantidades:\n";
                for (const [articulo, cantidad] of Object.entries(diferenciaData.cantidades)) {
                  msg += ` - ${articulo}: ${cantidad}\n`;
                }
              }
              return msg.trim();
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

export default function EstructuraRenderizer({
  estructura,
  loading,
  error,
  expandedNodes = new Set(),
  toggleNode = () => {},
  diferencias = [],
  codigoActual = "",
  NodoComponent = NodoBasico,
}) {
  function renderNodos(nodos, nivel = 0, prefix = "node") {
    return (
      <ul
        className={`space-y-2 ${nivel > 0 ? "ml-6 mt-1 border-l border-gray-200 pl-4" : ""}`}
      >
        {nodos.map((nodo, idx) => {
          const nodeId = `${prefix}-${idx}`;
          const hasChildren = nodo.hijos?.length > 0;
          const isExpanded = expandedNodes.has(nodeId);

          return (
            <li key={nodeId}>
              <NodoComponent
                nodo={nodo}
                isExpanded={isExpanded}
                toggleNode={toggleNode}
                nodeId={nodeId}
                nivel={nivel}
                hasChildren={hasChildren}
                diferencias={diferencias}
                codigoActual={codigoActual}
              />
              {hasChildren && isExpanded && renderNodos(nodo.hijos, nivel + 1, nodeId)}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <main className="p-6 overflow-auto">
      {loading && <p className="text-gray-500">Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && estructura.length > 0 && renderNodos(estructura)}
    </main>
  );
}
