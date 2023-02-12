import React, { Children, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import Tippy from '@tippyjs/react/headless';

import styles from './taikhoanungvien.module.scss';
import Heading from '@/components/Heading';
import { getAllAccountUngVien } from '@/services';
import Loading from '@/app/@func/Loading';
import PreViewAccount from '@/app/components/PreViewAccount/PreViewAccount';
import Wrapper from '@/app/components/Popper/Wrapper';

const cx = classNames.bind(styles);

function TaiKhoanUngVien() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Họ và tên</th>
                        <th scope="col">Email</th>
                        <th scope="col">SDT</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Vị trí mong muốn</th>
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
                                    <tr key={id}>
                                        <td>{index + 1}</td>
                                        <td>{item.hoVaTen ? item.hoVaTen : 'Đang Cập Nhật'}</td>
                                        <td>{item.email ? item.email : 'Đang Cập Nhật'}</td>
                                        <td>{item.soDienThoai ? item.soDienThoai : 'Đang Cập Nhật'}</td>
                                        <td>{item.diaChi ? item.diaChi : 'Đang Cập Nhật'}</td>
                                        <td>{item.viTriMongMuon ? item.viTriMongMuon : 'Đang Cập Nhật'}</td>
                                        <td className="text-center">
                                            <button className="btn" title="Xóa tài khoản ứng viên">
                                                <i class="bi bi-trash2"></i>
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

TaiKhoanUngVien.propTypes = {};

export default TaiKhoanUngVien;

{
    /* <div>
                <div className={cx('header')}>
                    <div className={cx('item-header')}>#</div>
                    <div className={cx('item-header')}>Họ và tên</div>
                    <div className={cx('item-header')}>Email</div>
                    <div className={cx('item-header')}>SDT</div>
                    <div className={cx('item-header')}>Địa chỉ</div>
                    <div className={cx('item-header')}>Vị trí mong muốn</div>
                    <div className={cx('item-header')}> Hành động</div>
                </div>
                <div className={cx('body')}>
                    {!_.isEmpty(data) &&
                        data.map((item, index) => {
                            const id = uuidv4();

                            return (
                                <div key={id} className={cx('body-content')}>
                                    <Tippy
                                        delay={[50, 10000000]}
                                        placement="bottom-start"
                                        interactive
                                        render={() => PreviewAccount(item)}
                                    >
                                        <div className={cx('item-body')}>{index + 1}</div>
                                    </Tippy>
                                    <div className={cx('item-body')}>
                                        <span>{item.hoVaTen ? item.hoVaTen : 'Đang Cập Nhật'}</span>
                                    </div>
                                    <div className={cx('item-body')}>
                                        <span>{item.email ? item.email : 'Đang Cập Nhật'}</span>
                                    </div>
                                    <div className={cx('item-body')}>
                                        <span>{item.soDienThoai ? item.soDienThoai : 'Đang Cập Nhật'}</span>
                                    </div>
                                    <div className={cx('item-body')}>
                                        <span>{item.diaChi ? item.diaChi : 'Đang Cập Nhật'}</span>
                                    </div>
                                    <div className={cx('item-body')}>
                                        <span>{item.viTriMongMuon ? item.viTriMongMuon : 'Đang Cập Nhật'}</span>
                                    </div>
                                    <div className={cx('item-body')}>
                                        <button className="btn" title="Xóa tài khoản ứng viên">
                                            <i class="bi bi-trash2"></i>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div> */
}
