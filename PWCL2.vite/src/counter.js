
const API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';


export async function buscarRecetaAPI(nombre) {
  const tituloSelecComida = document.getElementById('tituloSelecComida');
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

    tituloSelecComida.textContent = cantidad === 1 ? 'Se encontró 1 receta': `Se encontraron ${cantidad} recetas`;

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
      categoria.textContent = comida.strCategory || 'categoria no disponible';

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
    tituloSelecComida.textContent ='No se pudieron cargar las recetas';
  }
}


async function contarNumDatos() {
  try {
      const response = await fetch(API);

      if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
      }

      const datos = await response.json();
      const cantidad = datos.meals ? datos.meals.length : 0;

      console.log("Cantidad de recetas:", cantidad);

      return cantidad;

  } catch (error) {
      console.error("Error al contar las recetas:", error);
      return 0;
  }
}

export async function contarNumCategorias() {
  try {
      const response = await fetch(API);

      if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
      }

      const datos = await response.json();

      const comidas = datos.meals || [];

      const categorias = new Set(
          comidas.map(comida => comida.strCategory).filter(categoria => categoria)
      );

      const cantidadCategorias = categorias.size;

      console.log('Cantidad de categorias:', cantidadCategorias);

      return cantidadCategorias;

  } catch (error) {
      console.error('Error al contar las categorías:', error);
      return 0;
  }
}

