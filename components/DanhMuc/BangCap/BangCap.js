import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './bangcap.module.scss';
import Loading from '@/app/@func/Loading/Loading';

const cx = classNames.bind(styles);

function BangCapComponent(props) {
    // nếu isAddBangCap = true thì sẽ cho add không thì ta sẽ show ra tất cả bằng cấp hiện có
    const [isAddBangCap, setIsAddBangCap] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={cx('wp')}>
            {isLoading && <Loading />}
            <div className={cx('wp-btn-switch')}>
                <button
                    onClick={() => setIsAddBangCap(false)}
                    className={cx('btn', isAddBangCap ? 'btn-primary' : 'btn-warning')}
                >
                    Tất cả bằng cấp
                </button>
                <button
                    onClick={() => setIsAddBangCap(true)}
                    className={cx('btn', isAddBangCap ? 'btn-warning' : 'btn-primary')}
                >
                    Thêm bằng cấp
                </button>
            </div>
            <div className={cx('content')}>
                {isAddBangCap ? (
                    <div className={cx('content-item')}>
                        <h3 className="text-center pb-3">Thêm mới bằng cấp</h3>
                        <div className={cx('content-body-render')}>
                            <div className={cx('wp-form')}>
                                <form>
                                    <div className={cx('item')}>
                                        <label htmlFor="hoten">Tên bằng cấp của bạn</label>
                                        <input
                                            className="form-control"
                                            id="hoten"
                                            placeholder="eg: Bằng đại học cử nhân"
                                            required
                                        />
                                    </div>
                                    <div className={cx('item')}>
                                        <label htmlFor="don-vi-dao-tao">Đơn vị đào tạo</label>
                                        <input
                                            className="form-control"
                                            id="don-vi-dao-tao"
                                            placeholder="eg: Đại Học Cần Thơ"
                                            required
                                        />
                                    </div>
                                    <div className={cx('item')}>
                                        <label htmlFor="xep-loai">Xếp loại</label>
                                        <input
                                            className="form-control"
                                            id="xep-loai"
                                            placeholder="eg: Giỏi, khá, trung bình, xuất sắc"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <button className="btn btn-success">Thêm mới bằng cấp</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={cx('content-item')}>
                        <h3 className="text-center pb-3">Tất cả bằng cấp của bạn</h3>
                        <div className={cx('content-body-render')}>
                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Tên</th>
                                        <th scope="col">Đơn vị đào tạo</th>
                                        <th scope="col">Xếp loại</th>
                                        <th scope="col">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Bằng cử nhân</td>
                                        <td>Đại học cần thơ</td>
                                        <td>Xuất Sắc</td>
                                        <td>
                                            <button className="btn mx-1">
                                                <i className="bi bi-trash2"></i>
                                            </button>
                                            <button className="btn mx-1">
                                                <i className="bi bi-menu-up"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Bằng cử nhân</td>
                                        <td>Đại học cần thơ</td>
                                        <td>Xuất Sắc</td>
                                        <td>
                                            <button className="btn mx-1">
                                                <i className="bi bi-trash2"></i>
                                            </button>
                                            <button className="btn mx-1">
                                                <i className="bi bi-menu-up"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Bằng cử nhân</td>
                                        <td>Đại học cần thơ</td>
                                        <td>Xuất Sắc</td>
                                        <td>
                                            <button className="btn mx-1">
                                                <i className="bi bi-trash2"></i>
                                            </button>
                                            <button className="btn mx-1">
                                                <i className="bi bi-menu-up"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Bằng cử nhân</td>
                                        <td>Đại học cần thơ</td>
                                        <td>Xuất Sắc</td>
                                        <td>
                                            <button className="btn mx-1">
                                                <i className="bi bi-trash2"></i>
                                            </button>
                                            <button className="btn mx-1">
                                                <i className="bi bi-menu-up"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td>Bằng cử nhân</td>
                                        <td>Đại học cần thơ</td>
                                        <td>Xuất Sắc</td>
                                        <td>
                                            <button className="btn mx-1">
                                                <i className="bi bi-trash2"></i>
                                            </button>
                                            <button className="btn mx-1">
                                                <i className="bi bi-menu-up"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

BangCapComponent.propTypes = {};

export default BangCapComponent;
