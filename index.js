function getDogHTML(dog, number) {
	return `<div class="w-full md:w-1/2 p-4"><a class="block" aria-label="link to dog image" href="${dog}" target="_blank" ref="noopener"><img src="${dog}" data-dog="${number}" alt="dog ${number}" class="object-cover"></div>`
}

function formatDogsHTML(dogs) {
	return dogs
		.map((dog, index) => {
			return getDogHTML(dog, index)
		})
		.join('')
}

function renderHTML(dogHTML) {
	$('#dog-results').html(dogHTML)
}

function renderDogBreed(dog) {
	let html = getDogHTML(dog)
	$('#dog-results').html(html)
}

function fetchDogImages(numDogs) {
	fetch(`https://dog.ceo/api/breeds/image/random/${numDogs}`)
		.then(response => response.json())
		.then(json => {
			const dogsHTML = formatDogsHTML(json.message)
			renderHTML(dogsHTML)
		})
}

function fetchDogBreed(dogBreed) {
	fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random`)
		.then(response => {
			console.log('Breed response: ', response)
			return response.json()
		})
		.then(json => {
			console.log('Breed JSON', json)
			if (json.code === 404) {
				renderHTML(`<p class="error mt-6 p-4">${json.message}`)
			} else {
				renderDogBreed(json.message)
			}
		})
		.catch(error => alert('Something went wrong. Try again later.'))
}

function getNumDogs() {
	return Number($('#numdogs').val() || 0)
}

function getDogBreed() {
	return $('#dogbreed').val()
}

function handleForms() {
	$('#random-dogs').on('submit', e => {
		e.preventDefault()

		const numDogs = getNumDogs()
		fetchDogImages(numDogs)
	})

	$('#random-breed').on('submit', e => {
		e.preventDefault()

		const dogBreed = getDogBreed()
		fetchDogBreed(dogBreed)
	})
}

$(() => {
	handleForms()
})
