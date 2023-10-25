import apiService from "./apiService";

const songEndpoint = "song";
const songService = apiService("https://espotify.azurewebsites.net", songEndpoint);

export async function addSong(songData, thumbnailData, artistData, audioFile) {
    const formData = new FormData();
    formData.append("jsonSong", JSON.stringify(songData));
    formData.append("jsonThumbnail", JSON.stringify(thumbnailData));
    formData.append("jsonArtist", JSON.stringify(artistData));
    formData.append("audio", audioFile);
    return songService.postAudio(formData);
}

export async function getSong(songId) {
    return songService.getById(songId);
}

export async function getSongList() {
    return songService.getAll();
}