import React, { useState } from "react";

export default function Report({ Result }) {
  const [ShowDetails, SetShowDetails] = useState(false);

  if (!Result || !Result.comparison_report) return null;

  const { comparison_report, normalized_codes, raw_codes } = Result;
  const { matched = [], missing_in_pdf = [], extra_in_pdf = [] } = comparison_report;

  // Determinar estado global
  let status = "✅ Todo coincide";
  let statusColor = "bg-green-600";
  if (missing_in_pdf.length > 0 && extra_in_pdf.length === 0) {
    status = "❌ Faltan códigos";
    statusColor = "bg-red-600";
  }
  if (extra_in_pdf.length > 0 && missing_in_pdf.length === 0) {
    status = "⚠️ Sobran códigos";
    statusColor = "bg-yellow-500 text-black";
  }
  if (missing_in_pdf.length > 0 && extra_in_pdf.length > 0) {
    status = "❌ Faltan y sobran códigos";
    statusColor = "bg-red-600";
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Resultado del Análisis</h2>

      {/* Estado global */}
      <div className={`inline-block px-4 py-2 rounded font-semibold ${statusColor}`}>
        {status}
      </div>

      {/* Resumen rápido */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p><strong>Total en estructura:</strong> {comparison_report.total_in_structure}</p>
          <p><strong>Total en PDF:</strong> {comparison_report.total_in_pdf}</p>
          <p><strong>Coinciden:</strong> {matched.length}</p>
        </div>
        <div>
          <p><strong>Faltantes:</strong> {missing_in_pdf.length}</p>
          <p><strong>Sobrantes:</strong> {extra_in_pdf.length}</p>
        </div>
      </div>

      {/* Bloques de códigos faltantes y sobrantes */}
      {missing_in_pdf.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold text-red-400 mb-1">Códigos faltantes:</p>
          <div className="flex flex-wrap gap-2">
            {missing_in_pdf.map(code => (
              <span key={code} className="px-2 py-1 bg-red-700 rounded">{code}</span>
            ))}
          </div>
        </div>
      )}

      {extra_in_pdf.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold text-yellow-300 mb-1">Códigos sobrantes:</p>
          <div className="flex flex-wrap gap-2">
            {extra_in_pdf.map(code => (
              <span key={code} className="px-2 py-1 bg-yellow-600 text-black rounded">{code}</span>
            ))}
          </div>
        </div>
      )}

      {/* Botón para ver info detallada */}
      <button
        onClick={() => SetShowDetails(!ShowDetails)}
        className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
      >
        {ShowDetails ? "Ocultar detalle" : "Ver detalle"}
      </button>

      {ShowDetails && (
        <div className="mt-4 bg-gray-700 p-4 rounded overflow-auto max-h-96 space-y-4">
          {/* Estructura original */}
          <div>
            <p className="font-semibold text-green-300 mb-1">📦 Estructura (lo que debería estar):</p>
            <div className="flex flex-wrap gap-2">
              {comparison_report.matched.concat(missing_in_pdf).map(code => (
                <span key={code} className="px-2 py-1 bg-green-600 rounded">{code}</span>
              ))}
            </div>
          </div>

          {/* Estructura plana OCR */}
          <div>
            <p className="font-semibold text-blue-300 mb-1">📝 Estructura plana (OCR normalizado):</p>
            <div className="flex flex-wrap gap-2">
              {normalized_codes.map((code, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-500 rounded">{code}</span>
              ))}
            </div>
          </div>

          {/* Diferencias */}
          <div>
            <p className="font-semibold text-red-300 mb-1">⚠️ Diferencias:</p>
            <div className="flex flex-wrap gap-2">
              {missing_in_pdf.map(code => (
                <span key={`m-${code}`} className="px-2 py-1 bg-red-700 rounded">Falta: {code}</span>
              ))}
              {extra_in_pdf.map(code => (
                <span key={`e-${code}`} className="px-2 py-1 bg-yellow-600 text-black rounded">Sobra: {code}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
