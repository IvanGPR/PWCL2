const API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const API_CATEGORIAS_LISTA = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const API_CATEGORIAS_FILTRO = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

export async function buscarRecetaAPI(nombre) {
  const tituloSelecComida = document.getElementById('tituloComida');
  const resultados = document.getElementById('resultados');

  if (!nombre) {
    tituloSelecComida.textContent = 'Escribe el nombre de una receta';
    resultados.replaceChildren();
    return;
  }

  tituloSelecComida.textContent = 'Buscando recetas...';
  resultados.replaceChildren();

  try {
    const respuesta = await fetch(`${API}${encodeURIComponent(nombre)}`);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    if (!datos.meals) {
      tituloSelecComida.textContent = 'No se encontraron recetas';
      return;
    }

    const cantidad = datos.meals.length;
    tituloSelecComida.textContent = cantidad === 1 ? 'Se encontró 1 receta' : `Se encontraron ${cantidad} recetas`;

    datos.meals.forEach((comida) => {
      const tarjeta = document.createElement('article');
      tarjeta.className = 'tarjeta-receta';

      const imagen = document.createElement('img');
      imagen.src = comida.strMealThumb;
      imagen.alt = comida.strMeal;
      imagen.loading = 'lazy';

      const nombreComida = document.createElement('h3');
      nombreComida.textContent = comida.strMeal;

      const categoria = document.createElement('p');
      categoria.textContent = comida.strCategory || 'Categoría no disponible';

      const enlace = document.createElement('a');
      enlace.href = comida.strSource || `https://www.themealdb.com/meal.php?c=${comida.idMeal}`;
      enlace.target = '_blank';
      enlace.rel = 'noopener noreferrer';
      enlace.textContent = 'Ver receta';

      tarjeta.append(imagen, nombreComida, categoria, enlace);
      resultados.appendChild(tarjeta);
    });

  } catch (error) {
    console.error('Error al consultar TheMealDB:', error);
    tituloSelecComida.textContent = 'No se pudieron cargar las recetas';
  }
}

export async function contarNumDatos() {
  try {
    const response = await fetch(API);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const datos = await response.json();
    return datos.meals ? datos.meals.length : 0;
  } catch (error) {
    console.error('Error al contar las recetas:', error);
    return 0;
  }
}

export async function obtenerCategoriasValidas() {
  try {
    const response = await fetch(API_CATEGORIAS_LISTA);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    
    const datos = await response.json();
    const listaOriginal = datos.meals || [];

    const nombresCategorias = listaOriginal.map(item => item.strCategory);

    const categoriasValidas = nombresCategorias.filter(categoria => categoria && categoria.trim() !== '');

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

export async function mostrarPlatosCategoria(categoria) {
  const resultados = document.getElementById('resultados');
  const tituloSelecCategoria = document.getElementById('tituloComida');

  if (!categoria) {
    tituloSelecCategoria.textContent = 'Selecciona una categoría';
    resultados.replaceChildren();
    return;
  }

  try {
    tituloSelecCategoria.textContent = `Platos de ${categoria}...`;
    resultados.replaceChildren();

    const respuesta = await fetch(`${API_CATEGORIAS_FILTRO}${encodeURIComponent(categoria)}`);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    const comidas = datos.meals || [];

    tituloSelecCategoria.textContent = `Platos de ${categoria}: ${comidas.length}`;

    comidas.forEach((comida) => {
      const tarjeta = document.createElement('article');
      tarjeta.className = 'tarjeta-receta';

      const imagen = document.createElement('img');
      imagen.src = comida.strMealThumb;
      imagen.alt = comida.strMeal;
      imagen.loading = 'lazy';

      const nombre = document.createElement('h3');
      nombre.textContent = comida.strMeal;

      tarjeta.append(imagen, nombre);
      resultados.appendChild(tarjeta);
    });

  } catch (error) {
    console.error('Error al cargar los platos:', error);
    tituloSelecCategoria.textContent = 'No se pudieron cargar los platos.';
  }
}