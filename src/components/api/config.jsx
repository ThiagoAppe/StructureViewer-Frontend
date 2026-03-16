export const API_BASE = "/api";

export function apiUrl(path) {
  return `${API_BASE}${path}`;
}
