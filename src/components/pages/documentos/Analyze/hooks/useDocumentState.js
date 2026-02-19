import { useState } from 'react';

/**
 * Hook genérico para manejar el estado de documentos
 * @returns {Object} Estado y funciones para manejar documentos
 */
export const useDocumentState = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileUuid, setFileUuid] = useState(null);
  const [metadata, setMetadata] = useState({});

  const updateDocument = (newFile, newFileName, newFileUuid, newMetadata = {}) => {
    setFile(newFile);
    setFileName(newFileName);
    setFileUuid(newFileUuid);
    setMetadata(newMetadata);
  };

  const resetDocument = () => {
    setFile(null);
    setFileName(null);
    setFileUuid(null);
    setMetadata({});
  };

  const updateMetadata = (key, value) => {
    setMetadata(prev => ({ ...prev, [key]: value }));
  };

  return {
    file,
    fileName,
    fileUuid,
    metadata,
    updateDocument,
    resetDocument,
    updateMetadata,
    hasDocument: !!file,
  };
};
