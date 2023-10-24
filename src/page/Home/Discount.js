import React from 'react'
import { NavLink } from 'react-router-dom'
import { route } from '../../App'

export default function Discount() {
    return (
        <div className='discount-banner relative mx-auto flex items-center justify-between'>
            <div className="relative flex items-center justify-between flex-col md:flex-row px-5 md:px-10 lg:px-20 w-full space-y-3 md:space-y-0">
                <p className='text-4xl font-bold text-white text-center md:text-left'>Giảm 10% cho sinh viên</p>
                <NavLink to={route.movies.path}>
                    <button className='bg-black text-white px-7 py-3 font-semibold'>Đặt vé ngay</button>
                </NavLink>
            </div>
        </div>
    )
}
