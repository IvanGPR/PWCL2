
import './style.css';

import {
  obtenerCocktails,
  obtenerCategorias,
  obtenerCocktailsCategoria
} from './api.js';

import {
  obtenerCategoriasValidas,
  obtenerMensajeResultados,
  obtenerMensajeCategoria
} from './logic.js';

import {
  mostrarEstadoPrograma,
  limpiarResultados,
  mostrarCocktails
} from './render.js';

const selecCocktail = document.getElementById('selecCocktail');
const buscarCocktail = document.getElementById('buscarCocktail');
const selectorCategorias =
  document.getElementById('selectorCategorias');

async function ejecutarBuscador() {
  const nombre = selecCocktail.value.trim();

  selectorCategorias.value = '';
  limpiarResultados();

  if (!nombre) {
    mostrarEstadoPrograma('Escribe el nombre de un cocktail');
    return;
  }

  mostrarEstadoPrograma('Buscando cocktails...');

  try {
    const cocktails = await obtenerCocktails(nombre);

    if (cocktails.length === 0) {
      mostrarEstadoPrograma('No se encontraron cocktails');
      return;
    }

    mostrarEstadoPrograma(obtenerMensajeResultados(cocktails.length));

    mostrarCocktails(cocktails, {
      mostrarCategoria: true
    });
  } catch (error) {
    console.error('Error al consultar los cocktails:', error);
    mostrarEstadoPrograma('No se pudieron cargar los cocktails');
  }
}

async function ejecutarFiltroCategoria(categoria) {
  limpiarResultados();

  if (!categoria) {
    mostrarEstadoPrograma('Selecciona una categoría');
    return;
  }

  mostrarEstadoPrograma(`Cargando cocktails de ${categoria}...`);

  try {
    const cocktails = await obtenerCocktailsCategoria(categoria);

    mostrarEstadoPrograma(
      obtenerMensajeCategoria(categoria, cocktails.length)
    );

    mostrarCocktails(cocktails);
  } catch (error) {
    console.error('Error al cargar la categoría:', error);
    mostrarEstadoPrograma('No se pudieron cargar los cocktails');
  }
}

function agregarOpcion(valor, texto) {
  const opcion = document.createElement('option');

  opcion.value = valor;
  opcion.textContent = texto;

  selectorCategorias.appendChild(opcion);
}

async function iniciarApp() {
  selecCocktail.placeholder = 'Escriba el nombre de un cocktail';

  try {
    const datosCategorias = await obtenerCategorias();

    const categorias = obtenerCategoriasValidas(datosCategorias);

    selectorCategorias.replaceChildren();

    agregarOpcion('', 'Selecciona una categoría');

    categorias.forEach(categoria => {
      agregarOpcion(categoria, categoria);
    });

    selectorCategorias.options[0].textContent =
      `Elija una de las ${categorias.length} categorías`;
  } catch (error) {
    console.error('Error al cargar las categorías:', error);
    mostrarEstadoPrograma('No se pudieron cargar las categorías');
  }
}

buscarCocktail.addEventListener('click', ejecutarBuscador);

selecCocktail.addEventListener('keydown', evento => {
  if (evento.key === 'Enter') {
    ejecutarBuscador();
  }
});

selectorCategorias.addEventListener('change', evento => {
  selecCocktail.value = '';
  ejecutarFiltroCategoria(evento.target.value);
});

iniciarApp();
