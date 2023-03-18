import React from 'react';
import Head from 'next/head';

import DiaDiemLamViecComponent from '@/components/DanhMuc/DiaDiem/DiaDiem';

const DiaDiemLamViec = () => {
    return (
        <>
            <Head>
                <title>Quản lí địa điểm làm việc</title>
            </Head>
            <div className="trang-quan-li-dia-diem">
                <div>
                    <DiaDiemLamViecComponent />
                </div>
            </div>
        </>
    );
};

export default DiaDiemLamViec;
