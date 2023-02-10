import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './DangNhap.module.scss';
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';

import LogoImg from '../../assets/img/logo.png';
import LogInImg from '../../assets/img/login.png';

const cx = classNames.bind(styles);

function DangNhap() {
    const [isViewPass, setIsViewPass] = useState(false);

    return (
        <div className={cx('login-wp')}>
            <div className={cx('content')}>
                <Row className={cx('row-boostrap')}>
                    <Col sm={4} className={cx('left')}>
                        <Image className={cx('logo', 'px-2')} src={LogoImg} alt="Hình ảnh logo website" />
                        <div className={cx('body-left')}>
                            <h3 className="py-5 px-2">Hi, Welcome Back</h3>
                            <Image className={cx('thumbail')} src={LogInImg} alt="Hình ảnh logo website" />
                        </div>
                    </Col>
                    <Col sm={8} className={cx('right')}>
                        <div className={cx('body-right')}>
                            <div className="content-body-right">
                                <div>
                                    <h4>Sign in to Dream Job</h4>
                                    <p>Enter your details below.</p>
                                </div>
                                <div className={cx('input-start')}>
                                    <input type="email" placeholder="Email address" />
                                    <div
                                        style={{
                                            position: 'relative',
                                        }}
                                    >
                                        <input
                                            type={isViewPass ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                        />
                                        {isViewPass ? (
                                            <i onClick={() => setIsViewPass(false)} className="bi bi-eye"></i>
                                        ) : (
                                            <i onClick={() => setIsViewPass(true)} className="bi bi-eye-slash-fill"></i>
                                        )}
                                    </div>
                                    <button className="btn btn-primary">Đăng Nhập</button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default DangNhap;
