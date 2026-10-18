
import { obtenerCache, guardarCache } from './cache.js';

const URL_BASE = 'https://www.thecocktaildb.com/api/json/v1/1/';

async function consultarAPI(url, usarCache = true) {
  if (usarCache) {
    const datosGuardados = obtenerCache(url);

    if (datosGuardados !== null) {
      return datosGuardados;
    }
  }

  let respuesta;

  try {
    respuesta = await fetch(url);
  } catch (error) {
    const errorRed = new Error('No se ha podido conectar con el servidor');
    errorRed.tipo = 'red';
    throw errorRed;
  }

  if (!respuesta.ok) {
    const errorHTTP = new Error('La petición ha fallado');
    errorHTTP.tipo = 'http';
    throw errorHTTP;
  }

  let datos;

  try {
    datos = await respuesta.json();
  } catch (error) {
    const errorDatos = new Error('La respuesta no es un JSON valido');
    errorDatos.tipo = 'datos';
    throw errorDatos;
  }

  if (
    !datos ||
    typeof datos !== 'object' ||
    !('drinks' in datos) ||
    (datos.drinks !== null && !Array.isArray(datos.drinks))
  ) {
    const errorDatos = new Error('El formato de los datos no es valido');
    errorDatos.tipo = 'datos';
    throw errorDatos;
  }

  if (usarCache) {
    guardarCache(url, datos);
  }

  return datos;
}


export async function obtenerCocktails(nombre) {
  const url = `${URL_BASE}search.php?s=${encodeURIComponent(nombre)}`;
  return consultarAPI(url);
}


export async function obtenerCategorias() {
  const url = `${URL_BASE}list.php?c=list`;
  return consultarAPI(url);
}


export async function obtenerCocktailsCategoria(categoria) {
  const url = `${URL_BASE}filter.php?c=${encodeURIComponent(categoria)}`;
  return consultarAPI(url);
}


export async function obtenerDetalleCocktail(id) {
  const url = `${URL_BASE}lookup.php?i=${encodeURIComponent(id)}`;
  return consultarAPI(url);
}


export async function obtenerCocktailAleatorio() {
  const url = `${URL_BASE}random.php`;
  return consultarAPI(url, false);
}
