import { apiUrl } from "./config";

export async function verificarToken() {
  try {
    const res = await fetch(apiUrl("/users/me"), {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Error en verificarToken:", e);
    return null;
  }
}

export async function login(user_name, password) {
  try {
    const res = await fetch(apiUrl("/users/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ user_name, password }),
    });
    return res.ok;
  } catch (e) {
    console.error("Error en login:", e);
    return false;
  }
}

export async function logout() {
  try {
    const res = await fetch(apiUrl("/users/logout"), {
      method: "POST",
      credentials: "include",
    });

    return res.ok;
  } catch (e) {
    console.error("Error en logout:", e);
    return false;
  }
}
