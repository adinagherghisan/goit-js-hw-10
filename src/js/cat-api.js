import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_x8HvTfbZ7wwhZoePclf0YAhFWqWW5eewzlcNdWrVe0jDKUODHfE8XXee92MMikWI";
export const fetchBreeds = () => {
    return axios.get("https://api.thecatapi.com/v1/breeds")
        .then(response => response.data)
        .catch(error => Promise.reject(error));
};

export const fetchCatByBreed = (breedId) => {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error));
};
console.log(fetchCatByBreed())
console.error(fetchCatByBreed())