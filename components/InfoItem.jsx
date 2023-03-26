import React from 'react'

const InfoItem = (props) => {
    return (
        <div className="info-item d-flex justify-content-start align-items-center position-relative">
            {props.icon}
            <p style={{ margin: "0", paddingLeft: "8px" }}>{props.info}</p>
        </div>
    )
}

export default InfoItem