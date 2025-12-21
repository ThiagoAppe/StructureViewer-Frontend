import React, { useState } from 'react';
import { postFormData } from '../../../api/request';
import GenericUploader from '../../../common/genericUploader';

const AnalyzeUploader = ({ OnConfirm }) => {
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleFileSelected = async (files) => {
        if (!files.length) return;

        const file = files[0]; 

        if (file.type !== "application/pdf") {
            alert("Solo se permiten archivos PDF.");
            return;
        }

        const structureCode = prompt("Ingrese el código de la estructura a comparar:");
        if (!structureCode) {
            alert("Debes ingresar un código de estructura válido para continuar.");
            return;
        }

        setLoading(true);
        setFileName(file.name);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const data = await postFormData("/documents/document-handler", formData);
            
            const fileUuid = data.fileinfo.uuid;
            const originalFileName = data.fileinfo.file_name;

            OnConfirm(file, originalFileName, fileUuid, structureCode);

        } catch (error) {
            console.error("Error al subir:", error);
            alert("Error al subir el archivo al servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-4 max-w-lg flex flex-col items-center mx-auto">
            <p className="text-lg font-semibold mb-2">Paso 1: Selecciona el archivo a Analizar</p>
            <GenericUploader
                onFilesSelected={handleFileSelected}
                accept=".pdf"
                multiple={false}
                disabled={loading}
                className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center w-full"
            >
                <h4 className="mb-2">Arrastra y suelta un archivo o haz clic en el botón abajo</h4>
                <label htmlFor="file-uploader-input" className="text-black inline-block mb-2 bg-gray-200 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-300">
                    {loading ? "Subiendo archivo..." : "Elegir archivo"}
                </label>
                {loading ? (
                    <p>Subiendo {fileName}, por favor espera...</p>
                ) : (
                    <p>{fileName || 'Ningún archivo seleccionado'}</p>
                )}
            </GenericUploader>
        </div>
    );
};

export default AnalyzeUploader;
