import React, { useState } from 'react';
import { menu } from '../data/data';
import Logo from '../assets/img/logo.png';
import Image from 'next/image';
import Link from 'next/link';

const Section = () => {
    const [showMenuItem, setShowMenuItem] = useState({});

    const handleClick = (index) => {
        setShowMenuItem({
            ...showMenuItem,
            [index]: !showMenuItem[index],
        });
    };

    return (
        <div className="section w-100">
            <div className="logo-box  w-100 text-center">
                <Link href="/">
                    <Image className="logo" src={Logo} alt="Hình ảnh logo" />
                    {/* <img
                        className="logo"
                        src="https://trang-dashboard-design-patiern-truongson09112003.vercel.app/static/mock-images/avatars/avatar_default.jpg"
                        alt=""
                    /> */}
                </Link>
            </div>
            <div className="item-user-admin">
                <div className="item-user-admin--modifined">
                    <img
                        src="https://dashboard-design-patern-ps7gbtrky-truongson09112003.vercel.app/static/mock-images/avatars/avatar_default.jpg"
                        alt="Hình ảnh hiển thị user"
                    />
                    <div className="info-user-admin">
                        <p>Nguyễn Văn A</p>
                        <span>Quản trị viên website</span>
                    </div>
                </div>
            </div>
            <div>
                <ul className="menu">
                    {menu &&
                        menu.map((item, index) => {
                            return (
                                <li className="menu-item text-uppercase fw-bolder" key={index}>
                                    <a
                                        onClick={() => handleClick(index)}
                                        className="w-100 element-a-left"
                                        href={item.href}
                                    >
                                        {item.icon}
                                        {item.title}
                                    </a>
                                    {showMenuItem[index] && (
                                        <ul className="sub-menu w-100">
                                            {item.list &&
                                                item.list.map((listItem, i) => {
                                                    return (
                                                        <li key={i} className="w-100">
                                                            <a href={listItem.href} className="w-100">
                                                                {listItem.title}
                                                            </a>
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
};

export default Section;
