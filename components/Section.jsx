import React, { useState } from 'react'
import { menu } from '../data/data'

const Section = () => {
    const [showMenuItem, setShowMenuItem] = useState({})

    const handleClick = index => {
        setShowMenuItem({
            ...showMenuItem,
            [index]: !showMenuItem[index]
        })
    }

    return (
        <div className='section w-100'>
            <div className="logo-box w-100 text-center">
                <a href="/">
                    <img className='logo' src="http://localhost:3000/img/logo.png" alt="" />
                </a>
            </div>
            <ul className="menu">
                {
                    menu && menu.map((item, index) => {
                        return (
                            <li className='menu-item text-uppercase fw-bolder' key={index}>
                                <a onClick={() => handleClick(index)} className='w-100' href={item.href}>{item.title}</a>
                                {
                                    showMenuItem[index] && (
                                        <ul className='sub-menu w-100'>
                                            {
                                                item.list && item.list.map((listItem, i) => {
                                                    return (
                                                        <li key={i} className='w-100'>
                                                            <a
                                                                href={listItem.href}
                                                                className="w-100"
                                                            >

                                                                {listItem.title}
                                                            </a>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    )}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Section