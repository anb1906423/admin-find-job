import React from 'react';
import Head from 'next/head';

import Header from '@/components/Header';
import QuyMoComponent from '@/components/DanhMuc/QuyMo/QuyMo';

const QuyMo = () => {
    return (
        <>
            <Head>
                <title>Quản lí quy mô doanh nghiệp</title>
            </Head>
            <div className="trang-quan-li-quy-mo-doanh-nghiep">
                <Header title="Quản lí quy mô doanh nghiệp" />
                <div>
                    <QuyMoComponent />
                </div>
            </div>
        </>
    );
};

export default QuyMo;
