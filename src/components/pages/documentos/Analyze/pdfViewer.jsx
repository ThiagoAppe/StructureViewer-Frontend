// PDFViewer.jsx
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = ({ PdfFile, PageNumber = 1, OnLoadSuccess }) => {
  return (
    <Document file={PdfFile} onLoadSuccess={OnLoadSuccess}>
      <Page
        pageNumber={PageNumber}
        className="pdf-page"
        renderAnnotationLayer
        renderTextLayer
      />
    </Document>
  );
};

export default PDFViewer;
