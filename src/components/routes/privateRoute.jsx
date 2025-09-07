import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Loading from "../utils/loading";

export default function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Loading className="h-96 w-96" />;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
