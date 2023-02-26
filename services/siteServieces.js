import axios from '../pages/api/axios';

export const getAllAccountUngVien = () => {
    return axios.get('/ung-vien');
};

export const getAllAccountNhaTuyenDung = () => {
    return axios.get('/nha-tuyen-dung');
};

export const createNewAccountAdmin = (data) => {
    return axios.post('/quan-tri-vien/dang-ky', data);
};

export const getAllBangCap = () => {
    return axios.get(`/bang-cap`);
};

export const createNewBangCap = (data) => {
    return axios.post(`/bang-cap`, data);
};

export const updateBangCap = (id, data) => {
    return axios.put(`/bang-cap/${id}`, data);
};

export const deleteBangCap = (id) => {
    return axios.delete(`/bang-cap/${id}`);
};
