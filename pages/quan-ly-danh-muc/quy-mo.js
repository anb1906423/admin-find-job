import React from 'react';
import Head from 'next/head';

import QuyMoComponent from '@/components/DanhMuc/QuyMo/QuyMo';

const QuyMo = () => {
    return (
        <>
            <Head>
                <title>Quản lí quy mô doanh nghiệp</title>
            </Head>
            <div className="trang-quan-li-quy-mo-doanh-nghiep">
                <div>
                    <QuyMoComponent />
                </div>
            </div>
        </>
    );
};

export default QuyMo;
