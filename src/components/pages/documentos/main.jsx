import React from "react";
import { Link } from "react-router-dom";
import FunctionCard from "../../utils/Functions/FunctionCard.jsx";
import Loading from "../../utils/loading.jsx";
import documentFunctionsList from "./functionsList.jsx";
import { useAuth } from "../../../context/authContext";

const DocumentControlMain = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="flex-1 w-full px-4 py-6 flex justify-center items-center">
        <Loading className="h-40 w-40" />
      </main>
    );
  }

  const availableFunctions = documentFunctionsList.filter((func) =>
    func.requiredPermissions.every((perm) => user?.permissions?.includes(perm))
  );

  return (
    <main className="flex-1 w-full px-6 py-6 bg-slate-900">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableFunctions.map((category, index) => (
          <Link to={category.path} key={index} className="block">
            <FunctionCard
              title={category.title}
              description={category.description}
              functions={category.functions}
            />
          </Link>
        ))}

        {availableFunctions.length === 0 && (
          <div className="col-span-full text-center text-white">
            No tienes permisos para acceder a funcionalidades de documentos.
          </div>
        )}
      </div>
    </main>
  );
};

export default DocumentControlMain;
