import React from 'react';
import Head from 'next/head';

import Header from '@/components/Header';
import LinhVucKinhDoanhComponent from '@/components/DanhMuc/LinhVucKinhDoanh/LinhVucKinhDoanh';

const LinhVucKinhDoanh = () => {
    return (
        <>
            <Head>
                <title>Quản lí lĩnh vực kinh doanh</title>
            </Head>
            <div className="trang-quan-li-linh-linh-vuc-kinh-doanh">
                <Header title="Quản lí lĩnh vực kinh doanh" />
                <div>
                    <LinhVucKinhDoanhComponent />
                </div>
            </div>
        </>
    );
};

export default LinhVucKinhDoanh;
