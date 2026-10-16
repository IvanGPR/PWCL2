export function obtenerDeCache(clave) {
  const datos = localStorage.getItem(clave);
  return datos ? JSON.parse(datos) : null;
}

export function guardarEnCache(clave, datos) {
  try {
    localStorage.setItem(clave, JSON.stringify(datos));
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
  }
}