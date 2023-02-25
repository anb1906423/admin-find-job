import React from 'react';
import Head from 'next/head';

import TaoMoiTaiKhoanAdmin from '@/components/ManageAccount/TaoTaiKhoanAdmin';

function index() {
    return (
        <>
            <Head>
                <title>Tạo thêm tài khoản admin cho website của bạn</title>
            </Head>
            <TaoMoiTaiKhoanAdmin />
        </>
    );
}

export default index;
