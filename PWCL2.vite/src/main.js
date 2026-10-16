import './style.css';

import {
  obtenerCocktails,
  obtenerCategorias,
  obtenerCocktailsCategoria
} from './api.js';

import {
  obtenerCategoriasValidas,
  obtenerMensajeResultados,
  obtenerMensajeCategoria,
  ordenarCocktails
} from './logic.js';

import {
  mostrarEstadoPrograma,
  limpiarResultados,
  mostrarCocktails,
  mostrarCategorias
} from './render.js';

const inputCocktail = document.querySelector('#selecCocktail');
const botonBuscar = document.querySelector('#buscarCocktail');
const selectorCategorias = document.querySelector('#selectorCategorias');

async function buscarCocktails() {
  const nombre = inputCocktail.value.trim();

  if (!nombre) {
    mostrarEstadoPrograma('Escribe el nombre de un coctel');
    limpiarResultados();
    return;
  }

  botonBuscar.disabled = true;
  selectorCategorias.disabled = true;
  mostrarEstadoPrograma('Buscando cocteles…');
  limpiarResultados();

  try {
    const respuesta = await obtenerCocktails(nombre);
    const cocktails = respuesta.drinks || [];
    const cocktailsOrdenados = ordenarCocktails(cocktails);

    mostrarEstadoPrograma(
      obtenerMensajeResultados(cocktailsOrdenados)
    );

    mostrarCocktails(cocktailsOrdenados);
  } catch (error) {
    console.error('Error al buscar cocteles:', error);

    mostrarEstadoPrograma(
      'No se han podido cargar los cocteles, intentalo de nuevo'
    );
  } finally {
    botonBuscar.disabled = false;
    selectorCategorias.disabled = false;
  }
}

async function filtrarPorCategoria() {
  const categoria = selectorCategorias.value;

  if (!categoria) {
    mostrarEstadoPrograma('Selecciona una categoria');
    limpiarResultados();
    return;
  }

  botonBuscar.disabled = true;
  selectorCategorias.disabled = true;
  mostrarEstadoPrograma('Cargando cocteles…');
  limpiarResultados();

  try {
    const respuesta = await obtenerCocktailsCategoria(categoria);
    const cocktails = respuesta.drinks || [];
    const cocktailsOrdenados = ordenarCocktails(cocktails);

    mostrarEstadoPrograma(
      `${obtenerMensajeCategoria(categoria)}. ` +
      obtenerMensajeResultados(cocktailsOrdenados)
    );

    mostrarCocktails(cocktailsOrdenados);
  } catch (error) {
    console.error('Error al filtrar por categoria:', error);

    mostrarEstadoPrograma(
      'No se han podido cargar los cocteles de esta categoria.'
    );
  } finally {
    botonBuscar.disabled = false;
    selectorCategorias.disabled = false;
  }
}

async function cargarCategorias() {
  selectorCategorias.disabled = true;
  mostrarEstadoPrograma('Cargando categorias…');

  try {
    const respuesta = await obtenerCategorias();
    const categorias = obtenerCategoriasValidas(respuesta.drinks);

    mostrarCategorias(categorias);
    mostrarEstadoPrograma('Busca un coctel o selecciona una categoria.');
  } catch (error) {
    console.error('Error al cargar categorias:', error);

    mostrarEstadoPrograma(
      'No se han podido cargar las categorias. Puedes intentar buscar un coctel.'
    );
  } finally {
    selectorCategorias.disabled = false;
  }
}

botonBuscar.addEventListener('click', buscarCocktails);

inputCocktail.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    buscarCocktails();
  }
});

selectorCategorias.addEventListener('change', filtrarPorCategoria);

async function iniciarApp() {
  limpiarResultados();
  await cargarCategorias();
}

iniciarApp();
