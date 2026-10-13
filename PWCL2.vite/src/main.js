
import './style.css';
import { buscarRecetaAPI } from './counter.js';

const selecComida = document.getElementById('selecComida');
const buscarComida = document.getElementById('buscarComida');

function ejecutarBuscador() {
  console.log('Botón pulsado');

  const busqueda = selecComida.value.trim();
  console.log('Texto buscado:', busqueda);

  buscarRecetaAPI(busqueda);
}

buscarComida.addEventListener('click', ejecutarBuscador);

selecComida.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    ejecutarBuscador();
  }
});
