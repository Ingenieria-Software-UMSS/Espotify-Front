import apiService from "./apiService";

const thumbnailEndpoint = "espotify/thumbnail";
const thumbnailService = apiService("https://espotify.azurewebsites.net", thumbnailEndpoint);

export async function addThumbnail(thumbnailData, imageFile) {
    const formData = new FormData();
    formData.append("jsonThumbnail", JSON.stringify(thumbnailData));
    formData.append("image", imageFile);
    return thumbnailService.postAudio(formData);
}

export async function getThumbnail(thumbnailId) {
    return thumbnailService.getById(thumbnailId);
}

export async function getThumbnailList() {
    return thumbnailService.getAll();
}
