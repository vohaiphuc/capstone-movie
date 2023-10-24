import moment from 'moment'
import React from 'react'
import GioChieu from './GioChieu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

export default function XuatChieuMobile({ lichChieuShort }) {
    let xuatChieuDau = lichChieuShort[0].ngayChieuGioChieu
    return (
        <div className='flex flex-col items-start border-b-[1px] border-gray-200 mb-3 pb-5'>
            <div className="flex items-center mb-2 space-x-2">
                <FontAwesomeIcon icon={faCircle} style={{ color: "#d96c2c" }} />
                <p className='font-bold'>{moment(xuatChieuDau).format("DD/MM/YYYY")}</p>
            </div>
            <GioChieu lichChieuShort={lichChieuShort} />
        </div>
    )
}