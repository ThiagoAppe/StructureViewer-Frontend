import React, { useState } from 'react';

import { postFormData } from '../../../api/request';

const PDFUploader = ({ OnConfirm }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const HandleChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Por favor selecciona un archivo PDF válido.');
      setSelectedFile(null);
    }
  };

  const HandleConfirm = async () => {
    if (!selectedFile) {
      alert("Seleccioná un archivo antes de confirmar.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const data = await postFormData("/Documents/DocumentHandler", formData);

      const fileUuid = data.fileinfo.UUID;


      OnConfirm(selectedFile, data.fileinfo.FileName, fileUuid);

    } catch (error) {
      alert("Error al subir el archivo al servidor.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6">
        <div className='flex items-center'>
          <input
            type="file"
            accept="application/pdf"
            onChange={HandleChange}
            className="mb-auto flex-grow border rounded p-2 text-sm text-gray-700 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            style={{ height: '60px' }}
          />

          <button
            onClick={HandleConfirm}
            disabled={!selectedFile || loading}
            className="px-1 ml-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded disabled:opacity-50"
            style={{ height: '40px', minHeight: '40px' }}
          >
            {loading ? 'Subiendo...' : 'Confirmar'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default PDFUploader;
