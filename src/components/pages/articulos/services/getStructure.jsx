export default async function GetStructure(codigo) {
  try {
    const response = await fetch(`/api/estructura?codigo=${codigo}`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    console.error("Error en GetStructure:", err);
    return null;
  }
}
