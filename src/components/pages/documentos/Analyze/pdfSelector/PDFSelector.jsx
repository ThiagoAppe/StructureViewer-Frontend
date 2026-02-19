import React, { useState, useEffect } from "react";
import PDFViewer from "./PDFViewer";
import PDFSelectionLayer from "./PDFSelectionLayer";
import AnalysisPanel from "./AnalysisPanel";
import { usePdfSelections } from "./usePdfSelections";

import { postFormData } from '../../../../api/request';

import Report from "../components/report";

const PDFSelector = ({ PdfFile, FileUuid, StructureCode, onReset }) => {
  const {
    SavedRectangles,
    ActiveRectangle,
    IsSelectionEnabled,
    StartNewSelection,
    SetDraftAsActive,
    ConfirmSelection,
    RemoveRectangle,
    ClearRectangles,
  } = usePdfSelections();

  useEffect(() => {
    console.log("🔎 ActiveRectangle desde PDFSelector:", ActiveRectangle);
  }, [ActiveRectangle]);


  const [pageNumber, setPageNumber] = useState(1);

  const handleAnalyze = async () => {
    if (!SavedRectangles.length || !FileUuid) {
      alert("Seleccioná al menos una zona del PDF antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("uuid", FileUuid);
    formData.append("coords", JSON.stringify(SavedRectangles));
    formData.append("codigo", structureCode);

    console.log("📦 Enviando:", {
      uuid: FileUuid,
      coords: SavedRectangles,
      codigo: structureCode,
    });

    try {
      const result = await postFormData("/documents/analyze", formData);
      console.log("✅ Resultado:", result);
      setAnalysisResult(result);

    } catch (err) {
      console.error(err);
      alert("Error al enviar");
    }
  };


  const [structureCode, setStructureCode] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);


  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-6">
        <div className="relative">
          <PDFViewer
            PdfFile={PdfFile}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />

          <PDFSelectionLayer
            pageNumber={pageNumber}
            ActiveRectangle={ActiveRectangle}
            IsSelectionEnabled={IsSelectionEnabled}
            onSelectionComplete={SetDraftAsActive}
          />
        </div>

        {!analysisResult ? (
          <AnalysisPanel
            rectangles={SavedRectangles}
            onClear={ClearRectangles}
            onReset={onReset}
            onNewSelection={StartNewSelection}
            onConfirmSelection={ConfirmSelection}
            hasActiveSelection={!!ActiveRectangle}
            onRemoveRectangle={RemoveRectangle}
            onAnalyze={handleAnalyze}
            structureCode={structureCode}
            onStructureCodeChange={setStructureCode}
          />
        ) : (
          <div className="w-1/3 border-l border-gray-700 pl-6 flex flex-col">
            <Report Result={analysisResult} />

            <button
              onClick={() => {
                setAnalysisResult(null);
                ClearRectangles();
                onReset();
              }}
              className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
            >
              Cargar otro PDF
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default PDFSelector;
