import { Collapse } from 'antd';
import moment from 'moment';
import React from 'react'

export default function Ticket({ thongTinDatVe }) {

    const getSeatCode = () => {
        let totalSeat = 160
        let maxSeatPerRow = 16

        let rows = Math.ceil(totalSeat / maxSeatPerRow)
        let listRowChar = []
        let charCodeA = 65

        for (let i = 1; i <= rows; i++) {
            let char = String.fromCharCode(charCodeA)
            listRowChar.push(char)
            charCodeA++
        }

        let seatList = []
        for (let i = 0; i < listRowChar.length; i++) {
            const char = listRowChar[i];
            for (let j = 1; j <= 16; j++) {
                seatList.push(`${char}${j}`)
            }
        }

        return seatList
    }

    const renderList = () => {
        return thongTinDatVe?.map((ve, index) => {
            let ngayGio = moment(ve.ngayDat).format("DD/MM/YYYY HH:mm")
            let danhSachGhe = ve.danhSachGhe.map(ghe => getSeatCode()[ghe.tenGhe * 1 - 1]).join(", ")
            return {
                key: index,
                label: <p className='truncate'>{ve.tenPhim}</p>,
                children: <div>
                    <div className="flex justify-between">
                        <p className='font-bold'>{ve.danhSachGhe[0].tenHeThongRap}</p>
                        <p className='italic'>{ngayGio}</p>
                    </div>
                    <p>Ghế: {danhSachGhe}</p>
                </div>,
            }
        })
    }


    return <Collapse items={renderList()} />;
}

