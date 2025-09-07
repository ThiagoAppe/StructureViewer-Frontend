import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from './components/pages/main/login';
import MainFrame from './components/pages/main/home';
import NavBar from "./components/pages/main/navbar";
import Loading from "./components/utils/loading.jsx";

import RenderizadorMain from "./components/pages/articulos/main.jsx";
import DocumentControlMain from "./components/pages/documentos/main.jsx";
import AnalyzeDocumentMain from "./components/pages/documentos/Analyze/main.jsx";
import DocumentDashboardMain from "./components/pages/documentos/digitalEsign/documentDashboardMain.jsx";
import SendDocumentsForm from "./components/pages/documentos/digitalEsign/sendDocumentForm.jsx";

import PrivateRoute from "./components/routes/privateRoute";
import RequirePermission from "./components/routes/requirePermission";
import { AuthProvider } from "./context/authContext";
import { useAuth } from "./context/authContext";

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login"];
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900">
        <Loading className="h-40 w-40" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      {!hideNavbarRoutes.includes(location.pathname) && <NavBar />}
      <div className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Private */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<MainFrame />} />

            {/* Articulos */}
            <Route element={<RequirePermission perm="view_articles" />}>
              <Route path="/articulos" element={<RenderizadorMain />} />
            </Route>

            {/* Documentos */}
            <Route element={<RequirePermission perm="view_documents" />}>
              <Route path="/documentos" element={<DocumentControlMain />} />
            </Route>

            {/* Dashboard */}
            <Route element={<RequirePermission perm="dashboard_document" />}>
              <Route path="/dashboard" element={<DocumentDashboardMain />} />
            </Route>

            {/* Enviar documentos */}
            <Route element={<RequirePermission perm="send_document"/>}>
              <Route path="/send-documents" element={<SendDocumentsForm />} />
            </Route>

            {/* Analyze */}
            <Route element={<RequirePermission perm="analyze_document" />}>
              <Route path="/analyze" element={<AnalyzeDocumentMain />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
