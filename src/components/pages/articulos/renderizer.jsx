import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { NodoEstado } from './core/processor';

// ==========================================
// FUNCION AUXILIAR PARA DEFINIR CLASE SEGUN ESTADO
// ==========================================
function ClasePorEstado(estado) {
    switch (estado) {
        case NodoEstado?.Modificado: return 'bg-yellow-100 border-yellow-400';
        case NodoEstado?.Nuevo: return 'bg-green-100 border-green-400';
        case NodoEstado?.Eliminado: return 'bg-red-100 border-red-400';
        default: return 'bg-white border-gray-200';
    }
}

// ==========================================
// FUNCION AUXILIAR PARA EFECTO DE DIFERENCIA
// ==========================================
function EfectoDiferencia(estado) {
    // Devuelve clases extra si el nodo tiene cambios
    switch (estado) {
        case NodoEstado?.Modificado: return 'shadow-lg shadow-yellow-200';
        case NodoEstado?.Nuevo: return 'shadow-lg shadow-green-200';
        case NodoEstado?.Eliminado: return 'shadow-lg shadow-red-200';
        default: return '';
    }
}

// ==========================================
// COMPONENTE RECURSIVO PARA RENDERIZAR NODOS
// ==========================================
function Nodo({ nodo, expandedNodes, toggleNode }) {

    // Determinar si este nodo tiene hijos
    const tieneHijos = nodo.hijos && nodo.hijos.length > 0;

    // Ver si el nodo está expandido consultando el Set global
    const expandido = expandedNodes.has(nodo.codigo);

    const ToggleExpandido = () => {
        if (tieneHijos) {
            toggleNode(nodo.codigo);
        }
    };

    return (
        <div className="my-1">
            {/* Fondo y contenido del nodo */}
            <motion.div
                className={`inline-flex items-center whitespace-nowrap shadow-sm p-1 rounded-lg border cursor-pointer ${ClasePorEstado(
                    nodo.estado
                )} ${EfectoDiferencia(nodo.estado)}`}
                onClick={ToggleExpandido}
                // Animación para resaltar diferencias al aparecer
                initial={{ scale: nodo.estado ? 1.05 : 1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                {/* Flecha SVG solo si tiene hijos */}
                {tieneHijos && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 mr-2 text-blue-500 transform transition-transform duration-300 ${expandido ? "rotate-90" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                )}

                {/* Contenedor de los datos con separación */}
                <div className="flex items-center gap-x-4">
                    <span className="font-bold text-gray-900">{nodo.codigo}</span>
                    <span className="bg-slate-400 text-white font-semibold px-2 py-0.5 rounded-md">
                        {nodo.cantidad}
                    </span>
                    <span className="text-gray-900">{nodo.descripcion}</span>
                </div>
            </motion.div>

            {/* Renderizar hijos recursivamente solo si está expandido con animación */}
            <AnimatePresence initial={false}>
                {tieneHijos && expandido && (
                    <motion.div
                        className="ml-4 pl-2 border-l border-gray-300 mt-2 max-w-max"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {nodo.hijos.map((hijo, idx) => (
                            <Nodo
                                key={`${nodo.codigo}-${idx}`}
                                nodo={hijo}
                                expandedNodes={expandedNodes}
                                toggleNode={toggleNode}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function EstructuraRenderizer({ estructura, expandedNodes, toggleNode }) {
    // estructura puede ser un solo objeto o una lista
    const lista = Array.isArray(estructura) ? estructura : [estructura];

    return (
        <div className="text-md">
            {lista.map((nodo, idx) => (
                <Nodo
                    key={idx}
                    nodo={nodo}
                    expandedNodes={expandedNodes}
                    toggleNode={toggleNode}
                />
            ))}
        </div>
    );
}
