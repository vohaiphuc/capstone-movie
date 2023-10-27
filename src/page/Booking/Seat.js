import { Tooltip } from 'antd'
import React from 'react'

const maxSeatPerRow = 16

export default function Seat({ list, selectSeats, handleSelectSeat }) {
    const totalSeat = list?.length
    // console.log("🚀 ~ file: Seat.js:5 ~ Seat ~ totalSeat:", totalSeat)
    let rows = Math.ceil(totalSeat / maxSeatPerRow)
    const seatLastRow = rows * maxSeatPerRow - totalSeat
    // console.log("row:", rows)
    // console.log("🚀 ~ file: Seat.js:7 ~ Seat ~ seatLastRow:", seatLastRow)

    let listRowChar = []
    let charCodeA = 65
    for (let i = 1; i <= rows; i++) {
        let char = String.fromCharCode(charCodeA)
        listRowChar.push(char)
        charCodeA++
    }

    const renderMap = () => {
        let theaterMap = []
        let start = 0
        let row = 1
        while (row <= rows) {
            theaterMap.push({
                rowName: listRowChar[row - 1],
                seats: list.slice(start, start + maxSeatPerRow),
            })
            start = start + maxSeatPerRow
            row++
        }
        return theaterMap
    }

    const isAddedSeat = (maGhe) => {
        let findIndex = selectSeats.findIndex((seat) => seat.maGhe == maGhe)
        return (findIndex > -1)
    }


    const renderSeats = () => {
        let theaterMap = renderMap()
        return theaterMap.map((row, index) => {
            return <div key={`row${index}`} className='row flex justify-center items-center space-x-1 mb-1'>
                {
                    row.seats.map((seat, index) => {
                        let loaiGhe = seat.loaiGhe == "Vip" ? "vip" : "normal"
                        let daDat = seat.daDat ? "preserved" : ""
                        let dangChon = (!daDat && isAddedSeat(seat.maGhe)) ? "selecting" : ""

                        let className = `seat ${loaiGhe} ${daDat} ${dangChon}`
                        let seatName = !daDat ? `${row.rowName}${index + 1}` : "x"

                        return <div key={seat.maGhe} className={className} onClick={() => { handleSelectSeat({ ...seat, maGheAbc: `${row.rowName}${index + 1}` }) }}>
                            <Tooltip title={seat.giaVe.toLocaleString()} placement='bottom'>
                                <p>{seatName}</p>
                            </Tooltip>
                        </div>
                    })
                }
            </div>
        })
    }

    return (
        <>
            <div className='w-full overflow-auto px-5'>
                <div className="w-[700px]">
                    {renderSeats()}
                </div>
            </div>
        </>
    )
}

