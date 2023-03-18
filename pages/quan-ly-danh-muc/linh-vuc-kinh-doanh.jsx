import React from 'react';
import Head from 'next/head';

import LinhVucKinhDoanhComponent from '@/components/DanhMuc/LinhVucKinhDoanh/LinhVucKinhDoanh';

const LinhVucKinhDoanh = () => {
    return (
        <>
            <Head>
                <title>Quản lí lĩnh vực kinh doanh</title>
            </Head>
            <div className="trang-quan-li-linh-linh-vuc-kinh-doanh">
                <div>
                    <LinhVucKinhDoanhComponent />
                </div>
            </div>
        </>
    );
};

export default LinhVucKinhDoanh;
