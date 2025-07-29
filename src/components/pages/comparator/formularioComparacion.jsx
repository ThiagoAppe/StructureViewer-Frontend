import React, { useState } from "react";

export default function FormularioComparacion({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const codigos = input
      .split(",")
      .map((c) => c.trim().toUpperCase())
      .filter((c) => c.length > 0);

    if (codigos.length < 2) {
      alert("Debe ingresar al menos dos códigos para comparar.");
      return;
    }

    onSubmit(codigos);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ej: ART123, ART456"
        className="border px-2 py-1 rounded w-80"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
        Comparar
      </button>
    </form>
  );
}
