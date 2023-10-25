import React from 'react'
import { convertToSlug } from '../../asset/utils'
import { route } from '../../../../App'
import moment from 'moment'
import { NavLink } from 'react-router-dom'
import { Tooltip } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'

export default function ItemCarousel({ phim, phimHay, phimHot, button }) {
    let title = () => (
        <>
            <p>{phim.tenPhim}</p>
            {/* <br />
            <p>{phim.moTa.length > 150 ? phim.moTa.slice(0, 150) + "..." : phim.moTa}</p> */}
        </>
    )
    const makeUrlPath = () => {
        let slug = convertToSlug(phim.tenPhim)
        return route.movies.nameId(`${slug}-${phim.maPhim}`)
    }

    return <div className='carousel-item'>
        <NavLink to={makeUrlPath()}>
            <div className="carousel-container">
                <img className='w-full aspect-[3/4] object-cover' src={phim.hinhAnh} alt="" />
                <div className="title">
                    <Tooltip placement="top" title={title()}>
                        <h3 className='truncate'>{phim.tenPhim}</h3>
                    </Tooltip>
                    {button == 'dat-ve'
                        ? <button>Đặt vé</button>
                        : ''
                    }
                </div>
                {phimHay && phim.danhGia >= 8 && (
                    <div className="high-rate">
                        <p>Phim hay</p>
                    </div>)
                }
                {phimHot && phim.hot && (
                    <div className="phim-hot">
                        <FontAwesomeIcon icon={faFire} />
                    </div>)
                }
            </div>
        </NavLink>
    </div>
}
