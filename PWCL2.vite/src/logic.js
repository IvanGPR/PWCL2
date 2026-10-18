
export function obtenerCategoriasValidas(datos) {
  if (!Array.isArray(datos)) {
    return [];
  }

  return datos
    .filter((categoria) =>
      categoria &&
      typeof categoria.strCategory === 'string' &&
      categoria.strCategory.trim() !== ''
    )
    .map((categoria) => categoria.strCategory);
}


export function ordenarCocktails(cocktails) {
  if (!Array.isArray(cocktails)) {
    return [];
  }

  return cocktails
    .filter((cocktail) =>
      cocktail &&
      typeof cocktail.strDrink === 'string' &&
      cocktail.strDrink.trim() !== ''
    )
    .toSorted((a, b) =>
      a.strDrink.localeCompare(b.strDrink, 'es')
    );
}


export function contarCocktailsPorCategoria(cocktails) {
  if (!Array.isArray(cocktails)) {
    return {};
  }

  return cocktails.reduce((contador, cocktail) => {
    const categoria =
      cocktail.strCategory || 'Sin categoría';

    contador[categoria] = (contador[categoria] || 0) + 1;

    return contador;
  }, {});
}


export function obtenerMensajeResultados(cocktails) {
  if (!Array.isArray(cocktails) || cocktails.length === 0) {
    return 'No se han encontrado cócteles.';
  }

  if (cocktails.length === 1) {
    return 'Se ha encontrado 1 cóctel.';
  }

  return `Se han encontrado ${cocktails.length} cócteles.`;
}


export function obtenerMensajeCategoria(categoria) {
  return `Cócteles de la categoría: ${categoria}`;
}
