import React from 'react';
import Head from 'next/head';

import Header from '@/components/Header';
import LoaiHinhDoanhNghiepComponent from '@/components/DanhMuc/LoaiHinhDoanhNghiep/LoaiHinhDoanhNghiep';

const LoaiHinhDoanhNghiep = () => {
    return (
        <>
            <Head>
                <title>Quản lí loại hinh doanh nghiệp</title>
            </Head>
            <div className="trang-quan-li-loai-hinh-doanh-nghiep">
                <Header title="Quản lí loại hinh doanh nghiệp" />
                <div>
                    <LoaiHinhDoanhNghiepComponent />
                </div>
            </div>
        </>
    );
};

export default LoaiHinhDoanhNghiep;
