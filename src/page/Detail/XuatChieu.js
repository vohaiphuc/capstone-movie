import moment from 'moment'
import React from 'react'
import GioChieu from './GioChieu'

export default function XuatChieu({ lichChieuShort }) {
    let xuatChieuDau = lichChieuShort[0].ngayChieuGioChieu
    return (
        <div className='flex justify-start items-start gap-3 md:gap-5 mb-5 pr-3'>
            <div className='border-2 border-black rounded-xl min-w-[120px] grid grid-cols-2 items-center p-3'>
                <div>
                    <p className=''>{moment(xuatChieuDau).format("MM")}</p>
                    <p className=''>{moment(xuatChieuDau).format("dddd").slice(0, 3)}</p>
                </div>
                <p className='text-4xl mb-1'>{moment(xuatChieuDau).format("DD")}</p>
            </div>

            <GioChieu lichChieuShort={lichChieuShort} />
        </div>
    )
}