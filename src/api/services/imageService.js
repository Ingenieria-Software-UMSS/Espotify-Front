import apiService from "./apiService";

const imageEndpoint = "storage/image";
const imageService = apiService("https://espotify.azurewebsites.net", imageEndpoint);

export async function addImage(multipartFile) {
    const formData = new FormData();
    formData.append("image", multipartFile);
    return imageService.postAudio(formData);
}

export async function getImage(id) {
    return imageService.getById(id);
}