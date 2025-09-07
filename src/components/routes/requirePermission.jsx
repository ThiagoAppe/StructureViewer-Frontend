import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function RequirePermission({ perm }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (!user.permissions?.includes(perm)) {
    return (<div>
      <h1 className="text-red-500 text-center mt-10">Contacte a Soporte</h1>;
      <h2 className="text-red-500 text-center mt-10" >Cod. Error 2</h2>
    </div>)

  }

  return <Outlet />;
}
