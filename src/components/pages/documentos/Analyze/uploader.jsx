import React from 'react';

const PDFUploader = ({ OnFileSelect }) => {
  const HandleChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      OnFileSelect(file);
    } else {
      alert('Por favor selecciona un archivo PDF válido.');
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Subir PDF</h2>

        <input
          type="file"
          accept="application/pdf"
          onChange={HandleChange}
          className="mb-4 w-full border rounded p-2 text-sm text-gray-700 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
    </div>
  );
};

export default PDFUploader;
