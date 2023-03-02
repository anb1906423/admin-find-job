import React from 'react';
import Head from 'next/head';

import Header from '@/components/Header';
import LoaiHopDongComponent from '@/components/DanhMuc/LoaiHopDong/LoaiHopDong';

const LoaiHopDong = () => {
    return (
        <>
            <Head>
                <title>Quản lí loại hợp đồng</title>
            </Head>
            <div className="trang-quan-li-loai-hop-dong">
                <Header title="Quản lí loại hợp đồng" />
                <div>
                    <LoaiHopDongComponent />
                </div>
            </div>
        </>
    );
};

export default LoaiHopDong;
