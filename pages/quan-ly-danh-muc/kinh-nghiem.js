import React from 'react';
import Head from 'next/head';

import Header from '@/components/Header';
import KinhNghiemComponent from '@/components/DanhMuc/KinhNghiem/KinhNghiem';

const KinhNghiem = () => {
    return (
        <>
            <Head>
                <title>Quản lí kinh nghiệm</title>
            </Head>
            <div className="trang-quan-li-kinh-nghiem">
                <Header title="Quản lí kinh nghiệm" />
                <div>
                    <KinhNghiemComponent />
                </div>
            </div>
        </>
    );
};

export default KinhNghiem;
