import React, { useState, useCallback, useRef } from "react";

const GenericPdfUploader = ({
  onFileSelected,
  disabled = false,
  children,
  className = ""
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const isValidPdf = (file) => {
    return file && file.type === "application/pdf";
  };

  const processFile = (file) => {
    if (!file || disabled) return;

    if (!isValidPdf(file)) {
      alert("Solo se permiten archivos PDF.");
      return;
    }

    if (typeof onFileSelected === "function") {
      onFileSelected(file);
    }

    // Reset input para permitir seleccionar el mismo archivo otra vez
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    processFile(file);
  };

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (disabled) return;

      setIsDragging(false);

      const file = event.dataTransfer.files?.[0];
      processFile(file);
    },
    [disabled]
  );

  const openFileDialog = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      onClick={openFileDialog}
      onDragEnter={(e) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-50 flex items-center justify-center rounded-lg">
          <p className="text-white font-bold">
            Suelta el archivo PDF aquí
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />

      {children}
    </div>
  );
};

export default GenericPdfUploader;
