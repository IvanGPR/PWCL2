
const resultados = document.getElementById('resultados');
const titulo = document.getElementById('tituloCocktail');

export function mostrarEstadoPrograma(mensaje) {
  titulo.textContent = mensaje;
}

export function limpiarResultados() {
  resultados.replaceChildren();
}

function crearTarjeta(cocktail, mostrarCategoria = false) {
  const tarjeta = document.createElement('article');
  tarjeta.className = 'tarjeta-cocktail';

  const imagen = document.createElement('img');
  imagen.src = cocktail.strDrinkThumb || '';
  imagen.alt = cocktail.strDrink || 'Cocktail';
  imagen.loading = 'lazy';

  const nombre = document.createElement('h3');
  nombre.textContent = cocktail.strDrink || 'Nombre no disponible';

  tarjeta.append(imagen, nombre);

  if (mostrarCategoria) {
    const categoria = document.createElement('p');
    categoria.textContent =
      cocktail.strCategory || 'Categoría no disponible';

    tarjeta.appendChild(categoria);
  }

  if (cocktail.idDrink) {
    const enlace = document.createElement('a');

    enlace.href =
      `https://www.thecocktaildb.com/drink.php?c=${cocktail.idDrink}`;

    enlace.target = '_blank';
    enlace.rel = 'noopener noreferrer';
    enlace.textContent = 'Ver cocktail';

    tarjeta.appendChild(enlace);
  }

  return tarjeta;
}

export function mostrarCocktails(cocktails, opciones = {}) {
  limpiarResultados();

  const { mostrarCategoria = false } = opciones;

  const tarjetas = cocktails.map(cocktail =>
    crearTarjeta(cocktail, mostrarCategoria)
  );

  resultados.append(...tarjetas);
}
