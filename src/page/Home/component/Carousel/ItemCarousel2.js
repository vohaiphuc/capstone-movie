import React from 'react'
import { convertToSlug } from '../../asset/utils'
import { route } from '../../../../App'
import moment from 'moment'
import { NavLink } from 'react-router-dom'
import { Tooltip } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faStar } from '@fortawesome/free-solid-svg-icons'

export default function ItemCarousel2({ phim }) {
    const makeUrlPath = () => {
        let slug = convertToSlug(phim.tenPhim)
        return route.movies.nameId(`${slug}-${phim.maPhim}`)
    }
    return (
        <NavLink to={makeUrlPath()}>
            <div className='flex flex-col justify-center border-x-4 border-transparent relative'>
                <img src={phim.hinhAnh} alt="" className='w-full aspect-[5/3] object-cover my-0 mx-auto' />
                <div className='info'>
                    <h3 className='text-xl font-bold mb-2 truncate capitalize'>{phim.tenPhim}</h3>
                    <div className="stars mb-4">
                        <FontAwesomeIcon icon={faStar} color='#d96c2c' />
                        <FontAwesomeIcon icon={faStar} color='#d96c2c' />
                        <FontAwesomeIcon icon={faStar} color='#d96c2c' />
                        <FontAwesomeIcon icon={faStar} color='#d96c2c' />
                        <FontAwesomeIcon icon={faStar} color='#d96c2c' />
                    </div>
                    <div className="flex items-center space-x-2">
                        <button>Xem trailer</button>
                        <button>Đặt vé</button>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}
