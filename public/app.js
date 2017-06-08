var $ = window.jQuery;
var marvelApi = window.MarvelApi;

var key = 'ac216bd32a94cf50cbcceb2f71ee590a';
var api = new MarvelApi(key);

api.findSeries('avengers').then(serie => {
	let serieImage = `url(${serie.thumbnail.path}.${serie.thumbnail.extension})`;
	$('.Layout').css('background-image', serieImage);
	var characters = serie.characters.items;
	var promises = [];
	for (let character of characters) {
		let promise = api.getResourceURI(character.resourceURI);
		promises.push(promise);
	}
	return Promise.all(promises);
}).then(characters => {
	return characters.filter(character => !!character.thumbnail);
}).then(characters => {
	debugger;
	$('.Card').each((i, item) => {
		let character = characters[i];
		let $this = $(item);
		let $image = $this.find('.Card-image');
		let $description = $this.find('.Card-description');
		let $name = $this.find('.Card-name');

		$image.attr('src', `${character.thumbnail.path}.${character.thumbnail.extension}`);
		$name.text(character.name);
		$description.text(character.description);
	});
}).catch(err => {
	debugger;
	console.error(err);
});