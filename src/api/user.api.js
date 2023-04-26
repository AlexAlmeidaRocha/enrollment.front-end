import API from './base.api'

const getAll = async () => {
    return API.get(`/candidate`);
}

const getUser = async (id) => {
    return API.get(`/candidate/${id}`);
}

const post = async (name, email, password) => {

    let data = {
        'name': name,
        'email': email,
        'password': password
    }
    return API.post(`/candidate/`, data);
}

const postLogin = async (email, password) => {
    var result = await API.get(`/candidate`);

    var user = result.data.filter(function (item) {
        return item.email === email && item.password === password;
    });

    return user
}

const put = async (id, name, email, password, profile) => {
    let data = {
        'name': name,
        'email': email,
        'password': password,
        'profile': profile
    }
    return API.put(`/candidate/${id}/`, data);
}

const remove = async (id) => {
    return API.delet(`/candidate/${id}`);
}

const patchAddEnrollment = async (user, enrollmentId) => {

    user.enrollment.push(enrollmentId);
    let data = {
        'enrollment': user.enrollment,
    }
    return API.patch(`/candidate/${user.id}/`, data);
}

const patchRemoveEnrollment = async (user, enrollmentId) => {

    const index = user.enrollment.indexOf(enrollmentId);
    if (index > -1) {
        user.enrollment.splice(index, 1);
    }
    let data = {
        'enrollment': user.enrollment,
    }
    return API.patch(`/candidate/${user.id}/`, data);
}

const patchAlterTimeOnline = async (user, seconds) => {  
    user.time_online = user.time_online + seconds;
    let data = {
        'time_online': user.time_online,
    }
    return API.patch(`/candidate/${user.id}/`, data);
}


export default {
    postLogin,
    getUser,
    getAll,
    post,
    put,
    remove,
    patchAddEnrollment,
    patchRemoveEnrollment,
    patchAlterTimeOnline
};