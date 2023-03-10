import React from 'react';
import Header from '@/components/Header';
import BangCapComponent from '@/components/DanhMuc/BangCap/BangCap';
import Head from 'next/head';

const BangCap = () => {
    return (
        <>
            <Head>
                <title>Quản lí bằng cấp website của bạn</title>
            </Head>
            <div className="trang-bang-cap">
                <Header title="Quản lý bằng cấp" />
                <div>
                    <BangCapComponent />
                </div>
            </div>
        </>
    );
};

export default BangCap;
