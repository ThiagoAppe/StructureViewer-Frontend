import React, { useState, useCallback } from 'react';

const GenericUploader = ({
  onFilesSelected,
  accept = '*',
  multiple = false,
  disabled = false,
  children,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    if (!disabled) {
      const files = Array.from(event.dataTransfer.files);
      if (files.length > 0) {
        onFilesSelected(files);
      }
    }
  }, [disabled, onFilesSelected]);

  return (
    <div
      className={`relative ${className}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-50 flex items-center justify-center rounded-lg">
          <p className="text-white font-bold">Suelta los archivos aquí</p>
        </div>
      )}
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
        id="file-uploader-input"
      />
      {children}
    </div>
  );
};

export default GenericUploader;
