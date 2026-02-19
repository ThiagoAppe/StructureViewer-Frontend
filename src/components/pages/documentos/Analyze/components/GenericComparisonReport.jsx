import React, { useState } from "react";

/**
 * Componente genérico para mostrar reportes de comparación
 * @param {Object} result - Resultado de la comparación
 * @param {Object} config - Configuración del reporte
 */
export default function GenericComparisonReport({ result, config = {} }) {
  const [showDetails, setShowDetails] = useState(false);

  const {
    title = "Resultado del Análisis",
    statusLabels = {
      success: "✅ Todo coincide",
      missing: "❌ Faltan elementos",
      extra: "⚠️ Sobran elementos",
      both: "❌ Faltan y sobran elementos"
    },
    statusColors = {
      success: "bg-green-600",
      missing: "bg-red-600",
      extra: "bg-yellow-500 text-black",
      both: "bg-red-600"
    },
    labels = {
      totalSource: "Total en estructura",
      totalTarget: "Total en PDF",
      matched: "Coinciden",
      missing: "Faltantes",
      extra: "Sobrantes"
    },
    detailLabels = {
      expected: "📦 Estructura completa (lo que debería estar)",
      ocr: "📝 Estructura plana OCR (normalizada)",
      differences: "⚠️ Detalle de diferencias"
    },
    formatCode = (code) => code,
    formatQuantity = (qty) => `x${qty}`
  } = config;

  if (!result || !result.comparison_report) return null;

  const { comparison_report, normalized_codes } = result;
  const {
    matched = {},
    missing_in_pdf = {},
    extra_in_pdf = {},
    total_in_structure,
    total_in_pdf,
  } = comparison_report;

  // Convertir objetos a arrays
  const matchedEntries = Object.entries(matched);
  const missingEntries = Object.entries(missing_in_pdf);
  const extraEntries = Object.entries(extra_in_pdf);

  // Estructura esperada completa
  const expectedStructure = {
    ...matched,
    ...missing_in_pdf,
  };
  const expectedEntries = Object.entries(expectedStructure);

  // Determinar estado
  let status = statusLabels.success;
  let statusColor = statusColors.success;
  
  if (missingEntries.length > 0 && extraEntries.length === 0) {
    status = statusLabels.missing;
    statusColor = statusColors.missing;
  } else if (extraEntries.length > 0 && missingEntries.length === 0) {
    status = statusLabels.extra;
    statusColor = statusColors.extra;
  } else if (missingEntries.length > 0 && extraEntries.length > 0) {
    status = statusLabels.both;
    statusColor = statusColors.both;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {/* Estado global */}
      <div className={`inline-block px-4 py-2 rounded font-semibold ${statusColor}`}>
        {status}
      </div>

      {/* Resumen */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p><strong>{labels.totalSource}:</strong> {total_in_structure}</p>
          <p><strong>{labels.totalTarget}:</strong> {total_in_pdf}</p>
          <p><strong>{labels.matched}:</strong> {matchedEntries.length}</p>
        </div>
        <div>
          <p><strong>{labels.missing}:</strong> {missingEntries.length}</p>
          <p><strong>{labels.extra}:</strong> {extraEntries.length}</p>
        </div>
      </div>

      {/* Elementos faltantes */}
      {missingEntries.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold text-red-400 mb-1">Códigos faltantes:</p>
          <div className="flex flex-wrap gap-2">
            {missingEntries.map(([code, qty]) => (
              <span key={code} className="px-2 py-1 bg-red-700 rounded">
                {formatCode(code)} <span className="text-sm text-gray-300">(faltan {qty})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Elementos sobrantes */}
      {extraEntries.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold text-yellow-300 mb-1">Códigos sobrantes:</p>
          <div className="flex flex-wrap gap-2">
            {extraEntries.map(([code, qty]) => (
              <span key={code} className="px-2 py-1 bg-yellow-600 text-black rounded">
                {formatCode(code)} <span className="text-sm">(sobran {qty})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Botón detalle */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
      >
        {showDetails ? "Ocultar detalle" : "Ver detalle"}
      </button>

      {/* Detalle completo */}
      {showDetails && (
        <div className="mt-4 bg-gray-700 p-4 rounded overflow-auto max-h-[600px] space-y-6">
          {/* Estructura esperada */}
          <div>
            <p className="font-semibold text-green-300 mb-1">
              {detailLabels.expected}:
            </p>
            <div className="flex flex-wrap gap-2">
              {expectedEntries.map(([code, qty]) => (
                <span
                  key={code}
                  className={`px-2 py-1 rounded ${
                    matched[code] ? "bg-green-600" : "bg-red-700"
                  }`}
                >
                  {formatCode(code)} <span className="text-sm text-gray-300">({formatQuantity(qty)})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Estructura OCR */}
          {normalized_codes && (
            <div>
              <p className="font-semibold text-blue-300 mb-1">
                {detailLabels.ocr}:
              </p>
              <div className="flex flex-wrap gap-2">
                {normalized_codes.map((code, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-500 rounded">
                    {formatCode(code)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Diferencias */}
          {(missingEntries.length > 0 || extraEntries.length > 0) && (
            <div>
              <p className="font-semibold text-red-300 mb-1">{detailLabels.differences}:</p>
              <div className="flex flex-wrap gap-2">
                {missingEntries.map(([code, qty]) => (
                  <span key={`m-${code}`} className="px-2 py-1 bg-red-700 rounded">
                    Falta {qty} × {formatCode(code)}
                  </span>
                ))}
                {extraEntries.map(([code, qty]) => (
                  <span key={`e-${code}`} className="px-2 py-1 bg-yellow-600 text-black rounded">
                    Sobra {qty} × {formatCode(code)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
