import React, { useState } from "react";
import FormularioComparacion from "./formularioComparacion";
import EstructuraRenderizer from "../viewer/estructuraViewer";

export default function ComparadorMain() {
  const [estructuras, setEstructuras] = useState([]);
  const [diferencias, setDiferencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedNodesList, setExpandedNodesList] = useState([]);

  const CompararEstructuras = async (codigos) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/comparar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigos }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error al comparar");

      setEstructuras(data.estructuras);
      setDiferencias(data.diferencias || []);
      setExpandedNodesList(data.estructuras.map(() => new Set())); // uno por estructura
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleNode = (estructuraIdx, nodeId) => {
    setExpandedNodesList((prev) => {
      const newSets = [...prev];
      const setCopy = new Set(newSets[estructuraIdx]);
      setCopy.has(nodeId) ? setCopy.delete(nodeId) : setCopy.add(nodeId);
      newSets[estructuraIdx] = setCopy;
      return newSets;
    });
  };

  return (
    <div className="p-4">
      <FormularioComparacion onSubmit={CompararEstructuras} />
      {loading && <p className="text-gray-500 mt-4">Cargando...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="flex gap-6 mt-6">
        {estructuras.map((estructura, idx) => {
          const codigo = estructura.codigo || `estructura-${idx}`;
          return (
            <EstructuraRenderizer
              key={codigo} // mejor usar código único si está disponible
              estructura={estructura.estructura} // asegurate que sea la lista de nodos
              loading={false}
              error={null}
              expandedNodes={expandedNodesList[idx] || new Set()}
              toggleNode={(id) => toggleNode(idx, id)}
              diferencias={diferencias[idx] || []}  // aquí está el fix
              codigoActual={codigo}
            />
          );
        })}
      </div>
    </div>
  );
}
