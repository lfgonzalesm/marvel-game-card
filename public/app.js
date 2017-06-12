var $ = window.jQuery;
var marvelApi = window.MarvelApi;

var key = 'a548aee0bde874ea460773884934a865';
var api = new MarvelApi(key);

api.findSeries('avengers'
// encontrar datos en marvel de los avengers. Ver MarvelApi
).then(serie => {
  // .then hace que se ejecute hasta que obtengamos los datos de los avengers
  let serieImage = `url(${serie.thumbnail.path}.${serie.thumbnail.extension})`;
  // poner la imagen de los avengers en el tablero
  $('.Layout').css('background-image', serieImage);

  let characters = serie.characters.items;
  // obtener los personajes
  let promises = [];

  for (let character of characters) {
    // iterar los personajes
    let promise = api.getResourceURI(character.resourceURI
    // genera una promise por cada personaje
    );promises.push(promise);
  }
  // aqui promises ya tiene un array de Promises con las peticiones para cada personaje
  return Promise.all(promises
  // Promise.all regresa una promesa que solo se resuelve cuando todas las promesas
  // del array estan resueltas
  );
}).then(characters => {
  // solo llegamos a este punto cuando marvel.com nos regresó *todos*
  // los personajes de los avengers
  return characters.filter(character => !!character.thumbnail
  // filter nos permite quitar los personajes que no tienen thumbnail (imagen)
  );
}).then(characters => {
  // aqui tenemos solo personajes que *si* tienen imagen
  for (let i = 0; i < 5; i++) {
    let character = characters[i];
    let template = renderCharacter(character);
    let $card = $(template);
    $('.Battle-player').append($card);
    debugger;
  }

  // por cada carta
  // cambiar image .Card-image
  // cambiar .Card-description
  // cambiar .Card-name
}).catch(err => {
  console.error(err);
});

function renderCharacter(character) {

  return `<div class="Card ">
    <div class="Card-container">
      <h2 class="Card-name">${character.name}</h2><img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="wolverine" class="Card-image">
      <div class="Card-description">${character.description}</div>
      <div class="Card-attack">500 puntos de ataque</div>
    </div>
    <div class="Card-backface"> </div>
  </div>`;
}