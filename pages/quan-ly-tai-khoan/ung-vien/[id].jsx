import React, { useState, useEffect } from 'react';
import { getAllAccountUngVien } from '@/services';
import { useRouter } from 'next/router';
import Loading from '@/app/@func/Loading/Loading';
import InfoItem from '@/components/InfoItem';
import {
    CreditCardFilled,
    HeartOutlined,
    PhoneFilled,
    ReconciliationFilled,
    RocketOutlined,
    SlidersFilled,
    TeamOutlined,
    UserDeleteOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { FaLocationArrow } from 'react-icons/fa';
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
                                    height={'440px'}
                                    style={{
                                        objectFit: 'cover',
                                    }}
                                    className="banner-cty"
                                    src={
                                        ungVien.avatar ||
                                        'https://t4.ftcdn.net/jpg/04/95/28/65/240_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg'
                                    }
                                />
                                <div className="logo-box position-absolute">
                                    <Image
                                        width={'140px'}
                                        height={'140px'}
                                        className="logo-cty"
                                        src={
                                            ungVien.avatar ||
                                            'https://t4.ftcdn.net/jpg/04/95/28/65/240_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg'
                                        }
                                    />
                                </div>
                            </div>
                            <h4 className="ten-cty text-center text-uppercase fs-5">{ungVien.hoVaTen}</h4>
                            <div className="gioi-thieu-box">
                                <div>
                                    <p className="fw-bold">Giới thiệu về ứng viên</p>
                                    <p>{ungVien.gioiThieu || 'Đang cập nhật'}</p>
                                </div>
                            </div>
                            <div className="my-4">
                                <div>
                                    <p className="fw-bold">Mục tiêu nghề nghiệp </p>
                                    <p>{ungVien.mucTieuNgheNghiep || 'Đang cập nhật'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="heading-in-profile text-uppercase fw-bold">Thông tin ứng viên</div>
                            <div className="info-box">
                                <InfoItem icon={<UserOutlined />} info={ungVien.email} />
                                <InfoItem icon={<PhoneFilled />} info={ungVien.soDienThoai} />
                                <InfoItem icon={<FaLocationArrow />} info={ungVien.diaChi} />
                                <InfoItem icon={<RocketOutlined />} info={converTime(ungVien.sinhNhat)} />
                                <InfoItem
                                    icon={<UserDeleteOutlined />}
                                    info={
                                        ungVien.isMale === true || ungVien.isMale === false
                                            ? ungVien.isMale
                                                ? 'Nam'
                                                : 'Nữ'
                                            : 'chưa cập nhật'
                                    }
                                />
                                <InfoItem
                                    icon={<HeartOutlined />}
                                    info={
                                        ungVien.docThan === true || ungVien.docThan === false
                                            ? ungVien.docThan
                                                ? 'độc thân'
                                                : 'không độc thân hoặc không muốn tiếp lộ'
                                            : 'chưa cập nhật'
                                    }
                                />
                                <InfoItem
                                    icon={<TeamOutlined />}
                                    info={'Kinh nghiệm: ' + (ungVien.kinhNghiem || 'Chưa cập nhật')}
                                />
                                <InfoItem
                                    icon={<CreditCardFilled />}
                                    info={'Cấp bậc: ' + ungVien.capBac ? ungVien.capBac : 'Đang cập nhật'}
                                />
                                <InfoItem
                                    icon={<SlidersFilled />}
                                    info={'Vị trí mong muốn: ' + (ungVien.viTriMongMuon || 'Chưa cập nhật')}
                                />
                                <InfoItem
                                    icon={<SlidersFilled />}
                                    info={'Mức lương mong muốn: ' + (ungVien.mucLuongMongMuon || 'Chưa cập nhật')}
                                />
                                <InfoItem
                                    icon={<SlidersFilled />}
                                    info={'Học vấn: ' + (ungVien.hocVan || 'Chưa cập nhật')}
                                />
                                <InfoItem
                                    icon={<ReconciliationFilled />}
                                    info={'Lĩnh vực: ' + (ungVien.linhVucNgheNghiep || 'Chưa cập nhật')}
                                />
                                <InfoItem
                                    icon={<ReconciliationFilled />}
                                    info={
                                        'Địa điểm muốn làm việc: ' + (ungVien.diaDiemMongMuonLamViec || 'Chưa cập nhật')
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
