import React, { useEffect, useRef, useState } from 'react'
import Select from "./SelectMovie";
import { filmServ, theaterServ } from '../../../api/api';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { setFilmList } from '../../../redux/filmSlice';

const defaultState = {
    listPhim: [],
    activePhim: [],
    listRap: [{ maPhim: "-1", tenCumRap: "Rạp đang chiếu" }],
    listXuatChieu: { activeRap: "Rạp đang chiếu", lichChieu: [] },
    xuatChieu: "Xuất chiếu"
}

const items = [
    {
        value: 'jack',
        label: 'Jack',
    }
]

export default function FilterSelect() {
    const dispatch = useDispatch()
    const [listPhim, setListPhim] = useState(defaultState.listPhim)
    const [listRap, setListRap] = useState(defaultState.listRap)
    const [listXuatChieu, setListXuatChieu] = useState(defaultState.listXuatChieu)

    useEffect(() => {
        filmServ.getList()
            .then((res) => {
                let list = res.data.content
                dispatch(setFilmList(list))
                setListPhim(list)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const handleChangePhim = (maPhim) => {
        setListXuatChieu(defaultState.listXuatChieu)
        theaterServ.getLichChieu(maPhim)
            .then((res) => {
                let detail = res.data.content
                let listlistXuatChieu = []
                detail.heThongRapChieu.forEach((heThongRap) => {
                    listlistXuatChieu.push(...heThongRap.cumRapChieu)
                })
                setListRap(listlistXuatChieu)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleChangeRap = (indexRap) => {
        setListXuatChieu({
            lichChieu: listRap[indexRap].lichChieuPhim,
            activeRap: listRap[indexRap].tenCumRap
        })
    }

    const renderDropdownPhim = () => {
        return listPhim.map((phim, index) => {
            return {
                value: phim.maPhim,
                label: phim.tenPhim,
            }
        })
    }

    const renderDropdownRap = () => {
        return listRap.map((rap, index) => {
            return {
                value: index,
                label: rap.tenCumRap,
            }
        })
    }

    const renderDropdownXuatChieu = () => {
        return listXuatChieu.lichChieu.map((lichChieu, index) => {
            return {
                value: `ng_${index}`,
                label: moment(lichChieu.ngayChieuGioChieu).format("DD/MM/YYYY ~ HH:mm"),
            }
        })
    }
    console.log("render");

    return (
        <div className='my-0 mx-auto w-5/6 flex justify-center shadow-md p-5 mb-10'>
            <Select defaultValue="Phim" options={renderDropdownPhim()} onChange={(maPhim) => { handleChangePhim(maPhim) }} />

            <Select defaultValue="Rạp đang chiếu" options={renderDropdownRap()} onChange={(indexRap) => { handleChangeRap(indexRap) }} idKey={listRap.length < 1 ? "x" : listRap[0].tenCumRap} />

            <Select defaultValue="Lịch chiếu" options={renderDropdownXuatChieu()} idKey={listXuatChieu.lichChieu.length < 1 ? "xx" : listXuatChieu.lichChieu[0].maLichChieu} />
        </div>
    )
}