import axios from 'axios';

const baseUrl = "http://localhost:8080"

const instance = axios.create({
    baseURL: baseUrl
});

export default instance;