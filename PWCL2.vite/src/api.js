
import { 
  obtenerCache, 
  guardarCache 
} from './cache.js';

const URL_BASE =
  'https://www.thecocktaildb.com/api/json/v1/1/';

async function consultarAPI(url) {
  const datosCache = obtenerCache(url);

  if (datosCache !== null) {
    return datosCache;
  }

  let respuesta;

  try {
    respuesta = await fetch(url);
  } catch (error) {
    const errorRed = new Error(
      'No se ha podido conectar con el servidor.'
    );

    errorRed.tipo = 'red';
    throw errorRed;
  }

  if (!respuesta.ok) {
    const errorHTTP = new Error(
      `Error HTTP: ${respuesta.status}`
    );

    errorHTTP.tipo = 'http';
    throw errorHTTP;
  }

  let datos;

  try {
    datos = await respuesta.json();
  } catch (error) {
    const errorJSON = new Error(
      'La respuesta del servidor no es un JSON válido.'
    );

    errorJSON.tipo = 'datos';
    throw errorJSON;
  }

  if (
    !datos ||
    typeof datos !== 'object' ||
    !('drinks' in datos)
  ) {
    const errorDatos = new Error(
      'La respuesta del servidor no tiene el formato esperado.'
    );

    errorDatos.tipo = 'datos';
    throw errorDatos;
  }

  guardarCache(url, datos);

  return datos;
}


export async function obtenerCocktails(nombre) {
  const url =
    `${URL_BASE}search.php?s=${encodeURIComponent(nombre)}`;

  return consultarAPI(url);
}


export async function obtenerCategorias() {
  const url = `${URL_BASE}list.php?c=list`;

  return consultarAPI(url);
}


export async function obtenerCocktailsCategoria(categoria) {
  const url =
    `${URL_BASE}filter.php?c=${encodeURIComponent(categoria)}`;

  return consultarAPI(url);
}


export async function obtenerDetalleCocktail(id) {
  const url =
    `${URL_BASE}lookup.php?i=${encodeURIComponent(id)}`;

  return consultarAPI(url);
}
