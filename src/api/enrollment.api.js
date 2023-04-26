import API from './base.api'

const getAll = async () => {
    return API.get(`/enrollment`);
}

const getById = async (id) => {
    return API.get(`/enrollment/${id}/`);
}

const post = async (name ) => {

    let data = {
        'name': name
    }
    return API.post(`/enrollment/`, data);
}

const put = async ( id, name) => {
    let data = {
        'name': name
    }
    return API.put(`/enrollment/${id}/`, data);
}

const remove = async (id) => {
    return API.delet(`/enrollment/${id}`);
}

export default {
    getAll,
    getById,
    post,
    put,
    remove
};