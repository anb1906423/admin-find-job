import handleGetToken from '@/app/@func/HandleGetToken';
import axios from '../pages/api/axios';

const config = {
    headers: {
        Authorization: 'Bearer ' + handleGetToken(),
    },
};

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

export const getAllCapBac = () => {
    return axios.get(`/cap-bac`);
};

export const createNewCapBac = (data) => {
    return axios.post(`/cap-bac`, data);
};

export const updateCapBac = (id, data) => {
    return axios.put(`/cap-bac/${id}`, data);
};

export const deleteCapBac = (id) => {
    return axios.delete(`/cap-bac/${id}`);
};

export const getAllDiaDiemLamViec = () => {
    return axios.get(`/dia-diem-lam-viec`);
};

export const createNewDiaDiemLamViec = (data) => {
    return axios.post(`/dia-diem-lam-viec`, data);
};

export const updateDiaDiemLamViec = (id, data) => {
    return axios.put(`/dia-diem-lam-viec/${id}`, data);
};

export const deleteDiaDiemLamViec = (id) => {
    return axios.delete(`/dia-diem-lam-viec/${id}`);
};

export const getAllKinhNghiemLamViec = () => {
    return axios.get(`/kinh-nghiem`);
};

export const createNewKinhNghiemLamViec = (data) => {
    return axios.post(`/kinh-nghiem`, data);
};

export const updateKinhNghiemLamViec = (id, data) => {
    return axios.put(`/kinh-nghiem/${id}`, data);
};

export const deleteKinhNghiemLamViec = (id) => {
    return axios.delete(`/kinh-nghiem/${id}`);
};

export const getAllLinhVucKinhDoanh = () => {
    return axios.get('/linh-vuc-kinh-doanh');
};

export const createNewLinhVucKinhDoanh = (data) => {
    return axios.post('/linh-vuc-kinh-doanh', data);
};

export const updateLinhVucKinhDoanh = (id, data) => {
    return axios.put(`/linh-vuc-kinh-doanh/${id}`, data);
};

export const deleteLinhVucKinhDoanh = (id) => {
    return axios.delete(`/linh-vuc-kinh-doanh/${id}`);
};

export const getAllLoaiHinhDoanhNghiep = () => {
    return axios.get('/loai-hinh-doanh-nghiep');
};

export const createNewLoaiHinhDoanhNghiep = (data) => {
    return axios.post('/loai-hinh-doanh-nghiep', data);
};

export const updateLoaiHinhDoanhNghiep = (id, data) => {
    return axios.put(`/loai-hinh-doanh-nghiep/${id}`, data);
};

export const deleteLoaiHinhDoanhNghiep = (id) => {
    return axios.delete(`/loai-hinh-doanh-nghiep/${id}`);
};

export const getAllLoaiHopDong = () => {
    return axios.get(`/loai-hop-dong`);
};

export const createNewLoaiHopDong = (data) => {
    return axios.post(`/loai-hop-dong`, data);
};

export const updateLoaiHopDong = (id, data) => {
    return axios.put(`/loai-hop-dong/${id}`, data);
};

export const deleteLoaiHopDong = (id) => {
    return axios.delete(`/loai-hop-dong/${id}`);
};

export const getAllMucLuong = () => {
    return axios.get(`/muc-luong`, config);
};

export const getAllNghanhNghe = () => {
    return axios.get('/nganh-nghe');
};

export const createNewNghanhNghe = (data) => {
    return axios.post('/nganh-nghe', data);
};

export const updateNghanhNghe = (id, data) => {
    return axios.put(`/nganh-nghe/${id}`, data);
};

export const deleteNghanhNghe = (id) => {
    return axios.delete(`/nganh-nghe/${id}`);
};

export const getAllQuyMo = () => {
    return axios.get(`/qui-mo`);
};

export const createNewQuyMo = (data) => {
    return axios.post(`/qui-mo`, data);
};

export const updateQuyMo = (id, data) => {
    return axios.put(`/qui-mo/${id}`, data);
};

export const deleteQuyMo = (id) => {
    return axios.delete(`/qui-mo/${id}`);
};
