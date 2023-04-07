import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAllAccountNhaTuyenDung } from '@/services';
import Loading from '@/app/@func/Loading';
import { Image } from 'antd';
import InfoItem from '@/components/InfoItem';
import {
    PhoneFilled,
    ChromeFilled,
    CheckOutlined,
    CloseOutlined,
    TeamOutlined,
    CreditCardFilled,
    SlidersFilled,
    ReconciliationFilled,
} from '@ant-design/icons';
import { FaLocationArrow } from 'react-icons/fa';
import { Switch } from 'antd';
import { swtoast } from '@/mixin/swal.mixin';
import axios from 'axios';
import { backendAPI } from '@/config';

const ThongTinChiTietNhaTuyenDung = () => {
    const router = useRouter();
    const urlParts = router.pathname;

    const [idNhaTuyenDung, setIdNhaTuyenDung] = useState(router.query.id);
    const [DanhSachNhaTuyenDung, setDanhSachNhaTuyenDung] = useState([]);
    const [nhaTuyenDung, setNhaTuyenDung] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [disabledInputState, setDisabledInputState] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);

                const Res = await getAllAccountNhaTuyenDung();

                if (Res && Res.data.length > 0) {
                    setDanhSachNhaTuyenDung(Res.data);

                    const foundNhaTuyenDung = Res.data.find((item) => item.id === idNhaTuyenDung);
                    if (foundNhaTuyenDung) {
                        setNhaTuyenDung(foundNhaTuyenDung);
                    }
                }
            } catch (error) {
                console.log(error);
            }

            setIsLoading(false);
        };

        fetch();
    }, [idNhaTuyenDung]);

    const refreshData = async () => {
        const Res = await getAllAccountNhaTuyenDung();

        if (Res && Res.data.length > 0) {
            setDanhSachNhaTuyenDung(Res.data);

            const foundNhaTuyenDung = Res.data.find((item) => item.id === idNhaTuyenDung);
            if (foundNhaTuyenDung) {
                setNhaTuyenDung(foundNhaTuyenDung);
            }
        }
    };

    const handleUpdateState = async (item, id) => {
        try {
            setDisabledInputState(true);

            // Call the appropriate API based on the current state of the item
            const updatedItem = item.state
                ? await axios.put(backendAPI + '/nha-tuyen-dung/off', { nha_tuyen_dung_id: id })
                : await axios.put(backendAPI + '/nha-tuyen-dung/on', { nha_tuyen_dung_id: id });

            // Update the item state with the new value returned from the API
            console.log(updatedItem);
            refreshData();
        } catch (error) {
            console.error(error);
            swtoast.error({ text: 'Xảy ra lỗi khi thay đổi trạng thái nhà tuyển dụng!' });
        } finally {
            setDisabledInputState(false);
        }
    };

    function converTime(text) {
        const time = new Date(text);
        const createAt = time.toLocaleDateString();
        return createAt;
    }

    return (
        <div className="info-detail-page">
            {isLoading && <Loading />}
            <div className="row">
                <div className="overview-info col-9">
                    <div className="banner-box position-relative">
                        <Image
                            width={'100%'}
                            height={'300px'}
                            style={{
                                objectFit: 'cover',
                            }}
                            className="banner-cty"
                            src={
                                nhaTuyenDung.banner ||
                                'https://t4.ftcdn.net/jpg/04/95/28/65/240_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg'
                            }
                        />
                        <div className="logo-box position-absolute">
                            <Image
                                width={'140px'}
                                height={'140px'}
                                className="logo-cty"
                                src={
                                    nhaTuyenDung.logoCty ||
                                    'https://t4.ftcdn.net/jpg/04/95/28/65/240_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg'
                                }
                            />
                        </div>
                    </div>
                    <h4 className="ten-cty text-center text-uppercase fs-5">{nhaTuyenDung.tenCty}</h4>
                    <div className="gioi-thieu-box">{nhaTuyenDung.gioiThieu}</div>
                </div>
                <div className="col-3">
                    <div className="heading-in-profile text-uppercase fw-bold">Thông tin công ty</div>
                    <div className="info-box">
                        <InfoItem icon={<PhoneFilled />} info={nhaTuyenDung.soDienThoai} />
                        <InfoItem icon={<FaLocationArrow />} info={nhaTuyenDung.diaChi} />
                        <InfoItem icon={<ChromeFilled />} info={nhaTuyenDung.website || 'Chưa cập nhật'} />
                        <InfoItem icon={<TeamOutlined />} info={'Quy mô: ' + (nhaTuyenDung.quiMo || 'Chưa cập nhật')} />
                        <InfoItem icon={<CreditCardFilled />} info={'MST: ' + nhaTuyenDung.maSoThue} />
                        <InfoItem
                            icon={<SlidersFilled />}
                            info={'Loại hình: ' + (nhaTuyenDung.loaiHinhDoanhNghiep || 'Chưa cập nhật')}
                        />
                        <InfoItem
                            icon={<ReconciliationFilled />}
                            info={'Lĩnh vực: ' + (nhaTuyenDung.linhVucNgheNghiep || 'Chưa cập nhật')}
                        />
                    </div>
                    <div
                        className="heading-in-profile text-uppercase fw-bold justify-content-between d-flex align-items-center"
                        style={{ paddingTop: '12px' }}
                    >
                        Trạng thái
                        <Switch
                            size="small"
                            checked={nhaTuyenDung.state}
                            className="d-flex align-items-center"
                            onChange={() => handleUpdateState(nhaTuyenDung, nhaTuyenDung.id)}
                            disabled={disabledInputState}
                        />
                    </div>
                    <div
                        className="heading-in-profile text-uppercase fw-bold justify-content-between d-flex align-items-center"
                        style={{ paddingTop: '12px' }}
                    >
                        Đăng ký
                        <div>{converTime(nhaTuyenDung.created_at)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThongTinChiTietNhaTuyenDung;
