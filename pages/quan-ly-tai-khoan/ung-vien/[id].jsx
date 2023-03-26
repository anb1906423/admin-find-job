import React, { useState, useEffect } from 'react'
import { getAllAccountUngVien } from '@/services';
import { useRouter } from 'next/router'
import Loading from '@/app/@func/Loading/Loading';

const ThongTinChiTietUngVien = () => {
    const router = useRouter()
    const urlParts = router.pathname;

    const [idUngVien, setIdUngVien] = useState(router.query.id)
    const [DanhSachUngVien, setDanhSachUngVien] = useState([])
    const [ungVien, setUngVien] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);

                const Res = await getAllAccountUngVien();

                if (Res && Res.data.length > 0) {
                    setDanhSachUngVien(Res.data);

                    const foundUngVien = Res.data.find((item) => item.id === idUngVien);
                    if (foundUngVien) {
                        setUngVien(foundUngVien);
                    }
                }
            } catch (error) {
                console.log(error);
            }

            setIsLoading(false);
        };

        fetch();

    }, [idUngVien]);
    
    return (
        <div className='info-detail-page'>
            {isLoading && <Loading />}
            {ungVien.hoVaTen}
        </div>
    )
}

export default ThongTinChiTietUngVien