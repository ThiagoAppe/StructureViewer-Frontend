// ==========================================
// FUNCION PARA COMPARAR DOS ESTRUCTURAS
// ==========================================
function CompararEstructuras(arboles) {
    // Por ahora asumimos que solo hay 2 estructuras
    const [estructuraA, estructuraB] = arboles;

    // Comparamos a nivel raíz (puede haber varios nodos raíz)
    return CompararListaNodos(estructuraA, estructuraB);
}

// ==========================================
// FUNCION RECURSIVA PARA LISTAS DE NODOS
// ==========================================
function CompararListaNodos(listaA, listaB) {
    const resultado = [];

    // Crear índice por código para acceso rápido
    const indexB = new Map(listaB.map(n => [n.Codigo, n]));

    // Procesar cada nodo en lista A
    for (const nodoA of listaA) {
        const nodoB = indexB.get(nodoA.Codigo);

        if (nodoB) {
            // El nodo existe en ambos
            indexB.delete(nodoA.Codigo);

            // Determinar estado
            let estado;
            if (nodoA.Cantidad === nodoB.Cantidad) {
                estado = NodoEstado.Igual;
            } else {
                estado = NodoEstado.Modificado;
            }

            // Comparar hijos recursivamente
            const hijosComparados = CompararListaNodos(nodoA.Hijos, nodoB.Hijos);

            resultado.push({
                ...nodoA,
                Estado: estado,
                Hijos: hijosComparados
            });
        } else {
            // Nodo solo existe en A → Nuevo
            resultado.push({
                ...nodoA,
                Estado: NodoEstado.Nuevo,
                Hijos: MarcarSubarbol(nodoA.Hijos, NodoEstado.Nuevo)
            });
        }
    }

    // Los que quedaron en indexB no fueron procesados → Eliminados
    for (const nodoB of indexB.values()) {
        resultado.push({
            ...nodoB,
            Estado: NodoEstado.Eliminado,
            Hijos: MarcarSubarbol(nodoB.Hijos, NodoEstado.Eliminado)
        });
    }

    return resultado;
}

// ==========================================
// FUNCION AUXILIAR PARA MARCAR SUBÁRBOLES COMPLETOS
// ==========================================
function MarcarSubarbol(lista, estado) {
    return lista.map(n => ({
        ...n,
        Estado: estado,
        Hijos: MarcarSubarbol(n.Hijos, estado)
    }));
}
