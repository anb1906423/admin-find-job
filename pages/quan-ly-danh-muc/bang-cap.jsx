import React, { useState } from 'react'
import Header from '@/components/Header'
import Heading from '@/components/Heading'

const BangCap = () => {
    const [bangCap, datBangCap] = useState('')
    return (
        <div className='trang-bang-cap'>
            <Header title='Quản lý bằng cấp' />
            <div className="bang-cap row">
                <div className="col-6">
                    <Heading title="Thêm bằng cấp" />
                </div>
                <div className="col-6">
                    <Heading title="Tất cả bằng cấp" />
                </div>
            </div>
        </div>
    )
}

export default BangCap