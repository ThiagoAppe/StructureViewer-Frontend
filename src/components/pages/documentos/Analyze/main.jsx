import React, { useState } from "react";
import PDFUploader from "./uploader";
import PDFSelector from "./pdfSelector";

export default function AnalyzeDocumentMain() {
  const [PdfFile, SetPdfFile] = useState(null);
  const [ConfirmedFilename, SetConfirmedFilename] = useState(null);
  const [FileUuid, SetFileUuid] = useState(null);

  const HandleConfirm = (file, confirmedName, fileUuid) => {
    SetPdfFile(file);
    SetConfirmedFilename(confirmedName);
    SetFileUuid(fileUuid);
  };

  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl text-center font-bold mb-4">Analizar Documento</h1>

      {!PdfFile && <PDFUploader OnConfirm={HandleConfirm} />}

      {PdfFile && ConfirmedFilename && (
        <div className="mt-8 mx-auto rounded-xl shadow text-gray-800">
          {/* Pasamos también el UUID a PDFSelector */}
          <PDFSelector
            PdfFile={PdfFile}
            FileUuid={FileUuid}
            onReset={() => {
              SetPdfFile(null);
              SetConfirmedFilename(null);
              SetFileUuid(null);
            }}
          />
        </div>
      )}
    </div>
  );
}

