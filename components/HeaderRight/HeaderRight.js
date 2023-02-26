import React from 'react';
import classNames from 'classnames/bind';

import styles from './header.module.scss';
import { IconNotyfy } from '@/app/icons';
import TippyRender from '@/app/components/TippyRender/TippyRender';

const cx = classNames.bind(styles);

export const Menu = [
    {
        title: 'Xem trang cá nhân',
        icon: <i className="bi bi-person"></i>,
        to: '/tai-khoan-cua-toi',
    },
    {
        title: 'Tạo thêm tài khoản admin',
        icon: <i className="bi bi-filetype-css"></i>,
        to: '/quan-ly-tai-khoan/tao-moi-tai-khoan',
    },
    {
        title: 'Đăng xuất',
        icon: <i className="bi bi-filetype-css"></i>,
        to: '/logout',
    },
];

function HeaderRight(props) {
    function handleMenuChange(menuItem) {
        console.log(menuItem);
    }

    return (
        <div className={cx('wp')}>
            <div className={cx('left')}>
                {/* <button>
                    <i className="bi bi-search"></i>
                </button> */}
            </div>
            <div className={cx('right')}>
                <div className={cx('notify')}>
                    <span>
                        <IconNotyfy />
                    </span>
                    <span>0</span>
                </div>
                <TippyRender items={Menu} onChange={handleMenuChange}>
                    <img
                        src="https://dashboard-design-patern-ps7gbtrky-truongson09112003.vercel.app/static/mock-images/avatars/avatar_default.jpg"
                        alt="Hình ảnh lá cờ Việt Nam"
                    />
                </TippyRender>
            </div>
        </div>
    );
}

HeaderRight.propTypes = {};

export default HeaderRight;
