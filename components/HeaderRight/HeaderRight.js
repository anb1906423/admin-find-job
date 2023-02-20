import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './header.module.scss';
import { IconNotyfy } from '@/app/icons';

const cx = classNames.bind(styles);

function HeaderRight(props) {
    return (
        <div className={cx('wp')}>
            <div className={cx('left')}>
                <img
                    src="http://xuongmayco.vn/uploads/quoc-ky/800px-Flag_of_North_Vietnam_(1945-1955).png"
                    alt="Hình ảnh lá cờ Việt Nam"
                />
            </div>
            <div className={cx('right')}>
                <div className={cx('notify')}>
                    <span>
                        <IconNotyfy />
                    </span>
                    <span>0</span>
                </div>
                <img
                    src="https://dashboard-design-patern-ps7gbtrky-truongson09112003.vercel.app/static/mock-images/avatars/avatar_default.jpg"
                    alt="Hình ảnh lá cờ Việt Nam"
                />
            </div>
        </div>
    );
}

HeaderRight.propTypes = {};

export default HeaderRight;
