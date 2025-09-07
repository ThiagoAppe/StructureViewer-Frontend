import React from "react";
import { useNavigate } from "react-router-dom";

export default function DocumentDashboardMain() {
  const navigate = useNavigate();

  return (
    <div className="h-[calc(100vh-90px)] w-[calc(100%-2rem)] mx-auto bg-white text-black p-6 rounded-xl flex flex-col">
      
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Document Dashboard</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => navigate("/send-documents")}
        >
          Send Documents To Sign
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col gap-6 overflow-auto">
        <section className="w-full p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Recent Documents</h2>
          <p>No documents yet</p>
        </section>
        <section className="w-full p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <p>No categories yet</p>
        </section>
      </main>
      
    </div>
  );
}
