import React, { useState } from "react";
import PDFUploader from "./uploader";
import PDFSelector from "./pdfSelector";

export default function AnalyzeDocumentMain() {
  const [PdfFile, SetPdfFile] = useState(null);

  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl text-center font-bold mb-4">Analizar Documento</h1>

      {!PdfFile && <PDFUploader OnFileSelect={SetPdfFile} />}

      {PdfFile && (
        <div className="mt-8 mx-auto rounded-xl shadow text-gray-800">
          <PDFSelector PdfFile={PdfFile} onReset={() => SetPdfFile(null)} />
        </div>
      )}
    </div>
  );
}
