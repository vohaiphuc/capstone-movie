import React from 'react';
import { Collapse, Tabs, Tooltip } from 'antd';
import XuatChieu from './XuatChieu';
import moment from 'moment';
import XuatChieuMobile from './XuatChieuMobile';

const TabTheater = ({ phim, screen }) => {

    const renderCumRap = () => {
        return phim.heThongRapChieu?.map((cumRap, index) => {
            return {
                key: `cum_${index}`,
                label: <Tooltip title={cumRap.tenHeThongRap.toUpperCase()} placement="bottom"><img src={cumRap.logo} alt="" width={50} /></Tooltip>,
                children: (screen == 'desktop')
                    ?
                    <Tabs tabPosition='left' defaultActiveKey="1" items={renderRap(cumRap.cumRapChieu, true)} className='h-[500px]' />
                    :
                    <Collapse defaultActiveKey={['1']} items={renderRap(cumRap.cumRapChieu, false)} />
            }
        })
    }

    const renderRap = (cumRap, isFixedHeight) => {
        return cumRap.map((rap, index) => {
            let tenCumRap = rap.tenCumRap
            let [maCum, tenRap] = tenCumRap.split(" - ")

            return {
                key: `rap_${index}`,
                label: <div className='text-left'><p>{maCum}</p><p className='text-[#d96c2c]'>{tenRap}</p></div>,
                children: <div className={`${isFixedHeight ? 'h-[500px]' : ""} overflow-auto`}>{renderXuatChieu(rap.lichChieuPhim)}</div>,
            }
        })
    }

    const renderXuatChieu = (lichChieu) => {
        let lichChieuRemake = lichChieu.sort((a, b) => moment(a.ngayChieuGioChieu).valueOf() - moment(b.ngayChieuGioChieu).valueOf())

        const mapping = lichChieuRemake.map((gioChieu) => {
            return moment(gioChieu.ngayChieuGioChieu).format("DD/MM/YYYY")
        })

        const uniqueNgayChieu = [...new Set(mapping)];

        // let listNgay = []
        let lichChieuShort = []
        for (var i in uniqueNgayChieu) {
            let filter = lichChieuRemake
                .filter(xuatChieu => moment(xuatChieu.ngayChieuGioChieu).format("DD/MM/YYYY") == uniqueNgayChieu[i])

            let listGio = filter
                .map(xuatChieu => moment(xuatChieu.ngayChieuGioChieu).format("HH:mm"))

            const uniqueGioChieu = [...new Set(listGio)]

            let listGioMaLich = filter
                .map(({ maLichChieu, ngayChieuGioChieu }) => ({
                    maLich: maLichChieu,
                    gio: moment(ngayChieuGioChieu).format("HH:mm"),
                    ngayChieuGioChieu,
                }))

            // make unique listGioMaLich[] by gioChieu
            let uniqueGioMaLich = []

            for (var i in listGioMaLich) {
                let { gio } = listGioMaLich[i]
                for (var g in uniqueGioChieu) {
                    if (uniqueGioChieu[g] == gio) {
                        uniqueGioMaLich.push(listGioMaLich[i])
                        break
                    }
                }
            }

            lichChieuShort.push(uniqueGioMaLich)
        }

        return lichChieuShort.map((item, index) => {
            return screen == 'desktop' ? (
                <XuatChieu key={`xuatChieu_${index}`} lichChieuShort={item} />
            ) : (
                <XuatChieuMobile key={`xuatChieu_${index}`} lichChieuShort={item} />
            )
        })
    }


    return <Tabs defaultActiveKey="1" items={renderCumRap()} style={{ maxWidth: 1200 }} />
}
export default TabTheater;