import apiService from "./apiService";

const audioEndpoint = "storage/audio";
const audioService = apiService("https://espotify.azurewebsites.net", audioEndpoint);

export async function addAudio(multipartFile) {
    const formData = new FormData();
    formData.append("file", multipartFile);
    return audioService.postAudio(formData);
}

export async function getAudio(id) {
    return audioService.getById(id);
}