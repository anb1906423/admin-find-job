import React from 'react';
import Head from 'next/head';

import Header from '@/components/Header';
import CapBacComponent from '@/components/DanhMuc/CapBac/CapBac';

const CapBac = () => {
    return (
        <>
            <Head>
                <title>Quản lí cấp bậc trong CV website của bạn</title>
            </Head>
            <div className="trang-bang-cap">
                <Header title="Quản lí cấp bậc" />
                <div>
                    <CapBacComponent />
                </div>
            </div>
        </>
    );
};

export default CapBac;
