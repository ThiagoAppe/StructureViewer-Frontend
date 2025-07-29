import React, { useState, useEffect } from "react";
import SidebarViewer from "./sidebarViewer";
import EstructuraRenderizer, { NodoBasico, NodoConDiferencias } from "./estructuraViewer";

export default function ViewerMain() {
  // Estado artículo principal
  const [codigo, setCodigo] = useState("");
  const [estructura, setEstructura] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState(new Set());

  // Sidebar visible único (cierra todo)
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Array de comparaciones { codigo, estructura, error, loading, expandedNodes }
  const [comparaciones, setComparaciones] = useState([]);

  // Estado para diferencias entre estructura principal y comparaciones
  const [diferenciasComparaciones, setDiferenciasComparaciones] = useState([]);

  // Buscar artículo principal
  async function buscarEstructura() {
    if (!codigo.trim()) {
      setError("⚠️ Ingresá un código de artículo.");
      setEstructura([]);
      return;
    }
    setLoading(true);
    setError("");
    setEstructura([]);
    try {
      const response = await fetch(`/api/estructura?codigo=${codigo}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setEstructura(data);
      setExpandedNodes(new Set());
    } catch (e) {
      setError(`❌ ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  // Buscar artículo para comparar en el índice idx
  async function buscarEstructuraComparar(idx) {
    const cod = comparaciones[idx]?.codigo || "";
    if (!cod.trim()) {
      const nuevos = [...comparaciones];
      nuevos[idx].error = "⚠️ Ingresá un código para comparar.";
      nuevos[idx].estructura = [];
      setComparaciones(nuevos);
      return;
    }

    const nuevos = [...comparaciones];
    nuevos[idx].loading = true;
    nuevos[idx].error = "";
    nuevos[idx].estructura = [];
    setComparaciones(nuevos);

    try {
      const response = await fetch(`/api/estructura?codigo=${cod}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      nuevos[idx].estructura = data;
      nuevos[idx].expandedNodes = new Set();
      nuevos[idx].loading = false;
      nuevos[idx].error = "";
      setComparaciones([...nuevos]);
    } catch (e) {
      nuevos[idx].error = `❌ ${e.message}`;
      nuevos[idx].loading = false;
      nuevos[idx].estructura = [];
      setComparaciones([...nuevos]);
    }
  }

  // Función para calcular diferencias entre dos estructuras (por código)
  function calcularDiferencias(estructura1, estructura2) {
    const codigos1 = new Set();
    const codigos2 = new Set();

    function colectarCodigos(nodos, set) {
      nodos.forEach((n) => {
        set.add(n.codigo);
        if (n.hijos?.length) colectarCodigos(n.hijos, set);
      });
    }

    colectarCodigos(estructura1, codigos1);
    colectarCodigos(estructura2, codigos2);

    const diferencias = [];

    codigos1.forEach((codigo) => {
      if (!codigos2.has(codigo)) {
        diferencias.push({ codigo, faltantes: ["comparacion"] });
      }
    });

    codigos2.forEach((codigo) => {
      if (!codigos1.has(codigo)) {
        diferencias.push({ codigo, faltantes: ["principal"] });
      }
    });

    return diferencias;
  }

  // Recalcular diferencias cada vez que cambian estructura o comparaciones
  useEffect(() => {
    const nuevasDiferencias = comparaciones.map((comp) =>
      calcularDiferencias(estructura, comp.estructura)
    );
    setDiferenciasComparaciones(nuevasDiferencias);
  }, [estructura, comparaciones]);

  // Expandir todo para comparación idx
  function expandAllComparar(idx) {
    const nuevos = [...comparaciones];
    const allIds = new Set();
    function collectIds(nodos, prefix = "node") {
      nodos.forEach((nodo, i) => {
        const id = `${prefix}-${i}`;
        allIds.add(id);
        if (nodo.hijos?.length > 0) collectIds(nodo.hijos, id);
      });
    }
    collectIds(nuevos[idx].estructura);
    nuevos[idx].expandedNodes = allIds;
    setComparaciones(nuevos);
  }

  // Colapsar todo para comparación idx
  function collapseAllComparar(idx) {
    const nuevos = [...comparaciones];
    nuevos[idx].expandedNodes = new Set();
    setComparaciones(nuevos);
  }

  // Eliminar comparación idx
  function eliminarComparar(idx) {
    const nuevos = [...comparaciones];
    nuevos.splice(idx, 1);
    setComparaciones(nuevos);
  }

  // Añadir nueva comparación vacía
  function agregarComparar() {
    setComparaciones([
      ...comparaciones,
      { codigo: "", estructura: [], error: "", loading: false, expandedNodes: new Set() },
    ]);
  }

  // Toggle expand node comparación idx
  function toggleNodeComparar(idx, id) {
    const nuevos = [...comparaciones];
    const expanded = nuevos[idx].expandedNodes;
    if (expanded.has(id)) expanded.delete(id);
    else expanded.add(id);
    nuevos[idx].expandedNodes = new Set(expanded);
    setComparaciones(nuevos);
  }

  return (
    <div className="relative flex self-start w-auto bg-slate-900 p-4 gap-6">
      {/* Botón para mostrar sidebar si está oculto */}
      <div className="absolute -top-4 left-4 z-20">
        {!sidebarVisible && (
          <button
            onClick={() => setSidebarVisible(true)}
            className="bg-blue-600 text-white p-2 rounded shadow hover:bg-blue-700 flex items-center justify-center"
            aria-label="Mostrar herramientas"
            title="Mostrar herramientas"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Sidebar único */}
      {sidebarVisible && (
        <SidebarViewer
          visible={sidebarVisible}
          setVisible={() => setSidebarVisible(false)}
          codigo={codigo}
          setCodigo={setCodigo}
          buscarEstructura={buscarEstructura}
          expandAll={() => {
            const allIds = new Set();
            function collectIds(nodos, prefix = "node") {
              nodos.forEach((nodo, idx) => {
                const id = `${prefix}-${idx}`;
                allIds.add(id);
                if (nodo.hijos?.length > 0) collectIds(nodo.hijos, id);
              });
            }
            collectIds(estructura);
            setExpandedNodes(allIds);
          }}
          collapseAll={() => setExpandedNodes(new Set())}
          codigosComparar={comparaciones}
          setCodigosComparar={setComparaciones}
          buscarEstructuraComparar={buscarEstructuraComparar}
          expandAllComparar={expandAllComparar}
          collapseAllComparar={collapseAllComparar}
          eliminarComparar={eliminarComparar}
          agregarComparar={agregarComparar}
          toggleNodeComparar={toggleNodeComparar}
        />
      )}

      {/* Mostrar estructura principal y comparaciones lado a lado */}
      <div className="flex flex-auto gap-6">
        {/* Árbol principal sin diferencias */}
        <EstructuraRenderizer
          estructura={estructura}
          loading={loading}
          error={error}
          expandedNodes={expandedNodes}
          toggleNode={(id) => {
            const newSet = new Set(expandedNodes);
            newSet.has(id) ? newSet.delete(id) : newSet.add(id);
            setExpandedNodes(newSet);
          }}
          NodoComponent={NodoBasico}
        />

        {/* Árboles para comparación con diferencias */}
        {comparaciones.map((comp, idx) => (
          <EstructuraRenderizer
            key={idx}
            estructura={comp.estructura}
            loading={comp.loading}
            error={comp.error}
            expandedNodes={comp.expandedNodes}
            toggleNode={(id) => toggleNodeComparar(idx, id)}
            diferencias={diferenciasComparaciones[idx]}
            NodoComponent={NodoConDiferencias}
          />
        ))}
      </div>
    </div>
  );
}
