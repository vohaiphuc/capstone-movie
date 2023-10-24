import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { bookingServ, theaterServ } from '../../api/api'
import { Divider, message } from 'antd'
import moment from 'moment/moment'
import Billing from './Billing'
import Seat from './Seat'
import "./style.scss"

export default function Booking() {
    const [searchParams, _] = useSearchParams()
    let params = useParams()
    const [xuatChieu, setXuatChieu] = useState([])
    const [ngayChieuGioChieu, setNgayChieuGioChieu] = useState("")
    const [selectSeats, setSelectSeats] = useState([]);
    const navigate = useNavigate()

    let maLichChieu = params.id
    useEffect(() => {

        // INVALID PARAM -> NAVIGATE
        theaterServ.getList()
            .then((res) => {
                let listLichChieu = []

                const lstCumRap = res.data.content.map(cumRap => cumRap.lstCumRap)
                const danhSachPhim = lstCumRap.map(dsPhim => dsPhim.map(phim => phim.danhSachPhim))
                danhSachPhim.forEach(danhSach => {
                    danhSach.forEach(phim => {
                        phim.forEach(item => listLichChieu.push(...item.lstLichChieuTheoPhim))
                    })
                })
                console.log("🚀 ~ file: Booking.js:34 ~ .then ~ listLichChieu:", listLichChieu)
                let phim = listLichChieu.filter(item => item.maLichChieu == maLichChieu)[0]
                console.log("🚀 ~ file: Booking.js:43 ~ .then ~ phim:", phim)

                let ngayGioChieuUrl = searchParams.get('date')

                if (ngayGioChieuUrl != phim.ngayChieuGioChieu) {
                    navigate(`/booking/${maLichChieu}?date=${phim.ngayChieuGioChieu}`)
                } else {
                    setNgayChieuGioChieu(phim.ngayChieuGioChieu)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    // console.log('render')

    useEffect(() => {
        // FETCH API
        if (!ngayChieuGioChieu) { return }
        bookingServ.get(maLichChieu)
            .then((res) => {
                let xuat = res.data.content
                console.log({ xuat })
                let correctGioChieu = moment(ngayChieuGioChieu).format("HH:mm")
                xuat.thongTinPhim.gioChieu = correctGioChieu
                xuat.thongTinPhim.ngayChieuGioChieu = ngayChieuGioChieu
                setXuatChieu(xuat)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ngayChieuGioChieu])

    const handleSelectSeat = (selecting) => {
        let findIndex = selectSeats.findIndex((seat) => seat.maGhe == selecting.maGhe)
        let newSelectSeats = [...selectSeats]
        if (findIndex > -1) { // đã có -> bỏ chọn
            newSelectSeats.splice(findIndex, 1)
        } else { // chưa có -> chọn
            newSelectSeats.push(selecting)
        }
        setSelectSeats(newSelectSeats.sort((a, b) => a.maGhe - b.maGhe))
        console.log("🚀 ~ file: Booking.js:76 ~ handleSelectSeat ~ newSelectSeats:", newSelectSeats)
    }

    return (
        <div className='container'>
            <div className="flex my-5 space-x-5 flex-col lg:flex-row overflow-hidden">
                <div className="w-full lg:w-2/3 mb-5">
                    <h2 className='text-center text-2xl mb-5 lg:mb-10'>MÀN HÌNH</h2>
                    <Divider className='hidden lg:block' />
                    <Seat list={xuatChieu.danhSachGhe} handleSelectSeat={handleSelectSeat} selectSeats={selectSeats} />
                </div>
                <div className="w-full lg:w-1/3 mb-5 order-first lg:order-last">
                    <h2 className='hidden lg:block text-center text-2xl mb-5 lg:mb-10'>THÔNG TIN</h2>
                    <Divider className='hidden lg:block' />
                    <Billing phim={xuatChieu.thongTinPhim} selectSeats={selectSeats} />
                </div>
            </div>
        </div>
    )
}
