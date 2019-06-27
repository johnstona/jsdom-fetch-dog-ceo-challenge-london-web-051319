document.addEventListener('DOMContentLoaded', () => {
  init()
})

const init = () => {
  addImages()
  addBreeds()
  sortBreeds()
}

const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

function getImages () {
  return fetch(imgUrl)
    .then(dogImages => dogImages.json())
    .then(dogImages => dogImages.message)
}

function getBreeds () {
  return fetch(breedUrl)
    .then(dogBreeds => dogBreeds.json())
    .then(dogBreeds => dogBreeds.message)
}

function addBreeds () {
  getBreeds()
    .then(dogBreeds => {
      for (const breed in dogBreeds) {
        renderBreed(breed)
      }
    })
}

function renderBreed (breed) {
  const breedUl = document.querySelector('#dog-breeds')
  let li = document.createElement('li')
  li.innerText = breed
  li.addEventListener('click', changeColour)
  breedUl.append(li)
}

function addImages () {
  getImages()
    .then(dogImages => dogImages.forEach(dogImage => {
      renderImage(dogImage)
    }))
}

function renderImage (imageUrl) {
  let img = document.createElement('img')
  img.src = imageUrl
  const imageDiv = document.querySelector('#dog-image-container')
  imageDiv.append(img)
}

function changeColour (event) {
  event.target.style.color = 'red'
}

function sortBreeds () {
  let dropdown = document.querySelector('#breed-dropdown')
  dropdown.addEventListener('change', sortDogs)
}

function sortDogs (event) {
  document.querySelector('#dog-breeds').innerHTML = ""
  startLetter = event.target.value
  showSortedDogs(startLetter)
}

function showSortedDogs (startLetter) {
  getBreeds()
    .then(dogBreeds => {
      for (const breed in dogBreeds) {
        if (breed[0] === startLetter) {
          renderBreed(breed)
        }
      }
    })
}
