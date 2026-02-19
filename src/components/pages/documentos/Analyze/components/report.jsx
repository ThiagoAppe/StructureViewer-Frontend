import React, { useState, useMemo } from "react";

export default function Report({ Result }) {
  const [ShowDetails, SetShowDetails] = useState(false);

  if (!Result || !Result.comparison_report) return null;

  const { comparison_report, normalized_codes } = Result;
  const {
    matched = {},
    missing_in_pdf = {},
    extra_in_pdf = {},
    total_in_structure = 0,
    total_in_pdf = 0,
    success: reportSuccess = false,
  } = comparison_report;

  const matchedEntries = Object.entries(matched);
  const missingEntries = Object.entries(missing_in_pdf);
  const extraEntries = Object.entries(extra_in_pdf);

  const expectedStructure = {
    ...matched,
    ...missing_in_pdf,
  };
  const expectedEntries = Object.entries(expectedStructure);

  // 🔢 Cálculos reales
  const totalMatchedUnits = useMemo(
    () => matchedEntries.reduce((acc, [, qty]) => acc + qty, 0),
    [matchedEntries]
  );

  const matchPercentage = total_in_structure
    ? ((totalMatchedUnits / total_in_structure) * 100).toFixed(1)
    : 0;

  // 🎯 Estado visual
  let status = "✅ Todo coincide";
  let statusColor = "bg-green-600";

  if (!reportSuccess) {
    if (missingEntries.length > 0 && extraEntries.length > 0) {
      status = "❌ Faltan y sobran códigos";
      statusColor = "bg-red-600";
    } else if (missingEntries.length > 0) {
      status = "❌ Faltan códigos";
      statusColor = "bg-red-600";
    } else if (extraEntries.length > 0) {
      status = "⚠️ Sobran códigos";
      statusColor = "bg-yellow-500 text-black";
    }
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Resultado del Análisis</h2>

      <div className={`inline-block px-4 py-2 rounded font-semibold ${statusColor}`}>
        {status}
      </div>

      {/* 📊 Resumen técnico */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="space-y-1">
          <p><strong>Total esperado:</strong> {total_in_structure}</p>
          <p><strong>Total detectado:</strong> {total_in_pdf}</p>
          <p><strong>Coincidencias reales:</strong> {totalMatchedUnits}</p>
        </div>
        <div className="space-y-1">
          <p><strong>Faltantes:</strong> {missingEntries.length}</p>
          <p><strong>Sobrantes:</strong> {extraEntries.length}</p>
          <p><strong>Precisión:</strong> {matchPercentage}%</p>
        </div>
      </div>

      {/* ❌ Faltantes */}
      {missingEntries.length > 0 && (
        <div className="mt-6">
          <p className="font-semibold text-red-400 mb-2">
            Códigos faltantes
          </p>
          <div className="flex flex-wrap gap-2">
            {missingEntries.map(([code, qty]) => (
              <span key={code} className="px-2 py-1 bg-red-700 rounded">
                {code} <span className="text-sm text-gray-300">(faltan {qty})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ⚠️ Sobrantes */}
      {extraEntries.length > 0 && (
        <div className="mt-6">
          <p className="font-semibold text-yellow-300 mb-2">
            Códigos sobrantes
          </p>
          <div className="flex flex-wrap gap-2">
            {extraEntries.map(([code, qty]) => (
              <span key={code} className="px-2 py-1 bg-yellow-600 text-black rounded">
                {code} <span className="text-sm">(sobran {qty})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 🔍 Toggle detalle */}
      <button
        onClick={() => SetShowDetails(!ShowDetails)}
        className="mt-8 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
      >
        {ShowDetails ? "Ocultar detalle" : "Ver detalle"}
      </button>

      {ShowDetails && (
        <div className="mt-6 bg-gray-700 p-4 rounded overflow-auto max-h-[600px] space-y-6">

          {/* 📦 Estructura esperada */}
          <div>
            <p className="font-semibold text-green-300 mb-2">
              📦 Estructura esperada
            </p>
            <div className="flex flex-wrap gap-2">
              {expectedEntries.map(([code, qty]) => (
                <span
                  key={code}
                  className={`px-2 py-1 rounded ${
                    matched[code] ? "bg-green-600" : "bg-red-700"
                  }`}
                >
                  {code} <span className="text-sm text-gray-300">(x{qty})</span>
                </span>
              ))}
            </div>
          </div>

          {/* 📝 OCR normalizado */}
          <div>
            <p className="font-semibold text-blue-300 mb-2">
              📝 OCR normalizado
            </p>
            <div className="flex flex-wrap gap-2">
              {normalized_codes.map((code, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-500 rounded">
                  {code}
                </span>
              ))}
            </div>
          </div>

          {/* ⚠️ Diferencias */}
          <div>
            <p className="font-semibold text-red-300 mb-2">
              ⚠️ Diferencias
            </p>
            <div className="flex flex-wrap gap-2">
              {missingEntries.map(([code, qty]) => (
                <span key={`m-${code}`} className="px-2 py-1 bg-red-700 rounded">
                  Falta {qty} × {code}
                </span>
              ))}
              {extraEntries.map(([code, qty]) => (
                <span key={`e-${code}`} className="px-2 py-1 bg-yellow-600 text-black rounded">
                  Sobra {qty} × {code}
                </span>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
