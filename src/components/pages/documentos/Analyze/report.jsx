import React, { useState } from "react";

export default function Report({ Result }) {
  const [ShowDetails, SetShowDetails] = useState(false);

  if (!Result || !Result.comparison_report) return null;

  const { comparison_report, normalized_codes } = Result;
  const {
    matched = {},
    missing_in_pdf = {},
    extra_in_pdf = {},
    total_in_structure,
    total_in_pdf,
  } = comparison_report;

  // Convertir los objetos en arrays [codigo, cantidad]
  const matchedEntries = Object.entries(matched);
  const missingEntries = Object.entries(missing_in_pdf);
  const extraEntries = Object.entries(extra_in_pdf);

  // Armar estructura completa esperada = matched + missing
  const expectedStructure = {
    ...matched,
    ...missing_in_pdf,
  };
  const expectedEntries = Object.entries(expectedStructure);

  // Estado global
  let status = "✅ Todo coincide";
  let statusColor = "bg-green-600";
  if (missingEntries.length > 0 && extraEntries.length === 0) {
    status = "❌ Faltan códigos";
    statusColor = "bg-red-600";
  } else if (extraEntries.length > 0 && missingEntries.length === 0) {
    status = "⚠️ Sobran códigos";
    statusColor = "bg-yellow-500 text-black";
  } else if (missingEntries.length > 0 && extraEntries.length > 0) {
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

      {/* Resumen */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p><strong>Total en estructura:</strong> {total_in_structure}</p>
          <p><strong>Total en PDF:</strong> {total_in_pdf}</p>
          <p><strong>Coinciden:</strong> {matchedEntries.length}</p>
        </div>
        <div>
          <p><strong>Faltantes:</strong> {missingEntries.length}</p>
          <p><strong>Sobrantes:</strong> {extraEntries.length}</p>
        </div>
      </div>

      {/* Faltantes */}
      {missingEntries.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold text-red-400 mb-1">Códigos faltantes:</p>
          <div className="flex flex-wrap gap-2">
            {missingEntries.map(([code, qty]) => (
              <span key={code} className="px-2 py-1 bg-red-700 rounded">
                {code} <span className="text-sm text-gray-300">(faltan {qty})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Sobrantes */}
      {extraEntries.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold text-yellow-300 mb-1">Códigos sobrantes:</p>
          <div className="flex flex-wrap gap-2">
            {extraEntries.map(([code, qty]) => (
              <span key={code} className="px-2 py-1 bg-yellow-600 text-black rounded">
                {code} <span className="text-sm">(sobran {qty})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Botón detalle */}
      <button
        onClick={() => SetShowDetails(!ShowDetails)}
        className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
      >
        {ShowDetails ? "Ocultar detalle" : "Ver detalle"}
      </button>

      {/* Detalle completo */}
      {ShowDetails && (
        <div className="mt-4 bg-gray-700 p-4 rounded overflow-auto max-h-[600px] space-y-6">
          {/* 1️⃣ Estructura esperada */}
          <div>
            <p className="font-semibold text-green-300 mb-1">
              📦 Estructura completa (lo que debería estar):
            </p>
            <div className="flex flex-wrap gap-2">
              {expectedEntries.map(([code, qty]) => (
                <span
                  key={code}
                  className={`px-2 py-1 rounded ${
                    matched[code]
                      ? "bg-green-600"
                      : "bg-red-700"
                  }`}
                >
                  {code} <span className="text-sm text-gray-300">(x{qty})</span>
                </span>
              ))}
            </div>
          </div>

          {/* 2️⃣ Estructura OCR */}
          <div>
            <p className="font-semibold text-blue-300 mb-1">
              📝 Estructura plana OCR (normalizada):
            </p>
            <div className="flex flex-wrap gap-2">
              {normalized_codes.map((code, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-500 rounded">
                  {code}
                </span>
              ))}
            </div>
          </div>

          {/* 3️⃣ Diferencias */}
          <div>
            <p className="font-semibold text-red-300 mb-1">⚠️ Detalle de diferencias:</p>
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
