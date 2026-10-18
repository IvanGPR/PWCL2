
export function obtenerCategoriasValidas(datos) {
  if (!Array.isArray(datos)) {
    return [];
  }

  return datos.filter((categoria) => {
      return categoria && typeof categoria.strCategory === 'string';
    })
    .map((categoria) => categoria.strCategory).filter((categoria) => categoria.trim() !== '');
}


export function ordenarCocktails(cocktails) {
  if (!Array.isArray(cocktails)) {
    return [];
  }

  const cocktailsValidos = cocktails.filter((cocktail) => {
    return (
      cocktail && typeof cocktail.strDrink === 'string' && cocktail.strDrink.trim() !== ''
    );
  });

  return cocktailsValidos.toSorted((a, b) => {
    return a.strDrink.localeCompare(b.strDrink, 'en');
  });
}


export function contarCocktailsPorCategoria(cocktails) {
  if (!Array.isArray(cocktails)) {
    return {};
  }

  return cocktails.reduce((recuento, cocktail) => {
    const categoria = cocktail.strCategory || 'Sin categoria';

    if (!recuento[categoria]) {
      recuento[categoria] = 0;
    }

    recuento[categoria]++;

    return recuento;
  }, {});
}


export function obtenerMensajeResultados(cantidad, nombre) {
  if (cantidad === 0) {
    return `No se han encontrado cocteles para "${nombre}"`;
  }

  if (cantidad === 1) {
    return 'Se ha encontrado 1 coctel';
  }

  return `Se han encontrado ${cantidad} cocteles`;
}


export function obtenerMensajeCategoria(categoria, cantidad) {
  if (cantidad === 0) {
    return `No se han encontrado cocteles en la categoria ${categoria}`;
  }

  return `Cocteles de la categoria ${categoria}: ${cantidad}`;
}


export function obtenerMensajeError(error) {
  if (error?.tipo === 'red') {
    return 'No se ha podido conectar con el servidor. Comprueba tu conexion';
  }

  if (error?.tipo === 'http') {
    return 'El servidor ha devuelto un error, intentalo mas tarde';
  }

  if (error?.tipo === 'datos') {
    return 'La respuesta recibida no tiene un formato valido';
  }

  return 'Ha ocurrido un error, intentalo de nuevo';
}
