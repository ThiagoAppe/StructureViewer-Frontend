import { apiUrl } from "./config";

export async function verificarToken() {
  try {
    const res = await fetch(apiUrl("/users/me"), {
      method: "GET",
      credentials: "include",
    });

    return res.ok;
  } catch (e) {
    console.error("Error en verificarToken:", e);
    return false;
  }
}


export async function login(username, password) {
  try {
    const res = await fetch(apiUrl("/users/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
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

