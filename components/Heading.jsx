import React from 'react'

const Heading = (props) => {
    return (
        <div className='heading text-center'>
            <h6
                className='text-uppercase fw-bolder'
                style={{
                    padding: '10px',
                }}
            >
                {props.title}
            </h6>
        </div>
    )
}

export default Heading