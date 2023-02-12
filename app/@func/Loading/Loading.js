import React from 'react';
import classNames from 'classnames/bind';

import styles from './Loading.module.scss';
import { RotateLoader } from 'react-spinners';

const cx = classNames.bind(styles);

function Loading() {
    return (
        <div className={cx('loading-wp')}>
            <RotateLoader color="#fff" />
        </div>
    );
}

export default Loading;
