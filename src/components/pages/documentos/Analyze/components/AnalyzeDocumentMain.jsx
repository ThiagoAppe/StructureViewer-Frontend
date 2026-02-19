import React, { useState } from "react";
import { postFormData } from "../../../../api/request";
import { useDocumentState } from "../hooks/useDocumentState";
import GenericUploader from "../../../../common/pdfTools/genericPdfUploader";
import PDFSelector from "../pdfSelector/PDFSelector";

export default function AnalyzeDocumentMain() {
  const {
    file: pdfFile,
    fileName: confirmedFileName,
    fileUuid,
    metadata,
    updateDocument,
    resetDocument,
    hasDocument
  } = useDocumentState();

  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setFileName(file.name);

    try {
      const data = await postFormData(
        "/documents/document-handler",
        formData
      );

      updateDocument(
        file,
        data.fileinfo.file_name,
        data.fileinfo.uuid,
        data.fileinfo
      );

    } catch (error) {
      console.error("Error al subir:", error);
      alert("Error al subir el archivo al servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 text-white bg-gray-900">
      <h1 className="text-2xl text-center font-bold mb-4">
        Analizar Documento
      </h1>

      {!hasDocument && (
        <div className="mb-4 max-w-lg flex flex-col items-center mx-auto">
          <GenericUploader
            onFileSelected={handleUpload}
            disabled={loading}
            className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center w-full"
          >
            <h4 className="mb-2">
              Arrastra y suelta un PDF o haz clic abajo
            </h4>

            <label
              className="text-black inline-block mb-2 bg-gray-200 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-300"
            >
              {loading ? "Subiendo..." : "Elegir PDF"}
            </label>

            {loading
              ? <p>Subiendo {fileName}...</p>
              : <p>{fileName || "Ningún archivo seleccionado"}</p>
            }
          </GenericUploader>
        </div>
      )}

      {hasDocument && (
        <div className="mt-8 mx-auto rounded-xl shadow text-gray-800">
          <PDFSelector
            PdfFile={pdfFile}
            FileUuid={fileUuid}
            StructureCode={metadata.structureCode}
            onReset={resetDocument}
          />
        </div>
      )}
    </div>
  );
}
