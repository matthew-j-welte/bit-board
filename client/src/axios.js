import axios from 'axios';

const BASE_URL = "http://172.19.0.1:8500"

const instance = axios.create({
    baseURL: BASE_URL
});

console.log(BASE_URL)

export default instance;