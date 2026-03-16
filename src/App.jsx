import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from './components/pages/main/login';
import MainFrame from './components/pages/main/home';
import NavBar from "./components/pages/main/navbar";
import Loading from "./components/utils/loading.jsx";

import ArticlesMainframe from "./components/pages/articles/main/main.jsx";
import SearchMain from "./components/pages/articles/search/searchMain.jsx";
import StructureMain from "./components/pages/articles/structure/main.jsx";

import DocumentControlMain from "./components/pages/documentos/main.jsx";
import AnalyzeDocumentMain from "./components/pages/documentos/Analyze/main.jsx";
import DocumentDashboardMain from "./components/pages/documentos/digitalEsign/documentDashboardMain.jsx";
import DocumentESignSenderMain from "./components/pages/documentos/digitalEsign/documentEsignSender/documentESignSenderMain.jsx";
import NotificationsHome from "./components/pages/notifications/home.jsx";



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

            {/* ARTICULOS */}
            <Route element={<RequirePermission perm="view_articles" />}>
              <Route path="/articulos">
                <Route index element={<ArticlesMainframe />} />
                <Route path="buscar" element={<SearchMain />} />
                <Route path="estructura" element={<StructureMain />} />
              </Route>
            </Route>

            {/* DOCUMENTOS */}
            <Route path="/documentos">

              <Route element={<RequirePermission perm="view_documents" />}>
                <Route index element={<DocumentControlMain />} />
              </Route>

              <Route element={<RequirePermission perm="dashboard_document" />}>
                <Route path="dashboard" element={<DocumentDashboardMain />} />
              </Route>

              <Route element={<RequirePermission perm="send_document" />}>
                <Route path="send" element={<DocumentESignSenderMain />} />
              </Route>

              <Route element={<RequirePermission perm="analyze_document" />}>
                <Route path="analyze" element={<AnalyzeDocumentMain />} />
              </Route>

            </Route>

            {/* NOTIFICATIONS */}
            <Route element={<RequirePermission perm="view_notifications" />}>
              <Route path="/notifications" element={<NotificationsHome />} />
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
