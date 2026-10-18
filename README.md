# Mision 2

La práctica se trata de una web de cocteles que te permite ver distinta informacion sobre estos utilizando una api,
 de forma en que ademas de la informacion se han añadido cosas para poder obtener 
 esa informacion de distintas formas.

## Como probarlo
El primer paso se trata de como el dev, para poder observarla web.
Esto se hace con la instalacion de npm y posteriormente introduciendo en terminal npm run dev.
A partir de ahi el programa te permite buscar la informacion ya sea buscando por nombre
del coctel, por categorias de coctel o te da la opcion de que el programa te enseñe uno aleatoriamente. Tambien teniendo en cuenta que en caso de que se busque un nombre de coctel incorrecto al usuario se le indica que no hay coctel con ese nombre. 
Posteriormente de la la busqueda por nombre, por categoria o aleatoriamente, se obtiene las informacion general (nombre, foto, categoria) de los cocteles selecionados, dando asi tambien que se pueda ver todo la informacion concreta (nombre, foto, categoria, vaso, ingredientes, preparacion) de un coctel pulsando en "Ver receta".

## Uso de IA
Para esta practica se ha utilizado la IA (chatGPT) para resolver dudas que han surgido en el transcurso de la practica

Prompts:

1. Como se puede desarrollar una url de una api de forma que de una url se puedan obtener busquedas de informacion mas concretas

Este prompt me dio la capacidad de poder hacer que mi programa pasase de tener 4 url donde su uso dependia del la necesidad del
programa a tner una unica url base la cual puedo desrrollar en el momento que me sea necesario.

Ejemplo:
  Pasa de: const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s';
  A: const url =`${URL_BASE}search.php?s=${encodeURIComponent(nombre)}`;

2. Como puedo realizar un selector donde tengas distintas opciones para seleccionar.

Este promp me devolvio la solucion del problema para como crear un selector, pero para poderla añadir a mi trabajo tuvo que modificarla para hacerla de creacion de opciones dinamica.

## Autopsia

En este proyecto tuve que tomar varias decision para correguir algunos problemas:

1. Uno de las decisiones que tuve que tomar se trataba de hacer las urls construibles a partir de una url base porque aunque las url por separado funcionasen, para hacer asi que la programacion fuese mas limpia y mejor estructurada.

2. Otro problema que surgio fue que al inicio del proyecto la api de cocteles no funcionaba y tuve que decidir cambiarla por la de comida, pero a su vez despues de realizar todo el programa con la api de comidas tuve que volver a la api de cocteles debido a que la api de comidas bajaba la nota de originalidad en la rubrica.