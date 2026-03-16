const functionsList = [
  {
    "title": "Buscar Articulos",
    "description": "Explorá y consultá información de artículos existentes por código.",
    "path": "/articulos/buscar",
    "functions": [
      "Buscar artículos por código o descripción",
      "Visualizar datos básicos del artículo",
      "Comparar artículos entre sí"
    ],
    "requiredPermissions": ["view_articles"]
  },
  {
    "title": "Buscar Estructuras",
    "description": "Busqueda y gestión de estructuras asociadas a un artículo.",
    "path": "/articulos/estructura",
    "functions": [
      "Consultar estructuras de un artículo",
    ],
    "requiredPermissions": ["view_documents"]
  },
  {
    "title": "Comparacion de Estructuras",
    "description": "Comparar dos o más Estructuras.",
    "path": "/articulos/comparar-estructura",
    "functions": [
      "Seleccionar estructuras para comparar",
      "Visualizar diferencias entre estructuras",
      "Generar reporte de comparación"
    ],
    "requiredPermissions": ["upload_gerber"]
  }
];

export default functionsList;
