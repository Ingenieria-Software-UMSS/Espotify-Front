import axios from "axios";
// axios.defaults.baseURL = 'http://localhost:8080'
// axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.baseURL = 'https://espotify.azurewebsites.net'
axios.defaults.headers.post["Content-Type"] = 'application/json'

export const request = (method, url, data) => {
    return axios({
        method: method,
        url: url,
        data: data
    });
};