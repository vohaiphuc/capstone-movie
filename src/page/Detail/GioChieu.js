import moment from 'moment'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function GioChieu({ lichChieuShort }) {
    return (
        <div className={`flex flex-wrap gap-2`}>
            {lichChieuShort.map(({ gio, maLich, ngayChieuGioChieu }, index) => {
                // let date = moment(ngayChieuGioChieu).format("YYYY-MM-DD")
                return (
                    // <NavLink to={`/booking/${maLich}?ngay=${date}&gio=${gio}`} key={`gioChieu_${index}`} >
                    <NavLink to={`/booking/${maLich}?date=${ngayChieuGioChieu}`} key={`gioChieu_${index}`} >
                        <button className='px-3 py-1 bg-[#d96c2c] rounded-md text-white'>
                            {gio}
                        </button>
                    </NavLink>
                )
            })}
        </div>
    )
}