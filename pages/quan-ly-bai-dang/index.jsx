import React, { useState, useEffect } from 'react'
import Heading from '@/components/Heading'
import classNames from 'classnames/bind';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { backendAPI } from '@/config'
import styles from '../../components/ManageAccount/TaiKhoanNhaTuyenDung/taikhoannhatuyendung.module.scss';
import { Switch } from 'antd';
import { swtoast } from '@/mixin/swal.mixin';
import Detail from '../../components/JobDetail'
import { useRouter } from 'next/router';
const cx = classNames.bind(styles);

const JobManage = () => {
  const router = useRouter()
  const [jobs, setJobs] = useState([])
  const [disabledInputState, setDisabledInputState] = useState(false);

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

  return (
    <div className='job-management'>
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
          {jobs.length > 0 ? (
            jobs.map((item, index) => {
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