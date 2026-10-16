
export function obtenerCategoriasValidas(categorias) {
  return categorias
    .map(item => item.strCategory)
    .filter(categoria =>
      typeof categoria === 'string' &&
      categoria.trim() !== ''
    );
}

export function obtenerMensajeResultados(cantidad) {
  return cantidad === 1
    ? 'Se encontró 1 cocktail'
    : `Se encontraron ${cantidad} cocktails`;
}

export function obtenerMensajeCategoria(categoria, cantidad) {
  return `Cocktails de ${categoria}: ${cantidad}`;
}


export function contarCocktailsPorCategoria(cocktails) {
  return cocktails.reduce((acumulador, cocktail) => {
    const categoria = cocktail.strCategory;

    if (!categoria) {
      return acumulador;
    }

    acumulador[categoria] = (acumulador[categoria] || 0) + 1;

    return acumulador;
  }, {});
}
