
const API_COCKTAILS =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const API_CATEGORIAS_LISTA =
  'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const API_CATEGORIAS_FILTRO =
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export async function buscarCocktailAPI(nombre) {
  const tituloSelecCocktail = document.getElementById('tituloCocktail');
  const resultados = document.getElementById('resultados');

  if (!nombre) {
    tituloSelecCocktail.textContent = 'Escribe el nombre de un cocktail';
    resultados.replaceChildren();
    return;
  }

  tituloSelecCocktail.textContent = 'Buscando cocktails...';
  resultados.replaceChildren();

  try {
    const respuesta = await fetch(
      `${API_COCKTAILS}${encodeURIComponent(nombre)}`
    );

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    if (!datos.drinks) {
      tituloSelecCocktail.textContent = 'No se encontraron cocktails';
      return;
    }

    const cantidad = datos.drinks.length;

    tituloSelecCocktail.textContent =
      cantidad === 1
        ? 'Se encontró 1 cocktail'
        : `Se encontraron ${cantidad} cocktails`;

    datos.drinks.forEach((cocktail) => {
      const tarjeta = document.createElement('article');
      tarjeta.className = 'tarjeta-cocktail';

      const imagen = document.createElement('img');
      imagen.src = cocktail.strDrinkThumb;
      imagen.alt = cocktail.strDrink;
      imagen.loading = 'lazy';

      const nombreCocktail = document.createElement('h3');
      nombreCocktail.textContent = cocktail.strDrink;

      const categoria = document.createElement('p');
      categoria.textContent =
        cocktail.strCategory || 'Categoría no disponible';

      const enlace = document.createElement('a');
      enlace.href =
        `https://www.thecocktaildb.com/drink.php?c=${cocktail.idDrink}`;
      enlace.target = '_blank';
      enlace.rel = 'noopener noreferrer';
      enlace.textContent = 'Ver cocktail';

      tarjeta.append(imagen, nombreCocktail, categoria, enlace);
      resultados.appendChild(tarjeta);
    });

  } catch (error) {
    console.error('Error al consultar TheCocktailDB:', error);
    tituloSelecCocktail.textContent =
      'No se pudieron cargar los cocktails';
  }
}

export async function contarNumCocktails() {
  try {
    const respuesta = await fetch(API_COCKTAILS);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    return datos.drinks ? datos.drinks.length : 0;

  } catch (error) {
    console.error('Error al contar los cocktails:', error);
    return 0;
  }
}

export async function obtenerCategoriasValidas() {
  try {
    const respuesta = await fetch(API_CATEGORIAS_LISTA);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    const listaOriginal = datos.drinks || [];

    const nombresCategorias = listaOriginal.map(
      item => item.strCategory
    );

    const categoriasValidas = nombresCategorias.filter(
      categoria => categoria && categoria.trim() !== ''
    );

    return categoriasValidas;

  } catch (error) {
    console.error('Error al procesar las categorías:', error);
    return [];
  }
}

export async function contarNumCategorias() {
  const categorias = await obtenerCategoriasValidas();
  return categorias.length;
}

function generadorOpcion(valor, texto) {
  const opcion = document.createElement('option');

  opcion.value = valor;
  opcion.textContent = texto;

  document.getElementById('selectorCategorias').appendChild(opcion);
}

export async function agregarOpcion() {
  const selector = document.getElementById('selectorCategorias');

  const categorias = await obtenerCategoriasValidas();

  selector.replaceChildren();

  generadorOpcion('', 'Selecciona una categoría');

  categorias.forEach(categoria => {
    generadorOpcion(categoria, categoria);
  });
}

export async function mostrarCocktailsCategoria(categoria) {
  const resultados = document.getElementById('resultados');
  const tituloSelecCategoria = document.getElementById('tituloCocktail');

  if (!categoria) {
    tituloSelecCategoria.textContent = 'Selecciona una categoría';
    resultados.replaceChildren();
    return;
  }

  try {
    tituloSelecCategoria.textContent = `Cocktails de ${categoria}...`;
    resultados.replaceChildren();

    const respuesta = await fetch(
      `${API_CATEGORIAS_FILTRO}${encodeURIComponent(categoria)}`
    );

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    const cocktails = datos.drinks || [];

    tituloSelecCategoria.textContent =
      `Cocktails de ${categoria}: ${cocktails.length}`;

    cocktails.forEach((cocktail) => {
      const tarjeta = document.createElement('article');
      tarjeta.className = 'tarjeta-cocktail';

      const imagen = document.createElement('img');
      imagen.src = cocktail.strDrinkThumb;
      imagen.alt = cocktail.strDrink;
      imagen.loading = 'lazy';

      const nombreCocktail = document.createElement('h3');
      nombreCocktail.textContent = cocktail.strDrink;

      tarjeta.append(imagen, nombreCocktail);
      resultados.appendChild(tarjeta);
    });

  } catch (error) {
    console.error('Error al cargar los cocktails:', error);
    tituloSelecCategoria.textContent =
      'No se pudieron cargar los cocktails.';
  }
}
