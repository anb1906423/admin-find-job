import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

import styles from './DangNhap.module.scss';
import LogoImg from '../../assets/img/logo.png';
import LogInImg from '../../assets/img/login.png';
import { LoginUserAdmin } from '@/services';
import * as actions from '../../store/actions';

const cx = classNames.bind(styles);

function DangNhap() {
    const [isViewPass, setIsViewPass] = useState(false);
    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');

    const dispatch = useDispatch();

    const handleValidate = () => {
        let isValid = true;

        const arrayClone = [email, passWord];

        for (let i = 0; i < arrayClone.length; i++) {
            if (!arrayClone[i]) {
                isValid = false;
                alert('Bạn đã nhập thiếu trường !');
                break;
            }
        }

        return isValid;
    };

    const handleSubmit = async () => {
        const check = handleValidate();

        if (!check) return;

        //ES6
        try {
            const Res = await LoginUserAdmin({ email, matKhau: passWord });

            const { data } = Res;

            dispatch(actions.userLoginSuccess(data));

            Router.push('/');
        } catch (error) {
            alert(error.response.data.message);
        }
    };

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
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        placeholder="Email address"
                                    />
                                    <div
                                        style={{
                                            position: 'relative',
                                        }}
                                    >
                                        <input
                                            value={passWord}
                                            onChange={(e) => setPassWord(e.target.value)}
                                            type={isViewPass ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                        />
                                        {isViewPass ? (
                                            <i onClick={() => setIsViewPass(false)} className="bi bi-eye"></i>
                                        ) : (
                                            <i onClick={() => setIsViewPass(true)} className="bi bi-eye-slash-fill"></i>
                                        )}
                                    </div>
                                    <button onClick={handleSubmit} className="btn btn-primary">
                                        Đăng Nhập
                                    </button>
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
