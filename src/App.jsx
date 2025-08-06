import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './components/pages/main/login';
import MainFrame from './components/pages/main/home';
import NavBar from "./components/pages/main/navbar";
import { verificarToken } from './components/api/auth';
import Loading from './components/utils/loading';

import RenderizadorMain from "./components/pages/articulos/main.jsx";

import DocumentControlMain from "./components/pages/documentos/main.jsx";
import AnalyzeDocumentMain from "./components/pages/documentos/Analyze/main.jsx";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    verificarToken().then((autenticado) => {
      setIsAuthenticated(autenticado);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loading className="h-96 w-96" />;
  }

  if (!isAuthenticated) {
    return <Login onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-900">
        <NavBar />
        <div className="flex-1">
          <Routes>

            {/* Ruta principal */}
            <Route path="/" element={<MainFrame />} />

            {/* Ruta artículos */}
            <Route path="/articulos" element={<RenderizadorMain />} />

            {/* Ruta Documentos */}
            <Route path="/documentos" element={<DocumentControlMain />} />

            {/* Ruta Analizar Documento */}
            <Route path="/analyze" element={<AnalyzeDocumentMain />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>

  );
}
