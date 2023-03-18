import React from 'react';
import Head from 'next/head';

import CapBacComponent from '@/components/DanhMuc/CapBac/CapBac';

const CapBac = () => {
    return (
        <>
            <Head>
                <title>Quản lí cấp bậc</title>
            </Head>
            <div className="trang-bang-cap">
                <div>
                    <CapBacComponent />
                </div>
            </div>
        </>
    );
};

export default CapBac;
