
import { obtenerDeCache, guardarEnCache } from './cache.js';

const API_COCKTAILS =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const API_CATEGORIAS_LISTA =
  'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const API_CATEGORIAS_FILTRO =
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

async function consultarAPI(url) {
  const datosGuardados = obtenerDeCache(url);
  if (datosGuardados) {
    return datosGuardados;
  }
  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error(`Error HTTP: ${respuesta.status}`);
  }

  const datos = await respuesta.json();
  guardarEnCache(url, datos);

  return datos;
}

export async function obtenerCocktails(nombre) {
  const datos = await consultarAPI(
    `${API_COCKTAILS}${encodeURIComponent(nombre)}`
  );

  return datos.drinks || [];
}

export async function obtenerCategorias() {
  const datos = await consultarAPI(API_CATEGORIAS_LISTA);

  return datos.drinks || [];
}

export async function obtenerCocktailsCategoria(categoria) {
  const datos = await consultarAPI(
    `${API_CATEGORIAS_FILTRO}${encodeURIComponent(categoria)}`
  );

  return datos.drinks || [];
}
