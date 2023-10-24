/**
 * mapLichChieuTheaterToLichChieuMovie
 * input: api /QuanLyRap/LayThongTinLichChieuHeThongRap
 * output: danh sách tất cả các phim, mỗi phim có thông tin phim (ko có moTa, ngayKhoiChieu, slug) và lịch chiếu
 * process: 
 *          1. mapping ~ lstCumRap.danhSachPhim
 *          2. make unique danhSachPhim theo maPhim
 *          3. push all lstCumRap.danhSachPhim.lstLichChieuTheoPhim vào mỗi phim
 * blackList: arr chứa maPhim của những phim có img /title xấu -> lọc bỏ
 */

export const mapLichChieuTheaterToLichChieuMovie = (lichChieuTheater) => {

    const lstCumRap = lichChieuTheater.map(cumRap => cumRap.lstCumRap)

    let danhSachPhimTatCaRap = []
    for (var i in lstCumRap) {
        let cumRap = lstCumRap[i]
        for (var j in cumRap) {
            let danhSachPhim = cumRap[j].danhSachPhim
            danhSachPhimTatCaRap.push(...danhSachPhim)
        }
    }
    let listMaPhim = danhSachPhimTatCaRap.map(phim => phim.maPhim)
    listMaPhim = [...new Set(listMaPhim)]
    let mapPhim = []
    for (let i in listMaPhim) {
        let maPhim = listMaPhim[i]
        let filter = danhSachPhimTatCaRap.filter(phim => phim.maPhim == maPhim)
        let lstLichChieuTheoPhim = filter.map(item => item.lstLichChieuTheoPhim)
        let soXuatChieu = lstLichChieuTheoPhim.reduce((prev, current) => prev + current.length, 0)
        mapPhim.push({
            ...filter[0],
            lstLichChieuTheoPhim: lstLichChieuTheoPhim,
            soXuatChieu: soXuatChieu
        })
    }
    let strictMap = mapPhim.sort((a, b) => b.soXuatChieu - a.soXuatChieu).filter(phim => phim.tenPhim.length > 10 && phim.soXuatChieu > 10)
    let blackList = ['9001', '5032', '5984', '1314', '11178', '8717', '12306', '1479', '1389', '1419', '8909', '4831']
    let strictMap2 = []
    strictMap.forEach(phim => {
        let found = false
        blackList.forEach(ma => {
            if (ma == phim.maPhim) {
                found = true
            }
        })
        if (!found) {
            strictMap2.push(phim)
        }
    })
    let strictMap3 = strictMap2.filter(phim => phim.dangChieu !== phim.sapChieu)
    return strictMap3
}
