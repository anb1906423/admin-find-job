import React, { Children, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { DeleteFilled, SearchOutlined, DoubleRightOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import Tippy from '@tippyjs/react/headless';
import { Switch, Input } from 'antd';

import styles from './taikhoanungvien.module.scss';
import Heading from '@/components/Heading';
import { getAllAccountUngVien } from '@/services';
import Loading from '@/app/@func/Loading';
import PreViewAccount from '@/app/components/PreViewAccount/PreViewAccount';
import Wrapper from '@/app/components/Popper/Wrapper';
import axios from 'axios';
import { useRouter } from 'next/router';
import { backendAPI } from '../../../config';
import { swalert, swtoast } from '@/mixin/swal.mixin';
import buildAgainData from '@/app/@func/buildAgainData/buildAgainData';

const cx = classNames.bind(styles);

const limit = 2;
const url = '/quan-ly-tai-khoan/ung-vien';
const { Search } = Input;

function TaiKhoanUngVien() {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [email, setEmail] = useState('');
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [disabledInputState, setDisabledInputState] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [metaData, setMetaData] = useState({});

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);

                const Res = await getAllAccountUngVien(currentPage, limit);

                if (Res && Res.data.data.length > 0) {
                    setData((prev) => [...prev, ...Res.data.data]);
                    setMetaData(Res.data.meta);
                    setResult((prev) => [...prev, ...Res.data.data]);
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
            const res = await fetch(backendAPI + '/ung-vien/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });
            const data = await res.json();

            console.log(data);
            setResult(data);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [email]);

    const handleLoadMoreUngVien = () => {
        if (!_.isEmpty(metaData)) {
            if (metaData.nextPage) {
                setCurrentPage(metaData.nextPage);
            }
        }
    };

    const refreshData = async () => {
        const result = await axios.get(backendAPI + `/ung-vien?${currentPage}&limit=${limit}`);
        setData(result.data.data);
    };

    const handleUpdateState = async (item, id) => {
        try {
            setDisabledInputState(true);

            // Call the appropriate API based on the current state of the item
            const updatedItem = item.state
                ? await axios.put(backendAPI + '/ung-vien/off', { ung_vien_id: id })
                : await axios.put(backendAPI + '/ung-vien/on', { ung_vien_id: id });

            // Update the item state with the new value returned from the API
            // console.log('Check updatedItem :', updatedItem.data);

            const dataBuild = buildAgainData(result, updatedItem?.data ? updatedItem?.data : {});

            setData(dataBuild);
            setResult(dataBuild);
            // refreshData();
        } catch (error) {
            console.error(error);
            swtoast.error({ text: 'Xảy ra lỗi khi thay đổi trạng thái ứng viên!' });
        } finally {
            setDisabledInputState(false);
        }
    };

    return (
        <div className={cx('tai-khoan-ung-vien-wp')}>
            {isLoading && <Loading />}
            <Input
                type="text"
                size="large"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email ứng viên"
                style={{ width: 300 }}
                addonAfter={<SearchOutlined />}
            />
            <Heading title="Danh Sách Tài Khoản Ứng Viên" />
            <table className="table table-hover align-middle table-primary">
                <thead className="table-dark">
                    <tr className="">
                        <th scope="col">#</th>
                        <th scope="col">Họ và tên</th>
                        <th scope="col">Email</th>
                        <th scope="col">SĐT</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Vị trí mong muốn</th>
                        <th scope="col" className="text-center">
                            Trạng thái
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* {!_.isEmpty(data) &&
                        data.map((item, index) => {
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
                                    <td className="position-relative">{index + 1}</td>
                                    <td>{item.hoVaTen ? item.hoVaTen : 'None'}</td>
                                    <td>{item.email ? item.email : 'None'}</td>
                                    <td>{item.soDienThoai ? item.soDienThoai : 'None'}</td>
                                    <td>{item.diaChi ? item.diaChi : 'None'}</td>
                                    <td>{item.viTriMongMuon ? item.viTriMongMuon : 'None'}</td>
                                    <td className="text-center">
                                        <Switch
                                            size="small"
                                            defaultChecked={item.state}
                                            onChange={() => {
                                                handleUpdateState(item, item.id);
                                            }}
                                            disabled={disabledInputState}
                                        />
                                        <span
                                            onClick={() => router.push(url + `/${item.id}`)}
                                            style={{ cursor: 'pointer', marginTop: '4px' }}
                                            className="d-block text-primary"
                                        >
                                            Chi tiết
                                        </span>
                                    </td>
                                </tr>
                            );
                        })} */}
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
                                    <td className="position-relative">{index + 1}</td>
                                    <td>{item.hoVaTen ? item.hoVaTen : 'None'}</td>
                                    <td>{item.email ? item.email : 'None'}</td>
                                    <td>{item.soDienThoai ? item.soDienThoai : 'None'}</td>
                                    <td>{item.diaChi ? item.diaChi : 'None'}</td>
                                    <td>{item.viTriMongMuon ? item.viTriMongMuon : 'None'}</td>
                                    <td className="text-center">
                                        <Switch
                                            size="small"
                                            defaultChecked={item.state}
                                            onChange={() => {
                                                handleUpdateState(item, item.id);
                                            }}
                                            disabled={disabledInputState}
                                        />
                                        <span
                                            onClick={() => router.push(url + `/${item.id}`)}
                                            style={{ cursor: 'pointer', marginTop: '4px' }}
                                            className="d-block text-primary"
                                        >
                                            Chi tiết
                                        </span>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">
                                Không có kết quả phù hợp
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {!_.isEmpty(metaData) && metaData.totalPages !== currentPage && (
                <div className={cx('py-4', 'xem-them')}>
                    <button onClick={handleLoadMoreUngVien} className="d-flex justify-content-between align-items-center">
                        <DoubleRightOutlined />
                    </button>
                </div>
            )}
        </div>
    );
}

TaiKhoanUngVien.propTypes = {};

export default TaiKhoanUngVien;
