import { useState, useEffect } from "react";

export const usePdfSelections = () => {
  const [SavedRectangles, SetSavedRectangles] = useState([]);
  const [ActiveRectangle, SetActiveRectangle] = useState(null);
  const [IsSelectionEnabled, SetIsSelectionEnabled] = useState(false);

  const StartNewSelection = () => {
    console.log("🟢 Nueva selección habilitada");
    SetActiveRectangle(null);
    SetIsSelectionEnabled(true);
  };

  const SetDraftAsActive = (rectangle) => {
    console.log("📥 SetDraftAsActive ejecutado con:", rectangle);
    SetActiveRectangle(rectangle);
    SetIsSelectionEnabled(false);
  };

  const ConfirmSelection = () => {
    console.log("🟢 Click en Añadir a la lista");
    console.log("ActiveRectangle actual:", ActiveRectangle);

    if (!ActiveRectangle) {
      console.log("⚠️ No hay selección activa");
      return;
    }

    SetSavedRectangles((prev) => {
      const updated = [...prev, ActiveRectangle];
      console.log("💾 Nueva lista:", updated);
      return updated;
    });

    SetActiveRectangle(null);
  };

  const RemoveRectangle = (id) => {
    console.log("🗑 Eliminando:", id);
    SetSavedRectangles((prev) => prev.filter((r) => r.id !== id));
  };

  const ClearRectangles = () => {
    console.log("🧹 Limpiando solo selección activa");

    SetActiveRectangle(null);
    SetDraftRect(null);
  };

  useEffect(() => {
    console.log("📦 SavedRectangles cambió:", SavedRectangles);
  }, [SavedRectangles]);

  return {
    SavedRectangles,
    ActiveRectangle,
    IsSelectionEnabled,
    StartNewSelection,
    SetDraftAsActive,
    ConfirmSelection,
    RemoveRectangle,
    ClearRectangles,
  };
};
