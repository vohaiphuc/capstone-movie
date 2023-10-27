import moment from 'moment'
import 'moment/locale/vi'
import React from 'react'
import { bookingServ } from '../../api/api'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function Billing({ phim, selectSeats }) {
    const navigate = useNavigate()
    let date = moment(phim?.ngayChieuGioChieu).locale("vi")

    const tinhTong = () => {
        let tong = selectSeats?.reduce((prev, current) => prev + current.giaVe, 0).toLocaleString()
        return (tong > 0) ? tong + " VNĐ" : ""
    }

    const handleBooking = () => {
        let bookingRequest = {
            "maLichChieu": phim.maLichChieu,
            "danhSachVe": selectSeats.map(({ maGhe, giaVe }) => {
                return { maGhe, giaVe }
            })
        }

        bookingServ.set(bookingRequest)
            .then((res) => {
                message.success(res.data.content)
                setTimeout(() => {
                    navigate(0)
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='flex justify-between items-start space-x-5'>
            <div className="w-1/4">
                <img src={phim?.hinhAnh} alt="" className='w-full aspect-[3/4]' />
            </div>
            <div className="w-3/4 space-y-1">
                <p className='font-semibold capitalize'>{phim?.tenPhim}</p>
                <p className='capitalize'>{date.format('dddd, LL')}</p>
                <p className='capitalize'>{date.format('HH:mm')} ~ {date.add(2, "hour").format('HH:mm')}</p>
                <p>{phim?.tenCumRap}</p>
                <p>{phim?.tenRap}</p>
                <p>Ghế: {selectSeats?.map(seat => seat.maGheAbc).join(", ")}</p>
                <p>Tổng: {tinhTong()}</p>
                <button className='btn btn-orange' onClick={() => { handleBooking() }}>Đặt vé</button>
            </div>
        </div>
    )
}
