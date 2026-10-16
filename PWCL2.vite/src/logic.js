
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

  return cocktails.toSorted((a, b) =>
    a.strDrink.localeCompare(b.strDrink, 'en')
  );
}

export function obtenerMensajeResultados(cocktails) {
  if (!Array.isArray(cocktails) || cocktails.length === 0) {
    return 'No se han encontrado cocteles';
  }

  if (cocktails.length === 1) {
    return 'Se ha encontrado 1 coctel';
  }

  return `Se han encontrado ${cocktails.length} cocteles`;
}

export function obtenerMensajeCategoria(categoria) {
  return `Cocteles de la categoria: ${categoria}`;
}
