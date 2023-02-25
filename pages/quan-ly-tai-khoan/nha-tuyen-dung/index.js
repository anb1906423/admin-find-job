import React from 'react';
import Head from 'next/head';

import TaiKhoanNhaTuyenDung from '@/components/ManageAccount/TaiKhoanNhaTuyenDung/TaiKhoanNhaTuyenDung';

function index() {
    return (
        <>
            <Head>
                <title>Danh sách tài khoản nhà tuyển dụng</title>
            </Head>
            <TaiKhoanNhaTuyenDung />
        </>
    );
}

export default index;
