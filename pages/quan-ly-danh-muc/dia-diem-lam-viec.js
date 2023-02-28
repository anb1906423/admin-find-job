import React from 'react';
import Head from 'next/head';

import Header from '@/components/Header';
import DiaDiemLamViecComponent from '@/components/DanhMuc/DiaDiem/DiaDiem';

const BangCap = () => {
    return (
        <>
            <Head>
                <title>Quản lí địa điểm làm việc của bạn</title>
            </Head>
            <div className="trang-quan-li-dia-diem">
                <Header title="Quản lí địa điểm làm việc" />
                <div>
                    <DiaDiemLamViecComponent />
                </div>
            </div>
        </>
    );
};

export default BangCap;
