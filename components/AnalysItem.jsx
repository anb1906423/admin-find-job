import React from 'react'
import { useRouter } from 'next/router';
import { FaArrowUp } from "react-icons/fa"

const AnalysItem = (props) => {
    const router = useRouter();
    const handlePush = () => {
        router.push("/" + `${props.path}`)
    }
    return (
        <div className="analys-item col-6 my-1">
            <div onClick={handlePush}>
                <div className="header-analys">
                    <h5 className='text-uppercase'>
                        {props.title}
                    </h5>
                </div>
                <div className="d-flex justify-content-center align-items-center" style={{ height: "calc(32vh - (24px))" }}>
                    <span className=''>
                        {props.total}
                    </span>
                    <h6 className='average'>
                        <FaArrowUp />
                        {props.average} / month
                    </h6>
                </div>
            </div>
        </div>
    )
}

export default AnalysItem