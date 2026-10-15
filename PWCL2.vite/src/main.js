
import './style.css';

import {
  buscarCocktailAPI,
  agregarOpcion,
  mostrarCocktailsCategoria,
  contarNumCocktails,
  contarNumCategorias
} from './counter.js';

const selecCocktail = document.getElementById('selecCocktail');
const buscarCocktail = document.getElementById('buscarCocktail');

function ejecutarBuscador() {
  const busqueda = selecCocktail.value.trim();

  document.getElementById('selectorCategorias').value = '';

  buscarCocktailAPI(busqueda);
}

buscarCocktail.addEventListener('click', ejecutarBuscador);

selecCocktail.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    ejecutarBuscador();
  }
});

document.getElementById('selectorCategorias').addEventListener('change', (evento) => {
  selecCocktail.value = '';
  mostrarCocktailsCategoria(evento.target.value);
});

async function iniciarApp() {
  await agregarOpcion();

  const cantidadCocktails = await contarNumCocktails();
  const cantidadCategorias = await contarNumCategorias();

  document.getElementById('selecCocktail').placeholder =
    `Escriba el nombre de uno de los ${cantidadCocktails} cocktails`;

  const selector = document.getElementById('selectorCategorias');

  if (selector.options.length > 0) {
    selector.options[0].textContent =
      `Elija una de las ${cantidadCategorias} categorías`;
  }
}

iniciarApp();
