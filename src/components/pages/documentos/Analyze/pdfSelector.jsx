import React, { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { postFormData } from "../../../api/request";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFSelector = ({ PdfFile, onReset }) => {
    const [NumPages, SetNumPages] = useState(null);
    const [PageNumber, SetPageNumber] = useState(1);

    const [IsDrawing, SetIsDrawing] = useState(false);
    const [StartPoint, SetStartPoint] = useState(null);
    const [Rect, SetRect] = useState(null);
    const [NormalizedCoords, SetNormalizedCoords] = useState(null);

    const PdfWrapperRef = useRef(null);

    const OnLoadSuccess = ({ numPages }) => {
        SetNumPages(numPages);
        SetPageNumber(1);
        SetRect(null);
        SetNormalizedCoords(null);
    };

    const HandleMouseDown = (e) => {
        if (!PdfWrapperRef.current) return;
        const rect = PdfWrapperRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        SetStartPoint({ x, y });
        SetIsDrawing(true);
    };

    const HandleMouseMove = (e) => {
        if (!IsDrawing || !StartPoint || !PdfWrapperRef.current) return;
        const rect = PdfWrapperRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const width = x - StartPoint.x;
        const height = y - StartPoint.y;
        SetRect({ x: StartPoint.x, y: StartPoint.y, width, height });
    };

    const HandleMouseUp = () => {
        SetIsDrawing(false);
        if (Rect && PdfWrapperRef.current) {
            const container = PdfWrapperRef.current.getBoundingClientRect();
            const normX = Math.min(Rect.x, Rect.x + Rect.width) / container.width;
            const normY = Math.min(Rect.y, Rect.y + Rect.height) / container.height;
            const normWidth = Math.abs(Rect.width) / container.width;
            const normHeight = Math.abs(Rect.height) / container.height;

            const normalized = {
                x: normX,
                y: normY,
                width: normWidth,
                height: normHeight,
                page: PageNumber,
            };

            SetNormalizedCoords(normalized);
            console.log("Coordenadas normalizadas para backend:", normalized);
        }
    };


    const HandleSend = async () => {
        if (!NormalizedCoords || !PdfFile) {
            alert("Seleccioná una zona del PDF antes de enviar.");
            return;
        }

        const formData = new FormData();
        formData.append("file", PdfFile);
        formData.append("coords", JSON.stringify(NormalizedCoords));

        try {
            const result = await postFormData("/Documents/Analyze", formData);
            console.log("Respuesta del backend:", result);
        } catch (err) {
            alert("Error al enviar los datos al backend");
        }
    };


    return (
        <div className="flex flex-col items-center">
            {/* Barra de botones arriba */}
            <div className="flex items-center gap-4 mb-4">
                <button
                    onClick={() => SetPageNumber((prev) => Math.max(1, prev - 1))}
                    disabled={PageNumber === 1}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50"
                >
                    Anterior
                </button>

                <span className="text-gray-700 font-semibold">
                    Página {PageNumber} de {NumPages || "?"}
                </span>

                <button
                    onClick={() => SetPageNumber((prev) => Math.min(NumPages, prev + 1))}
                    disabled={PageNumber === NumPages}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50"
                >
                    Siguiente
                </button>

                <button
                    onClick={HandleSend}
                    className="ml-6 px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                >
                    Analizar
                </button>

                <button
                    onClick={() => {
                        if (onReset) onReset();
                    }}
                    className="ml-6 px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                    Cargar otro PDF
                </button>
            </div>

            <div
                ref={PdfWrapperRef}
                className="relative border shadow rounded overflow-hidden bg-gray-50 inline-block"
                onMouseDown={HandleMouseDown}
                onMouseMove={HandleMouseMove}
                onMouseUp={HandleMouseUp}
                style={{ cursor: IsDrawing ? "crosshair" : "default" }}
            >
                <Document file={PdfFile} onLoadSuccess={OnLoadSuccess}>
                    <Page
                        pageNumber={PageNumber}
                        className="pdf-page select-none"
                        renderAnnotationLayer
                        renderTextLayer
                    />
                </Document>

                {/* Rectángulo de selección */}
                {Rect && (
                    <div
                        className="absolute border-4 border-blue-500 bg-blue-300 bg-opacity-20 pointer-events-none"
                        style={{
                            left: `${Math.min(Rect.x, Rect.x + Rect.width)}px`,
                            top: `${Math.min(Rect.y, Rect.y + Rect.height)}px`,
                            width: `${Math.abs(Rect.width)}px`,
                            height: `${Math.abs(Rect.height)}px`,
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default PDFSelector;
