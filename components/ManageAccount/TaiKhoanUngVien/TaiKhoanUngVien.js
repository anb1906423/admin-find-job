import React, { Children, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { DeleteFilled } from '@ant-design/icons';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import Tippy from '@tippyjs/react/headless';
import { Switch } from 'antd';

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

const cx = classNames.bind(styles);
const url = '/quan-ly-tai-khoan/ung-vien'

function TaiKhoanUngVien() {
    const router = useRouter()
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [disabledInputState, setDisabledInputState] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);

                const Res = await getAllAccountUngVien();

                if (Res && Res.data.length > 0) {
                    setData(Res.data);
                }
            } catch (error) {
                console.log(error);
            }

            setIsLoading(false);
        };

        fetch();
    }, []);

    const refreshData = async () => {
        const result = await axios.get(backendAPI + '/ung-vien');
        setData(result.data);
    };

    const handleUpdateState = async (item, id) => {
        try {
            setDisabledInputState(true);

            // Call the appropriate API based on the current state of the item
            const updatedItem = item.state
                ? await axios.put(backendAPI + '/ung-vien/off', { ung_vien_id: id })
                : await axios.put(backendAPI + '/ung-vien/on', { ung_vien_id: id });

            // Update the item state with the new value returned from the API
            console.log(updatedItem);
            refreshData();
        } catch (error) {
            console.error(error);
            swtoast.error({ text: 'Xảy ra lỗi khi thay đổi trạng thái ứng viên!' });
        } finally {
            setDisabledInputState(false);
        }
    };

    const PreviewAccount = (item) => {
        return (
            <Wrapper>
                <PreViewAccount data={item} />
            </Wrapper>
        );
    };

    return (
        <div className={cx('tai-khoan-ung-vien-wp')}>
            {isLoading && <Loading />}
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
                    {!_.isEmpty(data) &&
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
                                    <td className='position-relative'>
                                        {index + 1}
                                    </td>
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
                                                handleUpdateState(item, item.id)
                                            }}
                                            disabled={disabledInputState}
                                        />
                                        <span onClick={() => router.push(url + `/${item.id}`)} style={{ cursor: 'pointer', marginTop: "4px" }} className="d-block text-primary">Chi tiết</span>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <div className={cx('btn-next', 'd-flex', 'justify-content-center', 'py-4')}>
                <button className="btn btn-primary">Xem Thêm Tài Khoản</button>
            </div>
        </div>
    );
}

TaiKhoanUngVien.propTypes = {};

export default TaiKhoanUngVien;
