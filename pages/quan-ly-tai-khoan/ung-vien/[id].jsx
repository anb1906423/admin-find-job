import React, { useState, useEffect } from 'react';
import { getAllAccountUngVien } from '@/services';
import { useRouter } from 'next/router';
import Loading from '@/app/@func/Loading/Loading';
import InfoItem from '@/components/InfoItem';
import {
    CreditCardFilled,
    PhoneFilled,
    SlidersFilled,
    TeamOutlined,
} from '@ant-design/icons';
import { FaLocationArrow, FaBirthdayCake, FaHandHoldingHeart, FaTransgender, FaMailBulk, FaSearchLocation } from 'react-icons/fa';
import { Image, Switch } from 'antd';
import { swtoast } from '@/mixin/swal.mixin';
import { backendAPI } from '@/config';
import axios from 'axios';

const limit = 100;

const ThongTinChiTietUngVien = () => {
    const router = useRouter();
    const urlParts = router.pathname;

    const [idUngVien, setIdUngVien] = useState(router.query.id);
    const [DanhSachUngVien, setDanhSachUngVien] = useState([]);
    const [ungVien, setUngVien] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [disabledInputState, setDisabledInputState] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [metaData, setMetaData] = useState({});

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);

                const Res = await getAllAccountUngVien(currentPage, limit);

                console.log(Res);

                if (Res && Res.data.data.length > 0) {
                    setDanhSachUngVien(Res.data.data);

                    const foundUngVien = Res.data.data.find((item) => item.id === idUngVien);
                    if (foundUngVien) {
                        setUngVien(foundUngVien);
                    }
                }
            } catch (error) {
                console.log(error);
            }

            setIsLoading(false);
        };

        fetch();
    }, [idUngVien, currentPage]);

    const refreshData = async () => {
        const Res = await getAllAccountUngVien(currentPage, limit);

        if (Res && Res.data.length > 0) {
            setUngVien(Res.data.data);

            const foundNhaTuyenDung = Res.data.data.find((item) => item.id === idUngVien);
            if (foundNhaTuyenDung) {
                setUngVien(foundNhaTuyenDung);
            }
        }
    };

    function converTime(text) {
        const time = new Date(text);
        const createAt = time.toLocaleDateString();
        return createAt;
    }

    const handleUpdateState = async (item, id) => {
        try {
            setDisabledInputState(true);

            // Call the appropriate API based on the current state of the item
            const updatedItem = item.state
                ? await axios.put(backendAPI + '/ung-vien/off', { ung_vien_id: id })
                : await axios.put(backendAPI + '/ung-vien/on', { ung_vien_id: id });

            // Update the item state with the new value returned from the API
            console.log(updatedItem);
            // refreshData();
            setUngVien(updatedItem?.data);
        } catch (error) {
            console.error(error);
            swtoast.error({ text: 'Xảy ra lỗi khi thay đổi trạng thái ứng viên!' });
        } finally {
            setDisabledInputState(false);
        }
    };

    return (
        <div className="info-detail-page">
            {isLoading && <Loading />}
            {!_.isEmpty(ungVien) && (
                <>
                    <div className="row">
                        <div className="overview-info col-9">
                            <div className="banner-box position-relative">
                                <Image
                                    width={'100%'}
                                    height={'120px'}
                                    style={{
                                        objectFit: 'cover',
                                    }}
                                    preview={false}
                                    className="banner-cty"
                                    src={
                                        'https://images.unsplash.com/photo-1588421357574-87938a86fa28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60'
                                    }
                                />
                                <div style={{
                                    bottom: "-70px",
                                    left: "13%",
                                    transform: "translateX(-50%)",
                                    borderRadius: "50%"
                                }} className="logo-box-uv position-absolute">
                                    <div className="position-rea">
                                        <Image
                                            width={'140px'}
                                            height={'140px'}
                                            className="logo-cty"
                                            src={
                                                ungVien.avatar ||
                                                'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png'
                                            }
                                        />
                                        <h4 className="ten-uv text-light text-uppercase fs-5 position-absolute">{ungVien.hoVaTen}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="main-info">
                                <div className="row">
                                    <div className="col-4">
                                        <div className="main-info-item d-flex justify-content-start align-items-center position-relative">
                                            <FaBirthdayCake />
                                            <p style={{ margin: '0', paddingLeft: '8px' }}>{converTime(ungVien.sinhNhat)}</p>
                                        </div>
                                        <div className="main-info-item d-flex justify-content-start align-items-center position-relative">
                                            <PhoneFilled />
                                            <p style={{ margin: '0', paddingLeft: '8px' }}>{ungVien.soDienThoai}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="main-info-item d-flex justify-content-start align-items-center position-relative">
                                            <FaTransgender />
                                            <p style={{ margin: '0', paddingLeft: '8px' }}>
                                                {
                                                    ungVien.isMale == true ? "Nam" : "Nữ"
                                                }
                                            </p>
                                        </div>
                                        <div className="main-info-item d-flex justify-content-start align-items-center position-relative">
                                            <FaHandHoldingHeart />
                                            <p style={{ margin: '0', paddingLeft: '8px' }}>
                                                {
                                                    ungVien.docThan == true ? "Độc thân" : "Đã kết hôn"
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="main-info-item d-flex justify-content-start align-items-center position-relative">
                                            <FaLocationArrow />
                                            <p style={{ margin: '0', paddingLeft: '8px' }}>{ungVien.diaChi}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="gioi-thieu-box position-relative">
                                <div className="row">
                                    <div className="col-6">
                                        <p style={{ margin: "0" }}>
                                            <strong>Vị trí mong muốn: </strong>
                                            {ungVien.viTriMongMuon || 'Đang cập nhật'}
                                        </p>
                                    </div>
                                    <div className="col-6">
                                        <p style={{ margin: "0" }}>
                                            <strong>Mức lương mong muốn: </strong>
                                            {ungVien.mucLuongMongMuon}
                                        </p>
                                    </div>
                                </div>
                                <div className='my-2'>
                                    <div>
                                        <p className="fw-bold">Giới thiệu về ứng viên</p>
                                        <p style={{ whiteSpace: "pre-line" }} className='detail'>{ungVien.gioiThieu || 'Đang cập nhật'}</p>
                                    </div>
                                </div>
                                <div className="my-2">
                                    <div>
                                        <p className="fw-bold">Mục tiêu nghề nghiệp </p>
                                        <p style={{ whiteSpace: "pre-line" }} className='detail'>{ungVien.mucTieuNgheNghiep || 'Đang cập nhật'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="heading-in-profile text-uppercase fw-bold">Thông tin ứng viên</div>
                            <div className="info-box">
                                <InfoItem icon={<FaMailBulk />} info={ungVien.email} />
                                <InfoItem
                                    icon={<TeamOutlined />}
                                    info={'Kinh nghiệm: ' + (ungVien.kinhNghiem || 'Đang cập nhật')}
                                />
                                <InfoItem
                                    icon={<CreditCardFilled />}
                                    info={'Cấp bậc: ' + (ungVien.capBac || 'Đang cập nhật')}
                                />
                                <InfoItem
                                    icon={<SlidersFilled />}
                                    info={'Học vấn: ' + (ungVien.hocVan || 'Đang cập nhật')}
                                />
                                <InfoItem
                                    icon={<FaSearchLocation />}
                                    info={
                                        'Địa điểm muốn làm việc: ' + (ungVien.diaDiemMongMuonLamViec.length == 0 ? 'Đang cập nhật' : ungVien.diaDiemMongMuonLamViec)
                                    }
                                />
                            </div>
                            <div
                                className="heading-in-profile text-uppercase fw-bold justify-content-between d-flex align-items-center"
                                style={{ paddingTop: '12px' }}
                            >
                                Trạng thái
                                <Switch
                                    size="small"
                                    checked={ungVien.state}
                                    className="d-flex align-items-center"
                                    onChange={() => handleUpdateState(ungVien, ungVien.id)}
                                    disabled={disabledInputState}
                                />
                                {/*  */}
                            </div>
                            <div
                                className="heading-in-profile text-uppercase fw-bold justify-content-between d-flex align-items-center"
                                style={{ paddingTop: '12px' }}
                            >
                                Đăng ký
                                <div>{converTime(ungVien.created_at)}</div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ThongTinChiTietUngVien;
