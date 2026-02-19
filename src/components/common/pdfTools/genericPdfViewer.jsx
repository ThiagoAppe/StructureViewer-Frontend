import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

/**
 * Visor de PDF genérico y reutilizable
 * @param {File|string} file - Archivo PDF o URL
 * @param {number} pageNumber - Número de página a mostrar
 * @param {Function} onLoadSuccess - Callback cuando el PDF se carga exitosamente
 * @param {Object} config - Configuración adicional del visor
 */
const GenericPDFViewer = ({ 
  file, 
  pageNumber = 1, 
  onLoadSuccess,
  config = {}
}) => {
  const {
    renderAnnotationLayer = true,
    renderTextLayer = true,
    className = "pdf-page",
    width,
    height,
    scale,
  } = config;

  return (
    <Document 
      file={file} 
      onLoadSuccess={onLoadSuccess}
      loading={<div className="flex items-center justify-center p-4">Cargando PDF...</div>}
      error={<div className="flex items-center justify-center p-4 text-red-500">Error al cargar el PDF</div>}
      noData={<div className="flex items-center justify-center p-4">No hay PDF para mostrar</div>}
    >
      <Page
        pageNumber={pageNumber}
        className={className}
        renderAnnotationLayer={renderAnnotationLayer}
        renderTextLayer={renderTextLayer}
        width={width}
        height={height}
        scale={scale}
      />
    </Document>
  );
};

export default GenericPDFViewer;
