export function mostrarEstadoPrograma(mensaje) {
  const titulo = document.querySelector('#tituloCocktail');
  titulo.textContent = mensaje;
}

export function limpiarResultados() {
  const resultados = document.querySelector('#resultados');
  resultados.replaceChildren();
}

export function mostrarCategorias(categorias) {
  const selector = document.querySelector('#selectorCategorias');

  selector.replaceChildren();

  const opcionInicial = document.createElement('option');
  opcionInicial.value = '';
  opcionInicial.textContent = 'Selecciona una categoria';
  selector.appendChild(opcionInicial);

  categorias.forEach((categoria) => {
    const opcion = document.createElement('option');
    opcion.value = categoria;
    opcion.textContent = categoria;
    selector.appendChild(opcion);
  });
}

export function mostrarCocktails(cocktails) {
  const resultados = document.querySelector('#resultados');

  limpiarResultados();

  cocktails.forEach((cocktail) => {
    const tarjeta = document.createElement('article');
    tarjeta.classList.add('tarjeta-cocktail');

    const imagen = document.createElement('img');
    imagen.src = cocktail.strDrinkThumb || '';
    imagen.alt = `Imagen de ${cocktail.strDrink}`;
    imagen.loading = 'lazy';

    imagen.onerror = () => {
      imagen.alt = 'Imagen del coctel no disponible';
      imagen.style.display = 'none';
    };

    const nombre = document.createElement('h2');
    nombre.textContent = cocktail.strDrink || 'Coctel sin nombre';

    tarjeta.appendChild(imagen);
    tarjeta.appendChild(nombre);

    if (cocktail.strCategory) {
      const categoria = document.createElement('p');
      categoria.textContent = cocktail.strCategory;
      tarjeta.appendChild(categoria);
    }

    if (cocktail.idDrink) {
      const enlace = document.createElement('a');

      enlace.href =
        `https://www.thecocktaildb.com/drink/${cocktail.idDrink}`;
      enlace.textContent = 'Ver en TheCocktailDB';
      enlace.target = '_blank';
      enlace.rel = 'noopener noreferrer';

      tarjeta.appendChild(enlace);
    }

    resultados.appendChild(tarjeta);
  });
}
