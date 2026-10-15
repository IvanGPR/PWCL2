
import './style.css';
import { 
  buscarRecetaAPI, 
  agregarOpcion, 
  mostrarPlatosCategoria, 
  contarNumDatos, 
  contarNumCategorias 
} from './counter.js';

const selecComida = document.getElementById('selecComida');
const buscarComida = document.getElementById('buscarComida');

function ejecutarBuscador() {
  const busqueda = selecComida.value.trim();
  document.getElementById('selectorCategorias').value = '';
  buscarRecetaAPI(busqueda);
}

buscarComida.addEventListener('click', ejecutarBuscador);

selecComida.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    ejecutarBuscador();
  }
});

document.getElementById('selectorCategorias').addEventListener('change', (evento) => {
  selecComida.value = '';
  mostrarPlatosCategoria(evento.target.value);
});

async function iniciarApp() {
  await agregarOpcion();

  // 2. Obtenemos contadores
  const cantidadRecetas = await contarNumDatos();
  const cantidadCategorias = await contarNumCategorias();

  document.getElementById('selecComida').placeholder = 
    `Escriba el nombre de una de las ${cantidadRecetas} recetas`;

  const selector = document.getElementById('selectorCategorias');
  if (selector.options.length > 0) {
    selector.options[0].textContent = `Elija una de las ${cantidadCategorias} categorías`;
  }
}

iniciarApp();