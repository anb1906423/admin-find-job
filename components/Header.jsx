import React from 'react'

const Header = (props) => {
  return (
    <div className="header d-flex align-items-center">
        <h6 className="title-header">{props.title}</h6>
    </div>
  )
}

export default Header