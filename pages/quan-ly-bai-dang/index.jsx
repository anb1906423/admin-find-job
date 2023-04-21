import React, { useState, useEffect } from 'react'
import Heading from '@/components/Heading'
import classNames from 'classnames/bind';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { backendAPI } from '@/config'
import styles from '../../components/ManageAccount/TaiKhoanNhaTuyenDung/taikhoannhatuyendung.module.scss';
import { Switch, Input, Select } from 'antd';
import { swtoast } from '@/mixin/swal.mixin';
import Detail from '../../components/JobDetail'
import { useRouter } from 'next/router';
import { SearchOutlined } from "@ant-design/icons"
import {
  getAllDiaDiemLamViec,
  getAllMucLuong,
  getAllLoaiHopDong,
  getAllCapBac,
  getAllKinhNghiemLamViec,
  getAllBangCap,
} from '@/services';

const cx = classNames.bind(styles);

const JobManage = () => {
  const router = useRouter()
  const [jobs, setJobs] = useState([])

  const [diaDiemLamViec, setDiaDiemLamViec] = useState([])
  const [mucLuong, setMucLuong] = useState([])
  const [loaiHopDong, setLoaiHopDong] = useState([])
  const [capBac, setCapBac] = useState([])
  const [kinhNghiem, setKinhNghiem] = useState([])
  const [bangCap, setBangCap] = useState([])

  const [disabledInputState, setDisabledInputState] = useState(false);

  const [searchTitleValue, setSearchTitleValue] = useState(""); // Lưu trữ giá trị nhập vào từ input
  const [searchNameCompanyValue, setSearchNameCompanyValue] = useState(""); // Lưu trữ giá trị nhập vào từ input
  const [searchPlaceValue, setSearchPlaceValue] = useState(""); // Lưu trữ giá trị nhập vào từ input
  const [searchSalaryValue, setSearchSalaryValue] = useState(""); // Lưu trữ giá trị nhập vào từ input
  const [searchHopDongValue, setSearchHopDongValue] = useState(""); // Lưu trữ giá trị nhập vào từ input
  const [searchCapBacValue, setSearchCapBacValue] = useState(""); // Lưu trữ giá trị nhập vào từ input
  const [searchKinhNghiemValue, setSearchKinhNghiemValue] = useState(""); // Lưu trữ giá trị nhập vào từ input
  const [searchBangCapValue, setSearchBangCapValue] = useState(""); // Lưu trữ giá trị nhập vào từ input
  const [searchStateValue, setSearchStateValue] = useState("Tất cả"); // Lưu trữ giá trị nhập vào từ input

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    const handleGetJobs = async () => {
      try {
        const jobResponse = await axios.get(backendAPI + '/cong-viec');
        const companyResponse = await axios.get(backendAPI + '/nha-tuyen-dung');

        // Kiểm tra dữ liệu và gộp thông tin công việc và nhà tuyển dụng dựa trên emailCty
        const jobsWithCompanyInfo = jobResponse.data.map(job => {
          const company = companyResponse.data.find(company => company.email === job.emailCty);
          return company ? {
            ...job,
            // linhVucNgheNghiep: company.linhVucNgheNghiep,
            logoCty: company.logoCty,
            soDienThoai: company.soDienThoai,
            tenCty: company.tenCty,
            diaChi: company.diaChi,
            website: company.website
          } : job;
        });

        setJobs(jobsWithCompanyInfo);

      } catch (error) {
        console.log(error);
        swtoast.error({
          text: error,
        });
      }
    }

    handleGetJobs()
  }, [disabledInputState])

  useEffect(() => {
    const fetchDiaDiem = async () => {
      const Res = await getAllDiaDiemLamViec();
      const { data } = Res;
      setDiaDiemLamViec([{ ten: 'Địa điểm làm việc' }, ...data]);
    };
    const fetchMucLuong = async () => {
      const Res = await getAllMucLuong();
      const { data } = Res;
      setMucLuong([{ ten: 'Mức lương' }, ...data]);
    };
    const fetchKinhNghiem = async () => {
      const Res = await getAllKinhNghiemLamViec();
      const { data } = Res;
      setKinhNghiem([{ ten: 'Kinh nghiệm làm việc' }, ...data]);
    };
    const fetchLoaiHopDong = async () => {
      const Res = await getAllLoaiHopDong();
      const { data } = Res;
      setLoaiHopDong([{ ten: 'Loại hợp đồng' }, ...data]);
    };
    const fetchCapBac = async () => {
      const Res = await getAllCapBac();
      const { data } = Res;
      setCapBac([{ ten: 'Cấp bậc' }, ...data]);
    };
    const fetchBangCap = async () => {
      const Res = await getAllBangCap();
      const { data } = Res;
      setBangCap([{ ten: 'Bằng cấp' }, ...data]);
    };

    fetchDiaDiem()
    fetchMucLuong()
    fetchKinhNghiem()
    fetchLoaiHopDong()
    fetchCapBac()
    fetchBangCap()
  }, [])

  const handleUpdateState = async (item, id) => {
    try {
      setDisabledInputState(true);

      // Call the appropriate API based on the current state of the item
      const updatedItem = item.state
        ? await axios.put(backendAPI + '/cong-viec/off', { cong_viec_id: id })
        : await axios.put(backendAPI + '/cong-viec/on', { cong_viec_id: id });

      // Update the item state with the new value returned from the API
      // refreshData();
    } catch (error) {
      console.error(error);
      swtoast.error({ text: 'Xảy ra lỗi khi thay đổi trạng thái nhà tuyển dụng!' });
    } finally {
      setDisabledInputState(false);
    }
  };

  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.chucDanh.toLowerCase().includes(searchTitleValue.toLowerCase())
        && job.tenCty.toLowerCase().includes(searchNameCompanyValue.toLowerCase())
        && (searchPlaceValue == 'Địa điểm làm việc' || job.diaDiemLamViec.toLowerCase().includes(searchPlaceValue.toLowerCase()))
        && (searchSalaryValue == 'Mức lương' || job.mucLuong.toLowerCase().includes(searchSalaryValue.toLowerCase()))
        && (searchCapBacValue == 'Cấp bậc' || job.capBac.toLowerCase().includes(searchCapBacValue.toLowerCase()))
        && (searchBangCapValue == 'Bằng cấp' || job.bangCap.toLowerCase().includes(searchBangCapValue.toLowerCase()))
        && (searchKinhNghiemValue == 'Kinh nghiệm làm việc' || job.kinhNghiem.toLowerCase().includes(searchKinhNghiemValue.toLowerCase()))
        && (searchHopDongValue == 'Loại hợp đồng' || job.loaiHopDong.toLowerCase().includes(searchHopDongValue.toLowerCase()))
        && ((searchStateValue == 'Tất cả') || job.state === searchStateValue)
    );
    setFilteredJobs(filtered);
  }, [jobs, searchTitleValue, searchNameCompanyValue, searchPlaceValue, searchSalaryValue, searchCapBacValue, searchBangCapValue, searchKinhNghiemValue, searchHopDongValue, searchStateValue]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTitleValue(value);
  };

  const handleCompanyFilter = (event) => {
    const value = event.target.value;
    setSearchNameCompanyValue(value);
  };

  const handlePlaceFilter = (value) => {
    setSearchPlaceValue(value);
  }

  return (
    <div className='job-management'>
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        <Input
          type="text"
          size="large"
          value={searchTitleValue}
          onChange={handleSearch}
          placeholder="Chức danh"
          style={{ width: 300 }}
          addonAfter={<SearchOutlined />}
        />
        <Select
          defaultValue="Địa điểm làm việc"
          size="large"
          style={{
            width: 300,
          }}
          onChange={handlePlaceFilter}
          options={diaDiemLamViec.map((place) => ({
            label: place.ten,
            value: place.ten,
          }))}
        />
        <Select
          defaultValue="Mức lương"
          size="large"
          style={{
            width: 300,
          }}
          onChange={(value) => setSearchSalaryValue(value)}
          options={mucLuong.map((place) => ({
            label: place.ten,
            value: place.ten,
          }))}
        />
        <Input
          type="text"
          size="large"
          value={searchNameCompanyValue}
          onChange={handleCompanyFilter}
          placeholder="Tên công ty"
          style={{ width: 300 }}
          addonAfter={<SearchOutlined />}
        />
        <Select
          defaultValue="Cấp bậc"
          size="large"
          style={{
            width: 300,
          }}
          onChange={(value) => setSearchCapBacValue(value)}
          options={capBac.map((place) => ({
            label: place.ten,
            value: place.ten,
          }))}
        />
        <Select
          defaultValue="Bằng cấp"
          size="large"
          style={{
            width: 300,
          }}
          onChange={(value) => setSearchBangCapValue(value)}
          options={bangCap.map((place) => ({
            label: place.ten,
            value: place.ten,
          }))}
        />
        <Select
          defaultValue="Kinh nghiệm làm việc"
          size="large"
          style={{
            width: 300,
          }}
          onChange={(value) => setSearchKinhNghiemValue(value)}
          options={kinhNghiem.map((place) => ({
            label: place.ten,
            value: place.ten,
          }))}
        />
        <Select
          defaultValue="Loại hợp đồng"
          size="large"
          style={{
            width: 300,
          }}
          onChange={(value) => setSearchHopDongValue(value)}
          options={loaiHopDong.map((place) => ({
            label: place.ten,
            value: place.ten,
          }))}
        />
        <Select
          defaultValue="Trạng thái"
          size="large"
          style={{
            width: 300,
          }}
          onChange={(value) => setSearchStateValue(value)}
          options={[
            {
              value: 'Tất cả',
              label: 'Tất cả',
            },
            {
              value: true,
              label: 'true',
            },
            {
              value: false,
              label: 'false',
            },
          ]}
        />
      </div>
      <Heading title="Quản lý bài đăng tuyển dụng" />
      <table className="table table-hover align-middle table-primary">
        <thead className="table-dark">
          <tr className=''>
            <th scope="col">#</th>
            <th scope="col">Chức danh</th>
            <th scope="col">Công ty</th>
            <th scope="col">Liên hệ</th>
            <th scope="col">Mức lương</th>
            <th scope="col" className="text-center">
              Trạng thái
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((item, index) => {
              const id = uuidv4();

              return (
                <tr key={id} className={cx('item-account')}>
                  <td>{index + 1}</td>
                  <td>{item.chucDanh}</td>
                  <td>{item.tenCty}</td>
                  <td className=''>
                    <span className='d-block'>
                      <a href={`tel:${item.soDienThoai}`}>
                        {item.soDienThoai}
                      </a>
                    </span>
                    <span className='d-block'>
                      <a href={`mailto:${item.emailNopHoSo}`}>
                        {item.emailNopHoSo}
                      </a>
                    </span>
                  </td>
                  <td>{item.mucLuong}</td>
                  <td className="text-center">
                    <Switch
                      size="small"
                      checked={item.state}
                      onChange={() => handleUpdateState(item, item.id)}
                      disabled={disabledInputState}
                    />
                    <span onClick={() => router.push(`/quan-ly-bai-dang/${item.id}`)} style={{ cursor: 'pointer', marginTop: "4px" }} className="d-block text-primary">Chi tiết</span>
                  </td>
                </tr>
              );
            })) : (
            <tr>
              <td colSpan="7" className="text-center">Không có kết quả phù hợp</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default JobManage