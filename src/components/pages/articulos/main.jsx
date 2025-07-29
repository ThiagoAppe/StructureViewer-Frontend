import { useState } from "react";

import SidebarTools from "./sidebarTools";
import EstructuraRenderizer from "./renderizer";
import GetStructure from "./services/getStructure";

export default function RenderizadorMain() {
    const [ArticuloSeleccionado, SetArticuloSeleccionado] = useState(null);

    const [Codigo, SetCodigo] = useState("");

    const [CodigosComparar, SetCodigosComparar] = useState([]);

    const [loading, SetLoading] = useState(false);
    const [loadingComparar, SetLoadingComparar] = useState([]);

    // Estados de expansión
    const [expandedNodes, setExpandedNodes] = useState(new Set());
    const [ExpandedNodesComparar, setExpandedNodesComparar] = useState([]);

    // Nuevos estados para comparación global
    const [ComparacionResult, SetComparacionResult] = useState(null);
    const [loadingComparacion, SetLoadingComparacion] = useState(false);
    const [expandedNodesComparacion, setExpandedNodesComparacion] = useState(new Set());

    // ===============================
    // Búsqueda principal
    // ===============================
    const buscarEstructura = async () => {
        if (!Codigo.trim()) return;

        try {
            SetLoading(true);
            const data = await GetStructure(Codigo);
            if (data) {
                SetArticuloSeleccionado({
                    Codigo: Codigo,
                    Estructura: data,
                });

                // Reset expansión principal
                setExpandedNodes(new Set());
            } else {
                SetArticuloSeleccionado(null);
            }
        } catch (err) {
            console.error("Error al buscar estructura:", err);
            SetArticuloSeleccionado(null);
        } finally {
            SetLoading(false);
        }
    };

    // ===============================
    // Funciones para expansión principal
    // ===============================
    const toggleNode = (codigo) => {
        setExpandedNodes((prev) => {
            const nuevo = new Set(prev);
            if (nuevo.has(codigo)) nuevo.delete(codigo);
            else nuevo.add(codigo);
            return nuevo;
        });
    };

    const expandAll = () => {
        if (!ArticuloSeleccionado?.Estructura) return;

        const all = new Set();
        const collect = (nodo) => {
            all.add(nodo.codigo);
            nodo.hijos?.forEach(collect);
        };

        const estructura = ArticuloSeleccionado.Estructura;
        (Array.isArray(estructura) ? estructura : [estructura]).forEach(collect);

        setExpandedNodes(all);
    };

    const collapseAll = () => {
        setExpandedNodes(new Set());
    };

    // ===============================
    // Funciones para manejo de comparaciones
    // ===============================
    const buscarEstructuraComparar = async (idx) => {
        const nuevos = [...CodigosComparar];
        const codigo = nuevos[idx]?.Codigo?.trim() || "";

        if (!codigo) {
            nuevos[idx] = { Codigo: "", Estructura: null, Error: "Debe ingresar un código válido" };
            SetCodigosComparar(nuevos);
            return;
        }

        try {
            const nuevosLoading = [...loadingComparar];
            nuevosLoading[idx] = true;
            SetLoadingComparar(nuevosLoading);

            nuevos[idx] = { Codigo: codigo, Estructura: null, Error: "" };
            SetCodigosComparar(nuevos);

            const data = await GetStructure(codigo);

            if (data) {
                nuevos[idx] = { Codigo: codigo, Estructura: data, Error: "" };
                // Resetear los nodos expandidos de esa estructura
                setExpandedNodesComparar((prev) => {
                    const copia = [...prev];
                    copia[idx] = new Set();
                    return copia;
                });
            } else {
                nuevos[idx] = { Codigo: codigo, Estructura: null, Error: "No se encontró estructura" };
            }

            SetCodigosComparar(nuevos);
        } catch (error) {
            nuevos[idx] = {
                Codigo: codigo,
                Estructura: null,
                Error: error.message || "Error al buscar estructura",
            };
            SetCodigosComparar(nuevos);
        } finally {
            const nuevosLoading = [...loadingComparar];
            nuevosLoading[idx] = false;
            SetLoadingComparar(nuevosLoading);
        }
    };

    const toggleNodeComparar = (idx, codigo) => {
        setExpandedNodesComparar((prev) => {
            const copia = [...prev];
            if (!copia[idx]) copia[idx] = new Set();
            const nuevo = new Set(copia[idx]);
            if (nuevo.has(codigo)) nuevo.delete(codigo);
            else nuevo.add(codigo);
            copia[idx] = nuevo;
            return copia;
        });
    };

    const expandAllComparar = (idx) => {
        const estructura = CodigosComparar[idx]?.Estructura;
        if (!estructura) return;

        const all = new Set();
        const collect = (nodo) => {
            all.add(nodo.codigo);
            nodo.hijos?.forEach(collect);
        };

        (Array.isArray(estructura) ? estructura : [estructura]).forEach(collect);

        setExpandedNodesComparar((prev) => {
            const copia = [...prev];
            copia[idx] = all;
            return copia;
        });
    };

    const collapseAllComparar = (idx) => {
        setExpandedNodesComparar((prev) => {
            const copia = [...prev];
            copia[idx] = new Set();
            return copia;
        });
    };

    const eliminarComparar = (idx) => {
        const nuevos = [...CodigosComparar];
        nuevos.splice(idx, 1);
        SetCodigosComparar(nuevos);

        const nuevosLoading = [...loadingComparar];
        nuevosLoading.splice(idx, 1);
        SetLoadingComparar(nuevosLoading);

        const nuevosExpanded = [...ExpandedNodesComparar];
        nuevosExpanded.splice(idx, 1);
        setExpandedNodesComparar(nuevosExpanded);
    };

    const agregarComparar = () => {
        SetCodigosComparar([
            ...CodigosComparar,
            {
                Codigo: "",
                Estructura: null,
                Error: "",
            },
        ]);
        SetLoadingComparar([...loadingComparar, false]);
        setExpandedNodesComparar([...ExpandedNodesComparar, new Set()]);
    };

    // ===============================
    // Nueva función para analizar comparación
    // ===============================
    const AnalizarComparacion = async () => {
        // Cambiado: ahora validamos que haya código principal y al menos uno secundario
        if (!Codigo.trim() || CodigosComparar.length < 1) {
            alert("Debe ingresar un código principal y al menos un código secundario para comparar");
            return;
        }

        SetLoadingComparacion(true);

        try {
            // Incluimos primero el código principal y luego los secundarios
            const todosLosCodigos = [Codigo, ...CodigosComparar.map(c => c.Codigo)];

            const response = await fetch("http://localhost:8000/compare", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Codes: todosLosCodigos }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert("Error al comparar: " + (errorData.detail || "Error desconocido"));
                SetLoadingComparacion(false);
                return;
            }

            const data = await response.json();

            // Guardar resultado comparación para renderizar
            SetComparacionResult(data.report);

            // Reset nodos expandidos comparación
            setExpandedNodesComparacion(new Set());
        } catch (error) {
            alert("Error de comunicación con backend: " + error.message);
        } finally {
            SetLoadingComparacion(false);
        }
    };

    // ===============================
    // Render
    // ===============================
    return (
        <div className="flex">
            <div>
                {/* Barra lateral */}
                <SidebarTools
                    Codigo={Codigo}
                    SetCodigo={SetCodigo}
                    buscarEstructura={buscarEstructura}
                    expandAll={expandAll}
                    collapseAll={collapseAll}
                    CodigosComparar={CodigosComparar}
                    SetCodigosComparar={SetCodigosComparar}
                    buscarEstructuraComparar={buscarEstructuraComparar}
                    expandAllComparar={expandAllComparar}
                    collapseAllComparar={collapseAllComparar}
                    eliminarComparar={eliminarComparar}
                    agregarComparar={agregarComparar}
                    AnalizarComparacion={AnalizarComparacion}
                    loading={loading}
                    loadingComparar={loadingComparar}
                    loadingComparacion={loadingComparacion}
                />
            </div>

            <div className="flex h-full w-full mb-10 gap-5">
                {/* Estructura principal */}
                <div>
                    {ArticuloSeleccionado ? (
                        <EstructuraRenderizer
                            estructura={ArticuloSeleccionado.Estructura}
                            expandedNodes={expandedNodes}
                            toggleNode={toggleNode}
                        />
                    ) : (
                        <div className="text-gray-500">
                            Seleccione un articulo para comenzar
                        </div>
                    )}
                </div>

                {/* Estructuras secundarias */}
                {CodigosComparar.map((item, idx) => (
                    <div key={idx}>
                        {item.Estructura && (
                            <EstructuraRenderizer
                                estructura={item.Estructura}
                                expandedNodes={ExpandedNodesComparar[idx] || new Set()}
                                toggleNode={(codigo) => toggleNodeComparar(idx, codigo)}
                            />
                        )}
                    </div>
                ))}

                {/* Resultado comparación */}
                {ComparacionResult && (
                    <div className="border border-blue-500 p-4 rounded-md w-full">
                        <h2 className="font-bold mb-2 text-blue-700">Resultado Comparación</h2>
                        <EstructuraRenderizer
                            estructura={ComparacionResult}
                            expandedNodes={expandedNodesComparacion}
                            toggleNode={(codigo) => {
                                setExpandedNodesComparacion(prev => {
                                    const nuevo = new Set(prev);
                                    if (nuevo.has(codigo)) nuevo.delete(codigo);
                                    else nuevo.add(codigo);
                                    return nuevo;
                                });
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
