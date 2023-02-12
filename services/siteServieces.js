import axios from '../pages/api/axios';

export const getAllAccountUngVien = () => {
    return axios.get('/ung-vien');
};
