import axios from "axios";
import { https } from "./config"
import { userLocalStorage } from "./localService";
import { mapLichChieuTheaterToLichChieuMovie } from "./utils";

export const userServ = {
    login: (info) => https.post(`/QuanLyNguoiDung/DangNhap`, info),
    register: (info) => https.post(`/QuanLyNguoiDung/DangKy`, info),
    update: (info) => https.put(`/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, info),
    getDetail: () => {
        return https.post(`/QuanLyNguoiDung/ThongTinTaiKhoan`)
    },
}

export const filmServ = {
    getBanner: () => https.get(`QuanLyPhim/LayDanhSachBanner`),
    getList: () => https.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP00`),
    getSuperList: () => {
        return Promise.all([
            https.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP00`),
            https.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP01`),
            https.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP02`),
            https.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP03`),
            https.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP04`),
            https.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP05`),
            https.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP06`),
            https.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP07`),
            https.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP08`),
            https.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP09`),
        ])
    },
    getDetail: (maPhim) => https.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`),
}

export const theaterServ = {
    getList: () => https.get(`/QuanLyRap/LayThongTinLichChieuHeThongRap`),
    mapLichChieuTheaterToLichChieuMovie: (list) => mapLichChieuTheaterToLichChieuMovie(list),
    getLichChieu: (maPhim) => https.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`),
}

export const bookingServ = {
    get: (maLichChieu) => https.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`),
    set: (bookingRequest) => https.post(`QuanLyDatVe/DatVe`, bookingRequest),
}