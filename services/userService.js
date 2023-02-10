import axios from '../pages/api/axios';

export const LoginUserAdmin = (data) => {
    return axios.post('/quan-tri-vien/dang-nhap', data);
};
