
const titulo = document.querySelector('#tituloCocktail');
const resultados = document.querySelector('#resultados');
const selectorCategorias = document.querySelector('#selectorCategorias');


export function mostrarEstadoPrograma(mensaje) {
  titulo.textContent = mensaje;
}


export function mostrarCarga(mensaje = 'Cargando...') {
  titulo.innerHTML = '';

  const indicador = document.createElement('p');
  indicador.className = 'indicador-carga';
  indicador.textContent = mensaje;
  indicador.setAttribute('role', 'status');

  titulo.append(indicador);
}


export function limpiarResultados() {
  resultados.innerHTML = '';
}


export function mostrarCategorias(categorias) {
  selectorCategorias.innerHTML = '';

  const opcionInicial = document.createElement('option');
  opcionInicial.value = '';
  opcionInicial.textContent = 'Selecciona una categoria';

  selectorCategorias.append(opcionInicial);

  categorias.forEach((categoria) => {
    const opcion = document.createElement('option');
    opcion.value = categoria;
    opcion.textContent = categoria;

    selectorCategorias.append(opcion);
  });
}


export function mostrarRecuentoCategorias(recuento) {
  const resumen = document.createElement('section');
  resumen.className = 'resumen-categorias';

  const subtitulo = document.createElement('h2');
  subtitulo.textContent = 'Cocteles por categoría';

  const lista = document.createElement('ul');

  Object.entries(recuento).forEach(([categoria, cantidad]) => {
    const elemento = document.createElement('li');
    elemento.textContent = `${categoria}: ${cantidad}`;
    lista.append(elemento);
  });

  resumen.append(subtitulo, lista);
  resultados.append(resumen);
}


export function mostrarCocktails(cocktails) {
  limpiarResultados();

  if (cocktails.length === 0) {
    const mensaje = document.createElement('p');
    mensaje.textContent = 'No hay cócteles para mostrar.';
    resultados.append(mensaje);
    return;
  }

  cocktails.forEach((cocktail) => {
    const tarjeta = document.createElement('article');
    tarjeta.className = 'tarjeta-cocktail';

    const nombre = document.createElement('h2');
    nombre.textContent = cocktail.strDrink;

    const imagen = document.createElement('img');
    imagen.src = cocktail.strDrinkThumb || '';
    imagen.alt = `Imagen de ${cocktail.strDrink}`;
    imagen.loading = 'lazy';

    imagen.addEventListener('error', () => {
      imagen.hidden = true;
    });

    const categoria = document.createElement('p');
    categoria.textContent = `Categoria: ${cocktail.strCategory || 'No especificada'}`;

    const botonDetalle = document.createElement('button');
    botonDetalle.type = 'button';
    botonDetalle.textContent = 'Ver receta';
    botonDetalle.dataset.action = 'detalle';
    botonDetalle.dataset.id = cocktail.idDrink;

    tarjeta.append(nombre, imagen, categoria, botonDetalle);
    resultados.append(tarjeta);
  });
}


export function mostrarDetalleCocktail(cocktail) {
  limpiarResultados();

  const detalle = document.createElement('article');
  detalle.className = 'detalle-cocktail';

  const nombre = document.createElement('h2');
  nombre.textContent = cocktail.strDrink;

  const imagen = document.createElement('img');
  imagen.src = cocktail.strDrinkThumb || '';
  imagen.alt = `Imagen de ${cocktail.strDrink}`;
  imagen.loading = 'lazy';

  imagen.addEventListener('error', () => {
    imagen.hidden = true;
  });

  const categoria = document.createElement('p');
  categoria.textContent =
    `Categoría: ${cocktail.strCategory || 'No especificada'}`;

  const vaso = document.createElement('p');
  vaso.textContent =
    `Vaso: ${cocktail.strGlass || 'No especificado'}`;

  const tituloIngredientes = document.createElement('h3');
  tituloIngredientes.textContent = 'Ingredientes';

  const listaIngredientes = document.createElement('ul');

  const ingredientes = Array.from({ length: 15 }, (_, indice) => {
    const numero = indice + 1;

    return {
      nombre: cocktail[`strIngredient${numero}`], cantidad: cocktail[`strMeasure${numero}`]
    };
  })
    .filter((ingrediente) => {
      return (
        typeof ingrediente.nombre === 'string' && ingrediente.nombre.trim() !== ''
      );
    })
    .map((ingrediente) => {
      const cantidad = ingrediente.cantidad?.trim();

      return cantidad ? `${ingrediente.nombre.trim()}: ${cantidad}` : ingrediente.nombre.trim();
    });

  if (ingredientes.length === 0) {
    const elemento = document.createElement('li');
    elemento.textContent = 'No hay ingredientes disponibles';
    listaIngredientes.append(elemento);
  } else {
    ingredientes.forEach((ingrediente) => {
      const elemento = document.createElement('li');
      elemento.textContent = ingrediente;
      listaIngredientes.append(elemento);
    });
  }

  const tituloInstrucciones = document.createElement('h3');
  tituloInstrucciones.textContent = 'Preparación';

  const instrucciones = document.createElement('p');
  instrucciones.textContent =
    cocktail.strInstructions || 'No hay instrucciones disponibles';

  const botonVolver = document.createElement('button');
  botonVolver.type = 'button';
  botonVolver.textContent = 'Volver a los resultados';
  botonVolver.dataset.action = 'volver';

  detalle.append(
    nombre,
    imagen,
    categoria,
    vaso,
    tituloIngredientes,
    listaIngredientes,
    tituloInstrucciones,
    instrucciones,
    botonVolver
  );

  resultados.append(detalle);
}
