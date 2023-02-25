import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Router from 'next/router';
import { useDispatch } from 'react-redux';

import styles from './logout.module.scss';
import { swalert } from '@/mixin/swal.mixin';
import * as actions from '@/store/actions';

const cx = classNames.bind(styles);

function Logout() {
    const dispatch = useDispatch();

    useEffect(() => {
        swalert
            .fire({
                title: 'Đăng xuất',
                icon: 'warning',
                text: 'Bạn chắc chắn muốn đăng xuất?',
                showCloseButton: true,
                showCancelButton: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    window.location.assign('/');
                    dispatch(actions.userLogOut());
                }

                if (result.dismiss) {
                    Router.push('/');
                }
            });
    }, []);

    return <div className={cx('wp')}></div>;
}

export default Logout;
