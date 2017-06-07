var $ = window.jQuery
var marvelApi = window.MarvelApi


var key = 'ac216bd32a94cf50cbcceb2f71ee590a'
var api = new MarvelApi(key)

api.findSeries('avengers')
.then((serie) => {
	let serieImage = `url(${serie.thumbnail.path}.${serie.thumbnail.extension})`
	$('.Layout').css('background-image',serieImage)
	debugger
	var characters = serie.characters.items
	var promises = []
	for (let character of characters){
		let promise = api.getResourceURI(character.resourceURI)
		promises.push(promise)
	}
	return Promise.all(promises)
	})

.then((characters)=>{
	debugger
	console.log(characters)
})
.catch( (err)=>{
	debugger
	console.error(err)
})