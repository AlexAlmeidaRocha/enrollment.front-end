import axios from 'axios';
import constants from '../utils/constants'

const serviceAxios = axios.create({
    baseURL: constants.Aplicacao.BaseUrlApi,
    headers: {
        "Content-Type": "application/json"
    },
});

async function post(url, data, header) {
    return serviceAxios.post(url, data, header);
}

async function get(url) {
    let config = {};
    return serviceAxios.get(url, config);
}

async function put(url, data) {
    return serviceAxios.put(url, data);
}

async function patch(url, data, header) {
    let config = {
        headers: header
    };
    return serviceAxios.patch(url, data, config);
}

async function delet(url) {
    let config = {};
    return serviceAxios.delete(url, config);
}

export default {
    get,
    post,
    put,
    patch,
    delet
};
