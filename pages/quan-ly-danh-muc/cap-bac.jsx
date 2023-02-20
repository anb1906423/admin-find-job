import React, { useState, useRef, useEffect } from 'react'
import Header from '@/components/Header'
import Heading from '@/components/Heading'
import InputForm from '@/components/InputForm'
import RowItem from '@/components/RowItem'
import { backendAPI } from '@/config'
import GetDataFromAPI from '@/components/GetDataFromAPI'

const CapBac = () => {
    const [capBac, setCapBac] = useState('')
    const capBacRef = useRef()
    const data = GetDataFromAPI('http://localhost:3001/cap-bac')

    useEffect(() => {
        setCapBac(data)
    }, [data])

    const handleSubmit = async (bangCap) => {
        try {
            // Gọi API để gửi dữ liệu lên server
            const response = await fetch(backendAPI + '/cap-bac', {
                method: 'POST',
                body: JSON.stringify({ bangCap }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            // Xử lý kết quả trả về từ API
            if (data.success) {
                setCapBac('');
            } else {
                // Xử lý lỗi
                console.error(data.message);
            }
        } catch (error) {
            // Xử lý lỗi
            console.error(error.message);
        }
    };

    useEffect(() => {
        capBacRef.current.focus()
        console.log(capBac);
    }, [])

    return (
        <div className='trang-bang-cap'>
            <Header title='Quản lý Cấp bậc' />
            <div className="bang-cap row">
                <div className="col-6">
                    <Heading title="Thêm cấp bậc" />
                    <InputForm
                        inputValue={capBac}
                        setInputValue={setCapBac}
                        handleSubmit={handleSubmit}
                        inputRef={capBacRef}
                        inputPlaceholder="Nhập cấp bậc mới"
                    />
                </div>
                <div className="col-6">
                    <Heading title="Tất cả cấp bậc" />
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
                                    capBac && capBac.map((item, index) => {
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

export default CapBac