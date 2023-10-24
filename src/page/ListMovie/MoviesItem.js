import { faFire } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { filmServ, theaterServ } from '../../api/api'
import { route } from '../../App'
import { convertToSlug } from './utils'

export default function MoviesItem({ phim }) {
    const navigate = useNavigate()
    // const [hinhAnh, setHinhAnh] = useState(phim.hinhAnh)
    // useEffect(() => {
    //     axios({
    //         url: phim.hinhAnh,
    //         method: 'GET',
    //         responseType: 'blob',
    //         headers: {
    //             'Access-Control-Allow-Origin': true
    //         }
    //     })
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             setHinhAnh("https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h123_gp01.jpg")
    //         });
    // }, [])

    let title = () => (
        <>
            <p>{phim.tenPhim}</p>
            <br />
            {/* <p>{phim.moTa.length > 150 ? phim.moTa.slice(0, 150) + "..." : phim.moTa}</p> */}
        </>
    )

    const makeUrlPath = () => {
        let slug = convertToSlug(phim.tenPhim)
        return route.movies.nameId(`${slug}-${phim.maPhim}`)
    }

    return (
        <NavLink to={makeUrlPath()}>
            <div className='movie-item'>
                <div className="movie-container">
                    <img className='w-full aspect-[3/4] object-cover' src={phim.hinhAnh} alt="" onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h123_gp01.jpg" }} />
                    <div className="title">
                        <Tooltip placement="top" title={phim.tenPhim.toString().toUpperCase()}>
                            <h3 className='truncate capitalize'>{phim.tenPhim.toString().toLowerCase()}</h3>
                        </Tooltip>
                        <button>Đặt vé</button>
                    </div>
                    {/* {phim.danhGia >= 8
                    ? (<div className="high-rate">
                        <p>Phim hay</p>
                    </div>)
                    : null
                    } */}
                    {phim.hot
                        ? <div className="phim-hot">
                            <FontAwesomeIcon icon={faFire} />
                        </div>
                        : null}
                </div>
            </div>
        </NavLink>
    )
}