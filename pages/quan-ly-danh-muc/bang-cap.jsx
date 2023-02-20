import React, { useState, useRef, useEffect } from 'react'
import Header from '@/components/Header'
import Heading from '@/components/Heading'
import InputForm from '@/components/InputForm'
import RowItem from '@/components/RowItem'
import { backendAPI } from '@/config'
import GetDataFromAPI from '@/components/GetDataFromAPI'
import axios from 'axios'

const BangCap = () => {
    const [bangCap, setBangCap] = useState('')
    const [danhSachBangCap, setDanhSachBangCap] = useState([])
    const [err, setErr] = useState('')
    const bangCapRef = useRef()
    const data = GetDataFromAPI('http://localhost:3001/bang-cap')

    useEffect(() => {
        setDanhSachBangCap(data)
    }, [danhSachBangCap])

    const handleSubmit = async (bangCap) => {
        if (!bangCap) {
            setErr("Bằng cấp không được để trống!");
            bangCapRef.current.focus();
            console.log(err);
            return
        }
        try {
            const response = await fetch(backendAPI + '/bang-cap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ten: bangCap
                })
            });

            const data = await response.json();

            // Xử lý kết quả trả về từ API
            if (data.success) {
                setBangCap('');
            } else {
                // Xử lý lỗi
                console.log(data.message);
            }
        } catch (error) {
            // Xử lý lỗi
            console.error(error.message);
        }
    };

    useEffect(() => {
        bangCapRef.current.focus()
        console.log(bangCap);
    }, [])

    return (
        <div className='trang-bang-cap'>
            <Header title='Quản lý bằng cấp' />
            <div className="bang-cap row">
                <div className="col-6">
                    <Heading title="Thêm bằng cấp" />
                    <InputForm
                        value={bangCap}
                        onChange={(e) => setBangCap(e.target.value)}
                        onSubmitData={handleSubmit}
                        inputRef={bangCapRef}
                        inputPlaceholder="Nhập bằng cấp mới"
                    />
                </div>
                <div className="col-6">
                    <Heading title="Tất cả bằng cấp" />
                    <div className="main">
                        <table className="table table-hover">
                            <thead className=''>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên</th>
                                    <th className='text-center'>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    danhSachBangCap && danhSachBangCap.map((item, index) => {
                                        return (
                                            <RowItem
                                                key={index}
                                                ten={item.ten}
                                                href={item.id}
                                                index={index + 1}
                                            />
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BangCap