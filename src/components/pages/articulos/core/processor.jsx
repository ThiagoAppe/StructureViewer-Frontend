// core/processor.js

// Estados posibles de nodo
export const NodoEstado = {
  Normal: 'Normal',
  Igual: 'Igual',
  Modificado: 'Modificado',
  Nuevo: 'Nuevo',
  Eliminado: 'Eliminado',
};

// Crear nodo en formato interno con estado
export function CrearNodo({ codigo, cantidad, descripcion, nivel, hijos = [], estado = NodoEstado.Normal }) {
  return { codigo, cantidad, descripcion, nivel, hijos, estado };
}

// Normaliza estructura JSON a formato interno
export function Normalizar(json) {
  return json.map(item => CrearNodo({
    codigo: item.codigo,
    cantidad: item.cantidad,
    descripcion: item.descripcion,
    nivel: item.nivel,
    hijos: item.hijos ? Normalizar(item.hijos) : [],
  }));
}

// Marca todos los nodos y subnodos con un estado dado
export function MarcarSubarbol(lista, estado) {
  return lista.map(n => ({
    ...n,
    estado,
    hijos: MarcarSubarbol(n.hijos || [], estado)
  }));
}

// Compara recursivamente dos listas de nodos
export function CompararListaNodos(listaA, listaB) {
  const resultado = [];
  const indexB = new Map(listaB.map(n => [n.codigo, n]));

  for (const nodoA of listaA) {
    const nodoB = indexB.get(nodoA.codigo);
    if (nodoB) {
      indexB.delete(nodoA.codigo);

      // Estado igual o modificado según cantidad
      const estado = nodoA.cantidad === nodoB.cantidad ? NodoEstado.Igual : NodoEstado.Modificado;

      // Comparar hijos recursivamente
      const hijosComparados = CompararListaNodos(nodoA.hijos || [], nodoB.hijos || []);

      resultado.push({
        ...nodoA,
        estado,
        hijos: hijosComparados
      });
    } else {
      // Nodo solo en A = Nuevo
      resultado.push({
        ...nodoA,
        estado: NodoEstado.Nuevo,
        hijos: MarcarSubarbol(nodoA.hijos || [], NodoEstado.Nuevo)
      });
    }
  }

  // Nodos solo en B = Eliminados
  for (const nodoB of indexB.values()) {
    resultado.push({
      ...nodoB,
      estado: NodoEstado.Eliminado,
      hijos: MarcarSubarbol(nodoB.hijos || [], NodoEstado.Eliminado)
    });
  }

  return resultado;
}

// Compara N estructuras (por ahora solo dos soportadas)
export function CompararEstructuras(listaDeJson) {
  const arboles = listaDeJson.map(json => Normalizar(json));

  if (arboles.length < 2) return arboles[0] || [];

  // Por ahora comparamos sólo las dos primeras
  return CompararListaNodos(arboles[0], arboles[1]);
}
