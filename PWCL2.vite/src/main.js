
import './style.css';

import {
  obtenerCocktails,
  obtenerCategorias,
  obtenerCocktailsCategoria,
  obtenerDetalleCocktail,
  obtenerCocktailAleatorio
} from './api.js';

import {
  obtenerCategoriasValidas,
  ordenarCocktails,
  contarCocktailsPorCategoria,
  obtenerMensajeResultados,
  obtenerMensajeCategoria,
  obtenerMensajeError
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

const inputBusqueda = document.querySelector('#selecCocktail');
const botonBuscar = document.querySelector('#buscarCocktail');
const botonAleatorio = document.querySelector('#cocktailAleatorio');
const selectorCategorias = document.querySelector('#selectorCategorias');
const estadoCategorias = document.querySelector('#estadoCategorias');
const botonReintentar = document.querySelector('#reintentarCategorias');
const resultados = document.querySelector('#resultados');

let cocktailsActuales = [];
let incluirRecuentoActual = true;
let numeroPeticionResultados = 0;


function mostrarError(error) {
  console.error(error);
  mostrarEstadoPrograma(obtenerMensajeError(error));
}


function mostrarListaCocktails(cocktails, mensaje, incluirRecuento = true) {
  cocktailsActuales = cocktails;
  incluirRecuentoActual = incluirRecuento;

  mostrarEstadoPrograma(mensaje);
  mostrarCocktails(cocktails);

  if (incluirRecuento && cocktails.length > 0) {
    const recuento = contarCocktailsPorCategoria(cocktails);
    mostrarRecuentoCategorias(recuento);
  }
}


function desactivarControlesResultados() {
  botonBuscar.disabled = true;
  botonAleatorio.disabled = true;
  selectorCategorias.disabled = true;
}


function activarControlesResultados() {
  botonBuscar.disabled = false;
  botonAleatorio.disabled = false;
  selectorCategorias.disabled = false;
}


async function cargarCategorias() {
  estadoCategorias.textContent = 'Cargando categorias...';
  botonReintentar.hidden = true;
  botonReintentar.disabled = true;

  try {
    const respuesta = await obtenerCategorias();
    const categorias = obtenerCategoriasValidas(respuesta.drinks);

    mostrarCategorias(categorias);
    estadoCategorias.textContent = '';
  } catch (error) {
    console.error(error);
    estadoCategorias.textContent = obtenerMensajeError(error);
    botonReintentar.hidden = false;
  } finally {
    botonReintentar.disabled = false;
  }
}


async function buscarCocktails() {
  const nombre = inputBusqueda.value.trim();

  if (!nombre) {
    mostrarEstadoPrograma('Escribe el nombre de un coctel para buscar');
    limpiarResultados();
    return;
  }

  const miPeticion = ++numeroPeticionResultados;

  desactivarControlesResultados();
  mostrarCarga('Buscando cocteles...');
  limpiarResultados();

  try {
    const respuesta = await obtenerCocktails(nombre);

    if (miPeticion !== numeroPeticionResultados) {
      return;
    }

    const cocktails = ordenarCocktails(respuesta.drinks || []);
    const mensaje = obtenerMensajeResultados(cocktails.length, nombre);

    mostrarListaCocktails(cocktails, mensaje, true);
  } catch (error) {
    if (miPeticion === numeroPeticionResultados) {
      mostrarError(error);
      limpiarResultados();
    }
  } finally {
    if (miPeticion === numeroPeticionResultados) {
      activarControlesResultados();
    }
  }
}


async function filtrarPorCategoria() {
  const categoria = selectorCategorias.value;

  if (!categoria) {
    mostrarEstadoPrograma('Selecciona una categoria para filtrar');
    limpiarResultados();
    return;
  }

  const miPeticion = ++numeroPeticionResultados;

  desactivarControlesResultados();
  mostrarCarga('Buscando cocteles de esta categoria...');
  limpiarResultados();

  try {
    const respuesta = await obtenerCocktailsCategoria(categoria);

    if (miPeticion !== numeroPeticionResultados) {
      return;
    }

    const cocktails = ordenarCocktails(respuesta.drinks || []);
    const mensaje = obtenerMensajeCategoria(categoria, cocktails.length);

    mostrarListaCocktails(cocktails, mensaje, false);
  } catch (error) {
    if (miPeticion === numeroPeticionResultados) {
      mostrarError(error);
      limpiarResultados();
    }
  } finally {
    if (miPeticion === numeroPeticionResultados) {
      activarControlesResultados();
    }
  }
}


async function verDetalleCocktail(id) {
  const miPeticion = ++numeroPeticionResultados;

  desactivarControlesResultados();
  mostrarCarga('Cargando receta...');
  limpiarResultados();

  try {
    const respuesta = await obtenerDetalleCocktail(id);

    if (miPeticion !== numeroPeticionResultados) {
      return;
    }

    const cocktail = respuesta.drinks?.[0];

    if (!cocktail) {
      mostrarEstadoPrograma('No se ha encontrado la receta de este coctel');
      return;
    }

    mostrarEstadoPrograma('Detalle del coctel');
    mostrarDetalleCocktail(cocktail);
  } catch (error) {
    if (miPeticion === numeroPeticionResultados) {
      mostrarError(error);
      limpiarResultados();
    }
  } finally {
    if (miPeticion === numeroPeticionResultados) {
      activarControlesResultados();
    }
  }
}


async function buscarCocktailAleatorio() {
  const miPeticion = ++numeroPeticionResultados;

  desactivarControlesResultados();
  mostrarCarga('Buscando una sorpresa...');
  limpiarResultados();

  try {
    const respuesta = await obtenerCocktailAleatorio();

    if (miPeticion !== numeroPeticionResultados) {
      return;
    }

    const cocktail = respuesta.drinks?.[0];

    if (!cocktail) {
      mostrarEstadoPrograma('No se ha encontrado ningún coctel');
      return;
    }

    mostrarListaCocktails([cocktail], '¡Aquí tienes un coctel sorpresa!', false);
  } catch (error) {
    if (miPeticion === numeroPeticionResultados) {
      mostrarError(error);
      limpiarResultados();
    }
  } finally {
    if (miPeticion === numeroPeticionResultados) {
      activarControlesResultados();
    }
  }
}


function volverAResultados() {
  mostrarListaCocktails(
    cocktailsActuales,
    'Estos son tus resultados.',
    incluirRecuentoActual
  );
}

botonBuscar.addEventListener('click', buscarCocktails);

inputBusqueda.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    buscarCocktails();
  }
});

selectorCategorias.addEventListener('change', () => {
  if (selectorCategorias.value) {
    filtrarPorCategoria();
  }
});

botonAleatorio.addEventListener('click', buscarCocktailAleatorio);
botonReintentar.addEventListener('click', cargarCategorias);

resultados.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-action]');

  if (!boton) {
    return;
  }

  const accion = boton.dataset.action;

  if (accion === 'detalle') {
    verDetalleCocktail(boton.dataset.id);
  }

  if (accion === 'volver') {
    volverAResultados();
  }
});

cargarCategorias();
