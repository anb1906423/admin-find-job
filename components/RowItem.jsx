import React from 'react'
import Link from 'next/link'
import { FaTrash, FaEdit } from "react-icons/fa"

const RowItem = (props) => {
    const xoaDanhMuc = () => {

    }
    return (
        <tr className='row-item'>
            <td className='justify-content-around align-items-center'>{props.index}</td>
            <td className='justify-content-around align-items-center'>{props.ten}</td>
            <td className='d-flex justify-content-around align-items-center'>
                {/* <Link title='Cập nhật thông tin' href={props.href}>
                    <FaEdit className="text-dark" />
                </Link> */}
                <span>
                    <FaTrash title='Xóa xe' className="text-dark" onClick={() => xoaDanhMuc()} />
                </span>
            </td>
        </tr>
    )
}

export default RowItem