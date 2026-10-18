const DURACION_CACHE = 30 * 60 * 1000;


export function obtenerCache(clave) {
  try {
    const valorGuardado = localStorage.getItem(clave);

    if (!valorGuardado) {
      return null;
    }

    const datosGuardados = JSON.parse(valorGuardado);

    if (
      !datosGuardados ||
      typeof datosGuardados.timestamp !== 'number' ||
      !datosGuardados.datos ||
      typeof datosGuardados.datos !== 'object' ||
      !('drinks' in datosGuardados.datos)
    ) {
      localStorage.removeItem(clave);
      return null;
    }

    const tiempoTranscurrido =
      Date.now() - datosGuardados.timestamp;

    if (
      tiempoTranscurrido < 0 ||
      tiempoTranscurrido >= DURACION_CACHE
    ) {
      localStorage.removeItem(clave);
      return null;
    }

    return datosGuardados.datos;
  } catch (error) {
    console.error('Error al leer la caché:', error);
    return null;
  }
}


export function guardarCache(clave, datos) {
  try {
    const datosGuardados = {
      timestamp: Date.now(),
      datos: datos
    };

    localStorage.setItem(
      clave,
      JSON.stringify(datosGuardados)
    );
  } catch (error) {
    console.error('Error al guardar la caché:', error);
  }
}
