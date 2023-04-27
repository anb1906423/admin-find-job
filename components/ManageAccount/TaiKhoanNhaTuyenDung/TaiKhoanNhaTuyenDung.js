import React, { Children, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import Tippy from '@tippyjs/react/headless';
import { SearchOutlined, SettingOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Switch, Input } from 'antd';

import styles from './taikhoannhatuyendung.module.scss';
import Heading from '@/components/Heading';
import { getAllAccountNhaTuyenDung } from '@/services';
import Loading from '@/app/@func/Loading';
import PreViewAccount from '@/app/components/PreViewAccount/PreViewAccount';
import Wrapper from '@/app/components/Popper/Wrapper';
import axios from 'axios';
import { useRouter } from 'next/router';
import { backendAPI } from '../../../config';
import { swalert, swtoast } from '@/mixin/swal.mixin';

const cx = classNames.bind(styles);
const url = '/quan-ly-tai-khoan/nha-tuyen-dung'
function TaiKhoanNhaTuyenDung() {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [result, setResult] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [disabledInputState, setDisabledInputState] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [metaData, setMetaData] = useState({});

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);

                const Res = await getAllAccountNhaTuyenDung();

                if (Res && Res.data.length > 0) {
                    setData(Res.data);
                    setResult(Res.data)
                    setMetaData(Res.data.meta);

                }
            } catch (error) {
                console.log(error);
            }

            setIsLoading(false);
        };

        fetch();
    }, [currentPage]);

    const handleSearch = async () => {
        if (!email) {
            setResult(data);
        } else {
            const res = await fetch(backendAPI + '/nha-tuyen-dung/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });
            const data = await res.json();
            setResult(data);
        }
    };

    useEffect(() => {
        handleSearch()
    }, [email])

    const handleLoadMoreCompany = () => {
        if (!_.isEmpty(metaData)) {
            if (metaData.nextPage) {
                setCurrentPage(metaData.nextPage);
            }
        }
    };

    const refreshData = async () => {
        const result = await axios.get(backendAPI + '/nha-tuyen-dung');
        setData(result.data);
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

    const PreviewAccount = (item) => {
        return (
            <Wrapper>
                <PreViewAccount isNhaTuyenDung={true} data={item} />
            </Wrapper>
        );
    };

    return (
        <div className={cx('tai-khoan-ung-vien-wp')}>
            {isLoading && <Loading />}
            <Input
                type="text"
                size="large"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email nhà tuyển dụng"
                style={{ width: 300 }}
                addonAfter={<SearchOutlined />}
            />
            <Heading title="Danh Sách Tài Khoản Nhà Tuyển Dụng" />
            <table className="table table-hover align-middle table-primary">
                <thead className="table-dark">
                    <tr className=''>
                        <th scope="col">#</th>
                        <th scope="col">Tên công ty</th>
                        <th scope="col">Email</th>
                        <th scope="col">SĐT</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Mã số thuế</th>
                        <th scope="col" className="text-center">
                            Trạng thái
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {result.length > 0 ? (
                        result.map((item, index) => {
                            const id = uuidv4();

                            return (
                                // <Tippy
                                //     key={id}
                                //     delay={[50, 100]}
                                //     placement="bottom-start"
                                //     render={() => PreviewAccount(item)}
                                // >
                                // </Tippy>
                                <tr key={id} className={cx('item-account')}>
                                    <td>{index + 1}</td>
                                    <td>{item.tenCty ? item.tenCty : 'None'}</td>
                                    <td>{item.email ? item.email : 'None'}</td>
                                    <td>{item.soDienThoai ? item.soDienThoai : 'None'}</td>
                                    <td>{item.diaChi ? item.diaChi : 'None'}</td>
                                    <td>{item.maSoThue ? item.maSoThue : 'None'}</td>
                                    <td className="text-center">
                                        <Switch
                                            size="small"
                                            checked={item.state}
                                            onChange={() => handleUpdateState(item, item.id)}
                                            disabled={disabledInputState}
                                        />
                                        <span onClick={() => router.push(url + `/${item.id}`)} style={{ cursor: 'pointer', marginTop: "4px" }} className="d-block text-primary">Chi tiết</span>
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
            {!_.isEmpty(metaData) && metaData.totalPages !== currentPage && (
                <div className={cx('py-4', 'xem-them')}>
                    <button onClick={handleLoadMoreCompany} className="d-flex justify-content-between align-items-center">
                        <DoubleRightOutlined />
                    </button>
                </div>
            )}
        </div>
    );
}

TaiKhoanNhaTuyenDung.propTypes = {};

export default TaiKhoanNhaTuyenDung;
