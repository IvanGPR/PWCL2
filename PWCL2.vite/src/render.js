
export function mostrarEstadoPrograma(mensaje) {
  const titulo = document.querySelector('#tituloCocktail');
  titulo.textContent = mensaje;
}


export function mostrarCarga(mensaje) {
  const titulo = document.querySelector('#tituloCocktail');
  titulo.replaceChildren();

  const indicador = document.createElement('span');
  indicador.classList.add('indicador-carga');
  indicador.setAttribute('aria-hidden', 'true');

  const texto = document.createElement('span');
  texto.textContent = mensaje;

  titulo.append(indicador, texto);
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
  opcionInicial.textContent = 'Selecciona una categoría';

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
    imagen.alt = `Imagen de ${cocktail.strDrink}`;
    imagen.loading = 'lazy';

    if (cocktail.strDrinkThumb) {
      imagen.src = cocktail.strDrinkThumb;

      imagen.onerror = () => {
        imagen.alt = 'Imagen del cóctel no disponible';
        imagen.style.display = 'none';
      };
    } else {
      imagen.alt = 'Imagen del cóctel no disponible';
      imagen.style.display = 'none';
    }

    const nombre = document.createElement('h2');
    nombre.textContent = cocktail.strDrink || 'Cóctel sin nombre';

    tarjeta.append(imagen, nombre);

    if (cocktail.strCategory) {
      const categoria = document.createElement('p');
      categoria.textContent = cocktail.strCategory;
      tarjeta.appendChild(categoria);
    }

    if (cocktail.idDrink) {
      const botonDetalle = document.createElement('button');

      botonDetalle.textContent = 'Ver ingredientes y preparación';
      botonDetalle.classList.add('boton-detalle');
      botonDetalle.dataset.action = 'detalle';
      botonDetalle.dataset.id = cocktail.idDrink;

      tarjeta.appendChild(botonDetalle);
    }

    resultados.appendChild(tarjeta);
  });
}


export function mostrarRecuentoCategorias(contador) {
  const resultados = document.querySelector('#resultados');

  if (Object.keys(contador).length === 0) {
    return;
  }

  const resumen = document.createElement('section');
  resumen.classList.add('resumen-categorias');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Cócteles por categoría';

  resumen.appendChild(titulo);

  Object.entries(contador).forEach(([categoria, cantidad]) => {
    const linea = document.createElement('p');
    linea.textContent = `${categoria}: ${cantidad}`;
    resumen.appendChild(linea);
  });

  resultados.prepend(resumen);
}


export function mostrarDetalleCocktail(cocktail) {
  const resultados = document.querySelector('#resultados');

  limpiarResultados();

  const detalle = document.createElement('article');
  detalle.classList.add('tarjeta-cocktail', 'detalle-cocktail');

  const titulo = document.createElement('h2');
  titulo.textContent = cocktail.strDrink || 'Cóctel sin nombre';
  detalle.appendChild(titulo);

  if (cocktail.strDrinkThumb) {
    const imagen = document.createElement('img');
    imagen.src = cocktail.strDrinkThumb;
    imagen.alt = `Imagen de ${cocktail.strDrink}`;

    imagen.onerror = () => {
      imagen.style.display = 'none';
    };

    detalle.appendChild(imagen);
  }

  const tituloIngredientes = document.createElement('h3');
  tituloIngredientes.textContent = 'Ingredientes';
  detalle.appendChild(tituloIngredientes);

  const ingredientes = document.createElement('ul');

  for (let i = 1; i <= 15; i++) {
    const nombre = cocktail[`strIngredient${i}`];
    const cantidad = cocktail[`strMeasure${i}`];

    if (nombre && nombre.trim()) {
      const ingrediente = document.createElement('li');

      ingrediente.textContent = cantidad
        ? `${nombre} — ${cantidad}`
        : nombre;

      ingredientes.appendChild(ingrediente);
    }
  }

  detalle.appendChild(ingredientes);

  const tituloPreparacion = document.createElement('h3');
  tituloPreparacion.textContent = 'Preparación';
  detalle.appendChild(tituloPreparacion);

  const preparacion = document.createElement('p');
  preparacion.textContent =
    cocktail.strInstructions || 'No hay instrucciones disponibles.';

  detalle.appendChild(preparacion);

  const botonVolver = document.createElement('button');
  botonVolver.textContent = 'Volver a los resultados';
  botonVolver.dataset.action = 'volver';

  detalle.appendChild(botonVolver);
  resultados.appendChild(detalle);
}
