import React, { useEffect, useState } from 'react';
import { Tabs, message } from 'antd';
import { theaterServ } from '../../../api/api';
import moment from 'moment/moment';
import ScrollBar from './ScrollBar';
import { useWindowSize } from '@react-hook/window-size';

export default function TabMovie() {
    const [dsCumRap, setDsCumRap] = useState([])
    const [width, height] = useWindowSize()
    let cumRapTabPosition = 'left'
    let gioChieu = 4
    if (width < 640) {
        cumRapTabPosition = 'top'
        gioChieu = 2
    }
    const onChange = (key) => {
        console.log(key)
    }
    useEffect(() => {
        theaterServ.getList()
            .then((res) => {
                console.log(res);
                message.success("Tải danh sách cụm rạp thành công")
                setDsCumRap(res.data.content)
            })
            .catch((err) => {
                message.error("Tải danh sách cụm rạp thất bại")
                console.log(err);
            })
    }, [])

    const renderDsCumRap = () => {
        return dsCumRap.map((cumRap, index) => {
            return {
                key: `cumRap_${index}`,
                label: <img src={cumRap.logo} alt="" width={50} />,
                children: <Tabs tabPosition='left' defaultActiveKey="1" items={renderDsRap(cumRap.lstCumRap)} onChange={onChange} style={{ height: 500 }} />,
            }
        })
    }
    const renderDsRap = (cumRap) => {
        return cumRap.map((rap, index) => {
            return {
                key: `rap_${index}`,
                label: <div className='text-left w-24 lg:w-96 whitespace-normal' >
                    <p>{rap.tenCumRap}</p>
                    <p className='' >{rap.diaChi}</p>
                </div>,
                children: <ScrollBar style={{ height: 500, overflow: "auto", width: "auto" }} content={renderDsPhim(rap.danhSachPhim)} />
            }
        })
    }
    const renderDsPhim = (dsPhim) => {
        return dsPhim.map((phim, index) => {
            return <div className='' key={`phim_${index}`}>
                <h3 className='text-xl mb-3 font-bold'>{phim.tenPhim}</h3>
                <div className='flex mb-5 flex-col lg:flex-row'>
                    <img src={phim.hinhAnh} alt="" className='w-32 h-44 object-cover mr-5 mb-5 rounded-lg' />
                    <div className="w-full">
                        {/* <div className="w-56 md:w-96"> */}
                        {renderXuatChieu(phim.lstLichChieuTheoPhim)}
                    </div>
                </div>
            </div>
        })
    }

    const renderXuatChieu2 = (lichChieu) => {
        return lichChieu.slice(0, 10).map((gioChieu, index) => {
            return (
                <button key={`gioChieu_${index}`} className='px-5 py-2 border-2 border-red-600 rounded-md'>
                    {moment(gioChieu.ngayChieuGioChieu).format("DD/MM/YYYY ~ hh:mm")}
                </button>
            )
        })
    }

    const renderXuatChieu = (lichChieu) => {
        let lichChieuRemake = lichChieu.sort((a, b) => moment(a.ngayChieuGioChieu).valueOf() - moment(b.ngayChieuGioChieu).valueOf())

        const mapping = lichChieuRemake.map((gioChieu) => {
            return moment(gioChieu.ngayChieuGioChieu).format("DD/MM/YYYY")
        })

        const uniqueNgayChieu = [...new Set(mapping)];

        let listNgay = []
        for (var i in uniqueNgayChieu) {
            let filter = lichChieuRemake
                .filter(xuatChieu => moment(xuatChieu.ngayChieuGioChieu).format("DD/MM/YYYY") == uniqueNgayChieu[i])
            let listGio = filter
                .map(xuatChieu => moment(xuatChieu.ngayChieuGioChieu).format("HH:mm"))
            const uniqueGioChieu = [...new Set(listGio)];
            listNgay.push({
                ngayFull: uniqueNgayChieu[i],
                listGio: uniqueGioChieu,
                xuatChieuDau: filter[0].ngayChieuGioChieu // để lưu lại original before format
            })
        }

        return listNgay.map(({ ngayFull, listGio, xuatChieuDau }, index) => {
            return (
                <div key={`xuatChieu_${index}`} className='flex justify-start items-start gap-3 md:gap-5 mb-5 pr-3'>

                    <div className='border-2 border-black rounded-xl min-w-[120px] grid grid-cols-2 items-center p-3'>
                        <div>
                            <p className=''>{moment(xuatChieuDau).format("MM")}</p>
                            <p className=''>{moment(xuatChieuDau).format("dddd").slice(0, 3)}</p>
                        </div>
                        <p className='text-4xl mb-1'>{moment(xuatChieuDau).format("DD")}</p>
                    </div>
                    {/* <div className={`grid grid-cols-${gioChieu} gap-2`}> */}
                    <div className={`flex flex-wrap gap-2`}>
                        {listGio.map((gio, index) => {
                            return (
                                <button key={`gioChieu_${index}`} className='px-3 py-1 bg-red-600 rounded-md text-white'>
                                    {gio}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )
        })
    }

    return (
        <Tabs tabPosition={cumRapTabPosition} defaultActiveKey="1" items={renderDsCumRap()} onChange={onChange} style={{ height: 500 }} />
    )
}

// DsCumRap => cumRap => rap => dsPhim => phim => xuatChieu