import React from 'react';
import Head from 'next/head';

import MucLuongComponent from '@/components/DanhMuc/MucLuong/MucLuong';

const MucLuong = () => {
    return (
        <>
            <Head>
                <title>Quản lí mức lương</title>
            </Head>
            <div className="trang-quan-li-muc-luong">
                <div>
                    <MucLuongComponent />
                </div>
            </div>
        </>
    );
};

export default MucLuong;
