import React from 'react';
import Head from 'next/head';

import Header from '@/components/Header';
import LoaiHopDongComponent from '@/components/DanhMuc/LoaiHopDong/LoaiHopDong';

const MucLuong = () => {
    return (
        <>
            <Head>
                <title>Quản lí mức lương</title>
            </Head>
            <div className="trang-quan-li-muc-luong">
                <Header title="Quản lí mức lương" />
                <div>
                    <LoaiHopDongComponent />
                </div>
            </div>
        </>
    );
};

export default MucLuong;
