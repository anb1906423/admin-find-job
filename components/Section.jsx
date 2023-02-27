import React, { useState } from 'react';
import { menu } from '../data/data';
import Logo from '../assets/img/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import ActiveLink from '@/app/@func/ActiveLink/ActiveLink';

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
            <div className="logo-box w-100 text-center">
                <Link href="/">
                    <Image className="logo" src={Logo} alt="Hình ảnh logo" />
                </Link>
            </div>
            <div>
                <ul className="menu">
                    {menu &&
                        menu.map((item, index) => {
                            return (
                                <li className="menu-item text-uppercase fw-bolder" key={index}>
                                    <ActiveLink
                                        onClick={() => handleClick(index)}
                                        className="element-a-left"
                                        activeClassName="active"
                                        href={item.href != '#' ? item.href : ''}
                                    >
                                        <>
                                            <span>{item.icon}</span>
                                            <span>{item.title}</span>
                                        </>
                                    </ActiveLink>
                                    {showMenuItem[index] && (
                                        <ul className="sub-menu w-100">
                                            {item.list &&
                                                item.list.map((listItem, i) => {
                                                    return (
                                                        <li key={i} className="w-100">
                                                            <ActiveLink
                                                                activeClassName="active"
                                                                href={listItem.href}
                                                                className="w-100"
                                                            >
                                                                <span className="span-item">{listItem.title}</span>
                                                            </ActiveLink>
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
