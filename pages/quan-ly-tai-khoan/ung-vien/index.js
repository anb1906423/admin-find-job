import React from 'react';
import Head from 'next/head';

import TaiKhoanUngVien from '@/components/ManageAccount/TaiKhoanUngVien/TaiKhoanUngVien';

function index() {
    return (
        <>
            <Head>
                <title>Danh Sách Tài Khoản Ứng Viên</title>
            </Head>
            <TaiKhoanUngVien />
        </>
    );
}

export default index;
