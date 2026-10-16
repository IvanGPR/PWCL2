
import { obtenerCache, guardarCache } from './cache.js';

const URL_BASE =
  'https://www.thecocktaildb.com/api/json/v1/1/';

async function consultarAPI(url) {
  const datosCache = obtenerCache(url);

  if (datosCache !== null) {
    return datosCache;
  }

  try {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    guardarCache(url, datos);

    return datos;
  } catch (error) {
    console.error('Error al consultar la API:', error);
    throw error;
  }
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
