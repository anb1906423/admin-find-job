import React from 'react';
import Head from 'next/head';

import LoaiHinhDoanhNghiepComponent from '@/components/DanhMuc/LoaiHinhDoanhNghiep/LoaiHinhDoanhNghiep';

const LoaiHinhDoanhNghiep = () => {
    return (
        <>
            <Head>
                <title>Quản lí loại hinh doanh nghiệp</title>
            </Head>
            <div className="trang-quan-li-loai-hinh-doanh-nghiep">
                <div>
                    <LoaiHinhDoanhNghiepComponent />
                </div>
            </div>
        </>
    );
};

export default LoaiHinhDoanhNghiep;
