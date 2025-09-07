const documentFunctionsList = [
  {
    title: "Analizar Documento",
    description:
      "Contrastar un documento específico contra la estructura de artículos y visualizar diferencias.",
    path: "/analyze",
    functions: [
      "Buscar artículo por código",
      "Comparar estructura del documento",
      "Visualizar diferencias",
    ],
    requiredPermissions: ["analyze_document"],
  },
  {
    title: "Dashboard",
    description:
      "Panel de gestión de documentos: ver, leer y contrastar documentos enviados o recibidos para firma.",
    path: "/dashboard",
    functions: [
      "Visualizar documentos enviados y recibidos",
      "Gestionar estados y seguimiento de firmas",
      "Corroborar documento contra estructuras",
    ],
    requiredPermissions: ["manage_documents"],
  },
  {
    title: "Solicitar Firma",
    description:
      "Interfaz para crear y gestionar solicitudes de firma de documentos.",
    path: "/request-signature",
    functions: [
      "Crear solicitud de firma",
      "Enviar documentos para firma",
      "Gestionar solicitudes pendientes",
    ],
    requiredPermissions: ["request_signature"],
  },
];

export default documentFunctionsList;
