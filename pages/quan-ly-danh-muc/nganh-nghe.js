import React from 'react';
import Head from 'next/head';

import Header from '@/components/Header';
import NghanhNgheComponent from '@/components/DanhMuc/NghanhNghe/NghanhNghe';

const NganhNghe = () => {
    return (
        <>
            <Head>
                <title>Quản lí nghành nghề</title>
            </Head>
            <div className="trang-quan-li-nghanh-nghe">
                <Header title="Quản lí nghành nghề" />
                <div>
                    <NghanhNgheComponent />
                </div>
            </div>
        </>
    );
};

export default NganhNghe;
