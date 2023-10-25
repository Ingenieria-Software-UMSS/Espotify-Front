import apiService from "./apiService";

const artistEndpoint = "artist";
const artistService = apiService("https://espotify.azurewebsites.net", artistEndpoint);

export async function addArtist(artistData) {
    return artistService.post(artistData);
}

export async function getArtist(artistId) {
    return artistService.getById(artistId);
}

export async function getArtistList() {
    return artistService.getAll();
}