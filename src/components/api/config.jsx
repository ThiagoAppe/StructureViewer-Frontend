export const API_BASE = "http://10.0.10.157:8000";

export function apiUrl(path) {
  return `${API_BASE}${path}`;
}
