import React, { useEffect, useState, useContext } from 'react';
import { DollarCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import HeadingInDetailJob from '@/components/HeadingInDetailJob';
import {
    FaBusinessTime,
    FaAddressCard,
    FaUserFriends,
    FaIndent,
    FaUsersCog,
    FaVenusMars,
    FaIdCardAlt,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaChrome,
    FaEdit,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { Switch } from 'antd'
import { swtoast } from '@/mixin/swal.mixin';
import axios from 'axios';
import { backendAPI } from '@/config';
import { formatDate } from '@/services/formatDate';

const ChiTietCongViec = (props) => {
    const router = useRouter()
    const param = router.query.id
    const [job, setJob] = useState({})
    const [jobs, setJobs] = useState([])

    function convertTime(timeString) {
        const date = new Date(timeString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}-${month}-${year}`;
    }

    // config ung vien submit ung tuyen
    const role = useSelector((state) => state.user.role);
    const userInfo = useSelector((state) => state.user.userInfo);
    const [disabledInputState, setDisabledInputState] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

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
    }, [job])

    const refreshJob = () => {
        // const result = axios.get(backendAPI + `/cong-viec/${param}`)
        // setJob(result.data)
        jobs & jobs.map((item, index) => {
            if (item.id == param) {
                setJob(item)
            }
        })
    }

    useEffect(() => {
        jobs & jobs.map((item, index) => {
            if (item.id == param) {
                setJob(item)
            }
        })
    }, [jobs])

    const updateState = async (item, id) => {
        try {
            setDisabledInputState(true);

            // Call the appropriate API based on the current state of the item
            const updatedItem = item.state
                ? await axios.put(backendAPI + '/cong-viec/off', { cong_viec_id: id })
                : await axios.put(backendAPI + '/cong-viec/on', { cong_viec_id: id });

            // Update the item state with the new value returned from the API
            // refreshData();

            refreshJob()
        } catch (error) {
            console.error(error);
            swtoast.error({ text: 'Xảy ra lỗi khi thay đổi trạng thái bài đăng!' });
        } finally {
            setDisabledInputState(false);
        }
    };

    return (
        <>
            {isLoading && <Loading title="Đang gửi thông tin của bạn tới nhà tuyển dụng!" />}
            {/* <Modal
                open={job.isOpen}
                onCancel={() => job.setIsOpen(false)}
                width={1020}
                footer={null}
                style={{
                    top: 0,
                }}
            > */}
            <div className="job-detail-wrap">
                <div className="job-detail-header position-relative">
                    <div className="row">
                        <div className="col-2 d-flex justify-content-center align-items-center">
                            <img
                                src={
                                    job.logoCty ||
                                    'https://thumbs.dreamstime.com/b/vintage-rusty-metal-sign-white-background-hiring-hiring-98774212.jpg'
                                }
                                alt=""
                            />
                        </div>
                        <div className="col-8">
                            <h6 className="text-uppercase chuc-danh mt-1">{job.chucDanh}</h6>
                            <h6 className="mt-1">{job.tenCty}</h6>
                            <h6 className="mt-1 dia-chi">{job.diaChi}</h6>
                            <div className="d-flex row">
                                <p className="d-flex align-items-center col-6 mt-1">
                                    <DollarCircleOutlined />
                                    <p>
                                        <strong>Mức lương: </strong>
                                        {job.mucLuong}
                                    </p>
                                </p>
                                <p className="d-flex align-items-center col-6 mt-1">
                                    <ClockCircleOutlined />
                                    <p>
                                        <strong>Hạn nộp hồ sơ: </strong>
                                        {convertTime(job.hanNopHoSo)}
                                    </p>
                                </p>
                            </div>
                        </div>
                        <div className="col-2">
                            <p className='d-flex align-items-center'>
                                <strong>
                                    Trạng thái:&nbsp;
                                </strong>
                                <Switch
                                    size="small"
                                    checked={job.state}
                                    onChange={() => updateState(job, job.id)}
                                    disabled={disabledInputState}
                                />
                            </p>
                            <p className='mt-2'>
                                <strong>
                                    Ngày đăng:&nbsp;
                                </strong><br />
                                {formatDate(job.created_at)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="job-detail-body">
                    <div className="row">
                        <div className="col-8 left-body position-relative">
                            <div className="row box-content">
                                <div className="col-6">
                                    <div className="d-flex align-items-center content-item">
                                        <FaBusinessTime />
                                        <p className="">
                                            <strong>Kinh nghiệm:</strong>&nbsp;{job.kinhNghiem}
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center content-item">
                                        <FaAddressCard />
                                        <p className="">
                                            <strong>Yêu cầu bằng cấp:</strong>&nbsp;{job.bangCap}
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center content-item">
                                        <FaUserFriends />
                                        <p className="">
                                            <strong>Số lượng cần tuyển:</strong>&nbsp;{job.soLuong}
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center content-item">
                                        <FaIndent />
                                        <p className="">
                                            <strong>Ngành nghề:</strong>&nbsp;{job.linhVucNgheNghiep}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex align-items-center content-item">
                                        <FaUsersCog />
                                        <p className="">
                                            <strong>Chức vụ:</strong>&nbsp;{job.capBac}
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center content-item">
                                        <FaVenusMars />
                                        <p className="">
                                            <strong>Yêu cầu giới tính:</strong>&nbsp;{job.yeuCauGioiTinh}
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center content-item">
                                        <FaIdCardAlt />
                                        <p className="">
                                            <strong>Hình thức làm việc:</strong>&nbsp;{job.loaiHopDong}
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center content-item">
                                        <FaMapMarkerAlt />
                                        <p className="">
                                            <strong>Địa điểm làm việc:</strong>&nbsp;{job.diaDiemLamViec}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="re-line job-des-wrap box-content">
                                    <HeadingInDetailJob title="Mô tả công việc" />
                                    <div className="job-des">{job.moTa}</div>
                                </div>
                                <div className="re-line job-require-wrap box-content">
                                    <HeadingInDetailJob title="Yêu cầu công việc" />
                                    <div className="job-des">{job.yeuCauTuyenDung}</div>
                                </div>
                                <div className="job-benefit-wrap box-content">
                                    <HeadingInDetailJob title="Quyền lợi được hưởng" />
                                    <div
                                        className="job-des re-line custom-line"
                                        dangerouslySetInnerHTML={{
                                            __html: `${job.contentHTML}`,
                                        }}
                                    ></div>
                                </div>
                                <div className="job-require-file-wrap box-content">
                                    <HeadingInDetailJob title="Yêu cầu hồ sơ" />
                                    <div className="re-line job-des">{job.yeuCauHoSo}</div>
                                </div>
                            </div>
                            <div className="job-contact-info-wrap box-content">
                                <HeadingInDetailJob title="Thông tin liên hệ" />
                                <div className="job-des">
                                    <div className="d-flex align-items-center content-item">
                                        <FaMapMarkerAlt />
                                        <p>
                                            <strong>Địa chỉ: </strong>
                                            {job.diaChi}
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center content-item">
                                        <FaPhoneAlt />
                                        <p>
                                            <strong>Số điện thoại:&nbsp; </strong>
                                            <a href={`tel:${job.soDienThoai}`}>{job.soDienThoai}</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="job-contact-info-wrap box-content">
                                <HeadingInDetailJob title="Cách nộp hồ sơ" />
                                <div className="job-des">
                                    <div className="to-apply">
                                        <strong className="content-item">
                                            Cách 1: Nộp trực tiếp tại văn phòng
                                        </strong>
                                        <div className="d-flex align-items-center content-item">
                                            <p>Địa chỉ nộp: {job.diaChiNopTrucTiep}</p>
                                        </div>
                                    </div>
                                    <div className="to-apply">
                                        <strong className="content-item">
                                            Cách 2: Nộp hồ sơ qua email
                                        </strong>
                                        <div className="d-flex align-items-center content-item">
                                            <p>Bấm vào nút "NỘP HỒ SƠ" để gửi hồ sơ đến nhà tuyển dụng</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>
                                    * Hạn nộp:{' '}
                                    <strong className="text-danger">{convertTime(job.hanNopHoSo)}</strong>
                                </p>
                            </div>
                        </div>
                        <div className="col-4 right-body">
                            <div className="right-body-item">
                                <h6 className="heading text-uppercase text-center">thông tin công ty</h6>
                                <div className="d-flex align-items-center content-item">
                                    <FaMapMarkerAlt />
                                    <p>{job.diaChi}</p>
                                </div>
                                <div className="d-flex align-items-center content-item">
                                    <FaPhoneAlt />
                                    <p>
                                        <a href={`tel:${job.soDienThoai}`}>{job.soDienThoai}</a>
                                    </p>
                                </div>
                                <div className="d-flex align-items-center content-item">
                                    <FaChrome />
                                    <a target="_blank" href={job.website}>
                                        <p>{job.website}</p>
                                    </a>
                                </div>
                                <div className="d-flex align-items-center content-item">
                                    <FaEdit />
                                    <a href="">
                                        <p>Xem chi tiết công ty</p>
                                    </a>
                                </div>
                            </div>
                            <div className="right-body-item">
                                <h6 className="heading text-uppercase text-center">Việc làm cùng công ty</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </Modal> */}
        </>
    );
};

export default ChiTietCongViec;