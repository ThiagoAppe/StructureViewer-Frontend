import React, { useState } from "react";
import PDFUploader from "./uploader";
import PDFSelector from "./pdfSelector";

export default function AnalyzeDocumentMain() {
  const [PdfFile, SetPdfFile] = useState(null);
  const [ConfirmedFileName, SetConfirmedFileName] = useState(null);
  const [FileUuid, SetFileUuid] = useState(null);
  const [StructureCode, SetStructureCode] = useState(null);

  const HandleConfirm = (file, confirmedName, fileUuid, structureCode) => {
    SetPdfFile(file);
    SetConfirmedFileName(confirmedName);
    SetFileUuid(fileUuid);
    SetStructureCode(structureCode);
  };

  return (
    <div className="p-4 text-white bg-gray-900">
      <h1 className="text-2xl text-center font-bold mb-4">Analizar Documento</h1>

      {!PdfFile && <PDFUploader OnConfirm={HandleConfirm} />}

      {PdfFile && ConfirmedFileName && (
        <div className="mt-8 mx-auto rounded-xl shadow text-gray-800">
          <PDFSelector
            PdfFile={PdfFile}
            FileUuid={FileUuid}
            StructureCode={StructureCode}
            onReset={() => {
              SetPdfFile(null);
              SetConfirmedFileName(null);
              SetFileUuid(null);
              SetStructureCode(null);
            }}
          />
        </div>
      )}
    </div>
  );
}
