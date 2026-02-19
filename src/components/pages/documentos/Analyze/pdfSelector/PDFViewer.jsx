import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = ({ PdfFile, children }) => {
  const [NumPages, SetNumPages] = useState(null);
  const [PageNumber, SetPageNumber] = useState(1);

  const OnLoadSuccess = ({ numPages }) => {
    SetNumPages(numPages);
    SetPageNumber(1);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => SetPageNumber((prev) => Math.max(1, prev - 1))}
          disabled={PageNumber === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <span>
          Página {PageNumber} de {NumPages || "?"}
        </span>

        <button
          onClick={() =>
            SetPageNumber((prev) =>
              NumPages ? Math.min(NumPages, prev + 1) : prev
            )
          }
          disabled={PageNumber === NumPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      <div className="relative inline-block">
        <Document file={PdfFile} onLoadSuccess={OnLoadSuccess}>
          <Page
            pageNumber={PageNumber}
            renderAnnotationLayer
            renderTextLayer
          />
        </Document>

        {children &&
          React.cloneElement(children, {
            pageNumber: PageNumber,
          })}
      </div>
    </div>
  );
};

export default PDFViewer;
