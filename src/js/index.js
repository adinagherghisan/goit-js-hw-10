import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

const toggleLoaderAndElements = (loaderDisplay, catInfoDisplay, errorDisplay) => {
  loader.style.display = loaderDisplay ? 'block' : 'none';
  catInfo.style.display = catInfoDisplay ? 'block' : 'none';
  error.style.display = errorDisplay ? 'block' : 'none';
};
const toggleError = (errorDisplay, message = '') => {
  const errorMessage = message || 'Oops! Something went wrong! Try reloading the page!';
  errorElement.textContent = errorMessage;
  toggleLoaderAndElements(false, false, false, errorDisplay);
};

fetchBreeds()
  .then((breeds) => {
    toggleLoaderAndElements(false, false, false);
    const fragmentElement = document.createDocumentFragment();

    breeds.forEach((breed) => {
      const option = document.createElement('option');
      option.textContent = breed.name;
      option.value = breed.id;
      fragmentElement.append(option);
    });

    breedSelect.appendChild(fragmentElement);

    breedSelect.addEventListener('change', () => {
      toggleLoaderAndElements(true, false, false);
      const selectedBreedId = breedSelect.value;

      fetchCatByBreed(selectedBreedId)
        .then((catInformation) => {
          const catBreed = catInformation[0].breeds.length > 0 ? catInformation[0].breeds[0] : null;

          if (catBreed) {
            catInfo.innerHTML = `
              <img src="${catInformation[0].url}" alt="Cat Image">
              <p><strong>Breed:</strong> ${catBreed.name}</p>
              <p><strong>Description:</strong> ${catBreed.description}</p>
              <p><strong>Temperament:</strong> ${catBreed.temperament}</p>
            `;
          } else {
            Notify.error('Oops! Something went wrong! Try reloading the page!');
          }

          toggleLoaderAndElements(false, true, false);
        })
        .catch((error) => {
          Notify.error('Error fetching cat breeds:', error.response || error);
          toggleLoaderAndElements(false, true, true);
        });
    });
  })
  .catch((error) => {
    Notify.error('Error fetching cat information:', error.response || error);
    toggleLoaderAndElements(false, true, true);
  });