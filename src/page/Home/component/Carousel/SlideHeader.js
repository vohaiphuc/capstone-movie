import { Button } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SlideHeader({ header, navLink }) {
    return (
        <div className="flex items-center justify-between px-5 mb-5 xl:px-0">
            <h2 className='text-2xl lg:text-4xl font-semibold'>{header}</h2>
            <NavLink to={navLink}>
                <Button>Xem tất cả</Button>
            </NavLink>
        </div>
    )
}
