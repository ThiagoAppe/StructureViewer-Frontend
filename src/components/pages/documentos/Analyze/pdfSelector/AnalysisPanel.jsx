import React from "react";

const AnalysisPanel = ({
  rectangles,
  onClear,
  onReset,
  onNewSelection,
  onConfirmSelection,
  hasActiveSelection,
  onRemoveRectangle,
  onAnalyze,
  structureCode,
  onStructureCodeChange,
}) => {
  return (
    <div className="w-1/3 border-l border-gray-700 pl-6 flex flex-col">
      <h3 className="font-bold mb-6 text-white text-lg">Selecciones</h3>

      {/* Botones principales */}
      <div className="grid grid-cols-2 gap-4">

        <button
          onClick={onNewSelection}
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
        >
          Nueva selección
        </button>

        <button
          onClick={onConfirmSelection}
          disabled={!hasActiveSelection}
          className="w-full px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded disabled:opacity-50 transition"
        >
          Añadir a la lista
        </button>

        <button
          onClick={onClear}
          className="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition"
        >
          Limpiar
        </button>

        <button
          onClick={onReset}
          className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
        >
          Cargar otro PDF
        </button>

      </div>



      {/* Input código estructura */}
      <div className="mt-6">
        <input
          type="text"
          value={structureCode}
          onChange={(e) => onStructureCodeChange(e.target.value)}
          placeholder="Código estructura"
          className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/* Botón analizar */}
      <button
        onClick={onAnalyze}
        disabled={rectangles.length === 0}
        className="mt-4 w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50 transition font-medium"
      >
        Analizar
      </button>

      {/* Áreas añadidas */}
      <div className="mt-8 flex-1 overflow-y-auto">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">
          Áreas añadidas
        </h4>

        <div className="space-y-2 text-sm text-white">
          {rectangles.map((r, index) => (
            <div
              key={r.id}
              className="border border-gray-700 bg-gray-800 p-2 rounded flex justify-between items-center"
            >
              <span>Área {index + 1}</span>
              <button
                onClick={() => onRemoveRectangle(r.id)}
                className="text-red-500 hover:text-red-400 transition"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPanel;
