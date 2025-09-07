const functionsList = [
  {
    title: "Artículos",
    description: "Explorá la estructura jerárquica de un artículo por código.",
    path: "/articulos",
    functions: [
      "Buscar Artículos",
      "Comparar Estructuras",
      "Visualizar Estructuras"
    ],
    requiredPermissions: ["view_articles"],
  },
  {
    title: "Control de Documentos",
    description: "Gestión de documentos y validación contra estructuras.",
    path: "/documentos",
    functions: [
      "Crear y modificar documentos",
      "Solicitar firmas de documentos",
      "Corroborar documento contra estructuras"
    ],
    requiredPermissions: ["view_documents"],
  },
  {
    title: "Control de Gerbers",
    description: "Gestión y validación de archivos Gerber",
    path: "/gerbers",
    functions: [
      "Carga y visualización de archivos Gerber",
      "Validación de panelización de plaquetas",
      "Control y gestión de estencils"
    ],
    requiredPermissions: ["upload_gerber"],
  },
];

export default functionsList;
