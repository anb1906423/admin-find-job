import React from 'react';
import Head from 'next/head';

import LoaiHopDongComponent from '@/components/DanhMuc/LoaiHopDong/LoaiHopDong';

const LoaiHopDong = () => {
    return (
        <>
            <Head>
                <title>Quản lí loại hợp đồng</title>
            </Head>
            <div className="trang-quan-li-loai-hop-dong">
                <div>
                    <LoaiHopDongComponent />
                </div>
            </div>
        </>
    );
};

export default LoaiHopDong;
