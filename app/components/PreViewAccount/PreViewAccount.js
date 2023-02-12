import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './PreViewAccount.module.scss';
import _ from 'lodash';
import convertTime from '@/app/@func/convertTime/convertTime';

const cx = classNames.bind(styles);

function PreViewAccount({ data, isNhaTuyenDung = false }) {
    return (
        <>
            {isNhaTuyenDung ? (
                <div></div>
            ) : (
                !_.isEmpty(data) && (
                    <div className={cx('wp-preview')}>
                        <div className={cx('ung-vien-data')}>
                            <div className={cx('avatar-box-and-name')}>
                                <img
                                    src={
                                        data.avatar
                                            ? data.avatar
                                            : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png'
                                    }
                                    alt="Hình ảnh ứng viên"
                                    className={cx('avatar')}
                                />
                                <div className={cx('ho-va-ten-and-vi-tri')}>
                                    <div className={cx('d-inline-block')}>
                                        <span>
                                            {data.isMale ? (
                                                <i className="bi bi-gender-male"></i>
                                            ) : (
                                                <i className="bi bi-gender-female"></i>
                                            )}
                                            <span className="mx-1">{data.hoVaTen}</span>
                                        </span>
                                    </div>
                                    <div>
                                        <h6 className={cx('"vi-tri-mong-muon"')}>
                                            <i className="bi bi-link-45deg"></i>
                                            <span className="mx-1">
                                                {data.viTriMongMuon ? data.viTriMongMuon : 'Đang cập nhật'}
                                            </span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('thong-tin-khac')}>
                                <div className={cx('thong-tin-khac-ve-ung-vien')}>
                                    <h6 className={cx('sinh-nhat')}>
                                        <i className="bi bi-calendar"></i>
                                        <span className="mx-1">
                                            {data.sinhNhat ? convertTime(data.sinhNhat) : 'Đang cập nhật'}
                                        </span>
                                    </h6>
                                    <h6 className={cx('hoc-van')}>
                                        <i className="bi bi-mortarboard"></i>
                                        <span className="mx-1"> {data.hocVan ? data.hocVan : 'Đang cập nhật'}</span>
                                    </h6>
                                    <h6 className={cx('muc-luong')}>
                                        <span>
                                            <i className="bi bi-person-workspace"></i>
                                            <span className="mx-1">
                                                {data.mucLuongMongMuon ? data.mucLuongMongMuon : 'Đang cập nhật'}
                                            </span>
                                        </span>
                                    </h6>
                                    <h6 className={cx('kinh-nghiem')}>
                                        <span>
                                            <i className="bi bi-star"></i>
                                            <span className="mx-1">
                                                {data.kinhNghiem ? data.kinhNghiem : 'Đang cập nhật'}
                                            </span>
                                        </span>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    );
}

PreViewAccount.propTypes = {
    data: PropTypes.object.isRequired,
    isNhaTuyenDung: PropTypes.bool,
};

export default PreViewAccount;
