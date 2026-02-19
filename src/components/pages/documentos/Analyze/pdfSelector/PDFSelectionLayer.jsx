import React, { useRef, useState, useEffect } from "react";

const PDFSelectionLayer = ({
  pageNumber,
  ActiveRectangle,
  IsSelectionEnabled,
  onSelectionComplete,
}) => {
  const WrapperRef = useRef(null);

  const isDrawingRef = useRef(false);
  const startPointRef = useRef(null);

  const [DraftRect, SetDraftRect] = useState(null);

  const HandleMouseDown = (e) => {
    if (!WrapperRef.current) return;

    if (!IsSelectionEnabled) {
      console.log("🚫 Intento de dibujar pero no está habilitado");
      return;
    }

    const rect = WrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    console.log("🟢 MouseDown en:", { x, y });

    startPointRef.current = { x, y };
    isDrawingRef.current = true;
  };

  const HandleMouseMove = (e) => {
    if (!isDrawingRef.current || !startPointRef.current || !WrapperRef.current)
      return;

    const rect = WrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    SetDraftRect({
      x: startPointRef.current.x,
      y: startPointRef.current.y,
      width: x - startPointRef.current.x,
      height: y - startPointRef.current.y,
    });
  };

  const HandleMouseUp = (e) => {
    if (!isDrawingRef.current || !startPointRef.current || !WrapperRef.current) {
      isDrawingRef.current = false;
      return;
    }

    const rect = WrapperRef.current.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    const normalized = {
      id: `${Date.now()}-${Math.random()}`,
      page: pageNumber,
      x: Math.min(startPointRef.current.x, endX) / rect.width,
      y: Math.min(startPointRef.current.y, endY) / rect.height,
      width: Math.abs(endX - startPointRef.current.x) / rect.width,
      height: Math.abs(endY - startPointRef.current.y) / rect.height,
    };

    console.log("🟡 MouseUp - Rectángulo normalizado:", normalized);

    if (normalized.width < 0.002 || normalized.height < 0.002) {
      console.log("⚠️ Rectángulo demasiado pequeño, ignorado");
      isDrawingRef.current = false;
      startPointRef.current = null;
      SetDraftRect(null);
      return;
    }

    console.log("📤 Ejecutando onSelectionComplete");

    onSelectionComplete(normalized);

    SetDraftRect(null);
    startPointRef.current = null;
    isDrawingRef.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", HandleMouseMove);
    window.addEventListener("mouseup", HandleMouseUp);

    return () => {
      window.removeEventListener("mousemove", HandleMouseMove);
      window.removeEventListener("mouseup", HandleMouseUp);
    };
  }, []);

  return (
    <div
      ref={WrapperRef}
      className="absolute inset-0 z-50"
      onMouseDown={HandleMouseDown}
      style={{ cursor: IsSelectionEnabled ? "crosshair" : "default" }}
    >
      {ActiveRectangle && ActiveRectangle.page === pageNumber && (
        <div
          className="absolute border-2 border-blue-500 bg-blue-300 bg-opacity-20"
          style={{
            left: `${ActiveRectangle.x * 100}%`,
            top: `${ActiveRectangle.y * 100}%`,
            width: `${ActiveRectangle.width * 100}%`,
            height: `${ActiveRectangle.height * 100}%`,
          }}
        />
      )}

      {DraftRect && (
        <div
          className="absolute border-2 border-red-500 bg-red-300 bg-opacity-20 pointer-events-none"
          style={{
            left: Math.min(DraftRect.x, DraftRect.x + DraftRect.width),
            top: Math.min(DraftRect.y, DraftRect.y + DraftRect.height),
            width: Math.abs(DraftRect.width),
            height: Math.abs(DraftRect.height),
          }}
        />
      )}
    </div>
  );
};

export default PDFSelectionLayer;
