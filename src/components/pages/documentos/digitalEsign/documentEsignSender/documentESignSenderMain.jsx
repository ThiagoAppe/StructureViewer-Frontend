import React, { useState } from "react";
import PDFUploader from "./pdfUploader";
import SendDocumentsForm from "./sendDocumentForm";

export default function DocumentESignSenderMain() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);

    const HandleUploadSuccess = (files) => {
        setUploadedFiles(files);
        setIsUploaded(true);
    };

    return (
        <main className="h-full w-fit mx-auto bg-white p-4 rounded-xl flex flex-col overflow-auto">
            <div className="w-full px-6 mx-auto flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4">Enviar solicitud de firma</h1>

                {!isUploaded ? (
                    <PDFUploader onUploadSuccess={HandleUploadSuccess} />
                ) : (
                    <SendDocumentsForm uploadedFiles={uploadedFiles} />
                )}
            </div>
        </main>
    );
}
