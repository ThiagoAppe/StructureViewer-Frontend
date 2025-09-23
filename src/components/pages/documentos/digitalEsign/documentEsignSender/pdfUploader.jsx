import React, { useState } from "react";
import { postFormData } from "../../../../api/request";

export default function PDFUploader({ onUploadSuccess }) {
    const [loading, setLoading] = useState(false);

    const HandleFileUpload = async (event) => {
        const files = [...event.target.files];
        if (!files.length) return;

        // Validación: solo PDFs
        const invalidFiles = files.filter((f) => f.type !== "application/pdf");
        if (invalidFiles.length > 0) {
            alert("Solo se permiten archivos PDF.");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        files.forEach((file) => formData.append("file", file));

        try {
            // URL completa del backend
            const response = await postFormData(
                "/Documents/DocumentHandler",
                formData
            );

            // Backend devuelve fileinfo, lo ponemos en un array
            if (response.status === "ok" && response.fileinfo) {
                onUploadSuccess([response.fileinfo]);
            } else {
                alert("Error inesperado: no se recibió información del archivo.");
            }
        } catch (error) {
            console.error("Error al subir archivos:", error);
            alert("Ocurrió un error al subir los archivos. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-4 w-[90%] flex flex-col items-center">
            <p className="text-lg font-semibold mb-2">Paso 1: Selecciona el archivo(s) a firmar</p>
            <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center w-full">
                <h4 className="mb-2">Arrastra y suelta archivos o haz clic en el botón abajo</h4>
                <label className="inline-block mb-2 bg-gray-200 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-300">
                    {loading ? "Subiendo archivos..." : "Elegir archivo(s)"}
                    <input
                        type="file"
                        multiple
                        accept=".pdf"
                        className="hidden"
                        onChange={HandleFileUpload}
                        disabled={loading}
                    />
                </label>
                {loading ? (
                    <p>Subiendo archivos, por favor espera...</p>
                ) : (
                    <p>Ningún archivo seleccionado</p>
                )}
            </div>
        </div>
    );
}
