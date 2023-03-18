import React from 'react';
import BangCapComponent from '@/components/DanhMuc/BangCap/BangCap';
import Head from 'next/head';

const BangCap = () => {
    return (
        <>
            <Head>
                <title>Quản lí bằng cấp</title>
            </Head>
            <div className="trang-bang-cap">
                <div>
                    <BangCapComponent />
                </div>
            </div>
        </>
    );
};

export default BangCap;
