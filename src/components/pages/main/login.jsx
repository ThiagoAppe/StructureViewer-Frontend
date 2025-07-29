import React, { useState } from "react";
import { login } from "../../api/auth";

export default function Login({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const ok = await login(username, password);

      if (!ok) {
        setError("Usuario o contraseña incorrectos");
        return;
      }

      if (onSuccess) onSuccess();

    } catch (error) {
      setError("Error de conexión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-7xl font-bold text-center text-black">DZE</h1>
        <h3 className="text-center mb-6 text-gray opacity-50">Ingenieria</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">
            Usuario
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            required
          />
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
            required
          />
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-slate-700 text-white py-2 rounded-md hover:bg-white hover:text-black hover:outline-2 transition"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
