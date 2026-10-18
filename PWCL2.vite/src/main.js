
import './style.css';

import {
  obtenerCocktails,
  obtenerCategorias,
  obtenerCocktailsCategoria,
  obtenerDetalleCocktail
} from './api.js';

import {
  obtenerCategoriasValidas,
  obtenerMensajeResultados,
  obtenerMensajeCategoria,
  ordenarCocktails,
  contarCocktailsPorCategoria
} from './logic.js';

import {
  mostrarEstadoPrograma,
  mostrarCarga,
  limpiarResultados,
  mostrarCocktails,
  mostrarCategorias,
  mostrarRecuentoCategorias,
  mostrarDetalleCocktail
} from './render.js';

const inputCocktail = document.querySelector('#selecCocktail');
const botonBuscar = document.querySelector('#buscarCocktail');
const selectorCategorias = document.querySelector('#selectorCategorias');
const resultados = document.querySelector('#resultados');

let cocktailsActuales = [];

function mostrarError(error) {
  console.error('Error en la aplicación:', error);

  if (error.tipo === 'red') {
    mostrarEstadoPrograma(
      'No se ha podido conectar con el servidor. Comprueba tu conexión.'
    );
  } else if (error.tipo === 'http') {
    mostrarEstadoPrograma(
      'El servidor ha devuelto un error. Inténtalo más tarde.'
    );
  } else if (error.tipo === 'datos') {
    mostrarEstadoPrograma(
      'La respuesta recibida no tiene un formato válido.'
    );
  } else {
    mostrarEstadoPrograma(
      'Ha ocurrido un error. Inténtalo de nuevo.'
    );
  }
}

function mostrarListaCocktails(cocktails, mensaje) {
  cocktailsActuales = cocktails;

  mostrarEstadoPrograma(mensaje);
  mostrarCocktails(cocktails);

  const contador = contarCocktailsPorCategoria(cocktails);
  mostrarRecuentoCategorias(contador);
}

async function buscarCocktails() {
  const nombre = inputCocktail.value.trim();

  if (!nombre) {
    mostrarEstadoPrograma('Escribe el nombre de un cóctel.');
    limpiarResultados();
    return;
  }

  botonBuscar.disabled = true;
  selectorCategorias.disabled = true;

  mostrarCarga('Buscando cócteles…');
  limpiarResultados();

  try {
    const respuesta = await obtenerCocktails(nombre);
    const cocktails = respuesta.drinks || [];
    const cocktailsOrdenados = ordenarCocktails(cocktails);

    mostrarListaCocktails(
      cocktailsOrdenados,
      obtenerMensajeResultados(cocktailsOrdenados)
    );
  } catch (error) {
    limpiarResultados();
    mostrarError(error);
  } finally {
    botonBuscar.disabled = false;
    selectorCategorias.disabled = false;
  }
}

async function filtrarPorCategoria() {
  const categoria = selectorCategorias.value;

  if (!categoria) {
    mostrarEstadoPrograma('Selecciona una categoría.');
    limpiarResultados();
    return;
  }

  botonBuscar.disabled = true;
  selectorCategorias.disabled = true;

  mostrarCarga('Cargando cócteles…');
  limpiarResultados();

  try {
    const respuesta = await obtenerCocktailsCategoria(categoria);

    // La respuesta del filtro puede no incluir la categoría.
    const cocktails = (respuesta.drinks || []).map((cocktail) => ({
      ...cocktail,
      strCategory: categoria
    }));

    const cocktailsOrdenados = ordenarCocktails(cocktails);

    mostrarListaCocktails(
      cocktailsOrdenados,
      `${obtenerMensajeCategoria(categoria)}. ` +
      obtenerMensajeResultados(cocktailsOrdenados)
    );
  } catch (error) {
    limpiarResultados();
    mostrarError(error);
  } finally {
    botonBuscar.disabled = false;
    selectorCategorias.disabled = false;
  }
}

async function cargarCategorias() {
  selectorCategorias.disabled = true;

  mostrarCarga('Cargando categorías…');

  try {
    const respuesta = await obtenerCategorias();
    const categorias = obtenerCategoriasValidas(respuesta.drinks);

    mostrarCategorias(categorias);

    mostrarEstadoPrograma(
      'Busca un cóctel o selecciona una categoría.'
    );
  } catch (error) {
    mostrarError(error);
  } finally {
    selectorCategorias.disabled = false;
  }
}

async function verDetalleCocktail(id) {
  mostrarCarga('Cargando detalle del cóctel…');
  limpiarResultados();

  try {
    const respuesta = await obtenerDetalleCocktail(id);
    const cocktail = respuesta.drinks?.[0];

    if (!cocktail) {
      mostrarEstadoPrograma(
        'No se ha encontrado información para este cóctel.'
      );
      return;
    }

    mostrarEstadoPrograma('');
    mostrarDetalleCocktail(cocktail);
  } catch (error) {
    mostrarError(error);
  }
}

function volverAResultados() {
  mostrarListaCocktails(
    cocktailsActuales,
    obtenerMensajeResultados(cocktailsActuales)
  );
}

botonBuscar.addEventListener('click', buscarCocktails);

inputCocktail.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    buscarCocktails();
  }
});

selectorCategorias.addEventListener('change', filtrarPorCategoria);

resultados.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-action]');
  if (!boton) {
    return;
  }
  if (boton.dataset.action === 'detalle') {
    verDetalleCocktail(boton.dataset.id);
  }
  if (boton.dataset.action === 'volver') {
    volverAResultados();
  }
});

async function iniciarApp() {
  limpiarResultados();
  await cargarCategorias();
}

iniciarApp();
