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
