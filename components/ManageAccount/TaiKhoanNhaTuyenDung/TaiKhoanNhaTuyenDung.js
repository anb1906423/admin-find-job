import React, { Children, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import Tippy from '@tippyjs/react/headless';

import styles from './taikhoannhatuyendung.module.scss';
import Heading from '@/components/Heading';
import { getAllAccountNhaTuyenDung } from '@/services';
import Loading from '@/app/@func/Loading';
import PreViewAccount from '@/app/components/PreViewAccount/PreViewAccount';
import Wrapper from '@/app/components/Popper/Wrapper';

const cx = classNames.bind(styles);

function TaiKhoanNhaTuyenDung() {
    const [data, setData] = useState([]);
    const [number, setNumber] = useState(9);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);

                const Res = await getAllAccountNhaTuyenDung();

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
            <Heading title="Danh Sách Tài Khoản Ứng Viên" />
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên nhà tuyển dụng</th>
                        <th scope="col">Email</th>
                        <th scope="col">SDT</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Mã số thuế</th>
                        <th scope="col" className="text-center">
                            Hành động
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {!_.isEmpty(data) &&
                        data.map((item, index) => {
                            const id = uuidv4();

                            return (
                                <Tippy
                                    key={id}
                                    delay={[50, 100]}
                                    placement="bottom-start"
                                    render={() => PreviewAccount(item)}
                                >
                                    <tr key={id} className={cx('item-account')}>
                                        <td>{index + 1}</td>
                                        <td>{item.tenCty ? item.tenCty : 'Đang Cập Nhật'}</td>
                                        <td>{item.email ? item.email : 'Đang Cập Nhật'}</td>
                                        <td>{item.soDienThoai ? item.soDienThoai : 'Đang Cập Nhật'}</td>
                                        <td>{item.diaChi ? item.diaChi : 'Đang Cập Nhật'}</td>
                                        <td>{item.maSoThue ? item.maSoThue : 'Đang Cập Nhật'}</td>
                                        <td className="text-center">
                                            <button className="btn" title="Xóa tài khoản ứng viên">
                                                <i className="bi bi-trash2"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </Tippy>
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

TaiKhoanNhaTuyenDung.propTypes = {};

export default TaiKhoanNhaTuyenDung;
