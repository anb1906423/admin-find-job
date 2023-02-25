import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Router from 'next/router';

import styles from './taomoitaikhoanadmin.module.scss';
import { swalert } from '@/mixin/swal.mixin';
import Loading from '@/app/@func/Loading/Loading';
import { createNewAccountAdmin } from '@/services';

const cx = classNames.bind(styles);

function TaoMoiTaiKhoanAdmin(props) {
    const [isConfirm, setIsConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isViewPass, setIsViewPass] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        swalert
            .fire({
                title: 'Tạo thêm tài khoản admin',
                icon: 'warning',
                text: 'Hành động của bạn có thể dẫn đến sự nguy hiểm?',
                showCloseButton: true,
                showCancelButton: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    setIsConfirm(true);
                }

                if (result.dismiss) {
                    setIsConfirm(false);
                    Router.push('/');
                }
            });
    }, []);

    const handleBeforeOnLoad = (e) => {
        e.preventDefault();
        return (event.returnValue = '');
    };

    // warning người dùng refesh hoặc ấn f5 hành vi này có thể khiến những thay đổi của bạn có thể bị mất.
    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeOnLoad);

        return () => {
            window.removeEventListener('beforeunload', function (event) {});
        };
    }, []);

    const handleSubmitDone = () => {
        navigator.clipboard.writeText(`Tài khoản của bạn đã được tạo với : tk: ${email} password: ${password}`);
        alert('Tài khoản và mật khẩu của bạn đã được copy tự động!');
        setEmail('');
        setFullName('');
        setPassword('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fullName || !email || !password) {
            return;
        }

        setIsLoading(true);

        try {
            const Res = await createNewAccountAdmin({
                email,
                matKhau: password,
                hoVaTen: fullName,
            });

            console.log(Res);

            if (Res && Res.data && Res.data.status && Res.data.status === 400) {
                swalert
                    .fire({
                        title: 'Có lỗi xảy ra!',
                        icon: 'error',
                        text: Res.data.message,
                        showCloseButton: true,
                        showCancelButton: true,
                    })

                    .then(async (result) => {
                        if (result.isConfirmed) {
                            Router.push('/');
                        }

                        if (result.dismiss) {
                            Router.push('/');
                        }
                    });

                return;
            }

            swalert
                .fire({
                    title: 'Tài khoản admin của bạn đã tạo thành công!',
                    icon: 'success',
                    text: `Tài khoản của bạn đã được tạo với : 
                                tk: ${email}
                                password: ${password}
                    `,
                    showCloseButton: true,
                    showCancelButton: true,
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        await handleSubmitDone();
                        Router.push('/');
                    }

                    if (result.dismiss) {
                        await handleSubmitDone();
                        Router.push('/');
                    }
                });
        } catch (error) {}

        setIsLoading(false);
    };

    return (
        <div className={cx(isConfirm && 'wp-confirm')}>
            {isLoading && <Loading />}
            <div className="container">
                {isConfirm && (
                    <>
                        <div className={cx('title-wp')}>
                            <h3>Tạo thêm tài khoản cho website của bạn</h3>
                        </div>
                        <div className={cx('body-create-admin-account')}>
                            <div className={cx('content')}>
                                <form onSubmit={handleSubmit}>
                                    <div className={cx('wp-label')}>
                                        <label htmlFor="name">Họ tên người quản trị</label>
                                        <input
                                            onChange={(e) => setFullName(e.target.value)}
                                            value={fullName}
                                            className="form-control"
                                            id="name"
                                            placeholder="eg: Nguyen Van A"
                                            type="text"
                                            required
                                        />
                                    </div>
                                    <div className={cx('wp-label')}>
                                        <label htmlFor="email">Email người quản trị website</label>
                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            className="form-control"
                                            id="email"
                                            placeholder="eg: findjob@gmail.com"
                                            type="email"
                                            required
                                        />
                                    </div>
                                    <div className={cx('wp-label')}>
                                        <label htmlFor="password">Nhập password của bạn</label>
                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            className="form-control"
                                            id="password"
                                            placeholder="eg: 12345678"
                                            type={isViewPass ? 'text' : 'password'}
                                            required
                                        />
                                        {isViewPass ? (
                                            <i onClick={() => setIsViewPass(false)} className="bi bi-eye-fill"></i>
                                        ) : (
                                            <i onClick={() => setIsViewPass(true)} className="bi bi-eye-slash-fill"></i>
                                        )}
                                    </div>
                                    <div className={cx('wp-btn')}>
                                        <a href="/" className="btn btn-warning">
                                            Hủy bỏ
                                        </a>
                                        <button className="btn btn-primary">Tạo tài khoản</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

TaoMoiTaiKhoanAdmin.propTypes = {};

export default TaoMoiTaiKhoanAdmin;
