import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import Login from "./page/Login/Login";
import Detail from "./page/Detail/Detail";
import Booking from "./page/Booking/Booking";
import HomeLayout from "./Layout/HomeLayout";
import DetailLayout from "./Layout/DetailLayout";
import BookingLayout from "./Layout/BookingLayout";
import UserLayout from "./Layout/UserLayout";
import User from "./page/User/User";
import ListMovie from "./page/ListMovie/ListMovie";
import ListTheater from "./page/ListTheater/ListTheater";
import DefaultLayout from "./Layout/DefaultLayout";

export const route = {
	home: { path: "/" },
	login: { path: "/login" },
	user: { path: "/user" },
	theaters: { path: "/theaters" },

	movies: {
		path: "/movies",
		nameId: (nameId) => `/movies/${nameId}`,
		search: (keyword) => `/movies?search=${keyword}`,
		dangChieu: `/movies?dang_chieu=true`,
		sapChieu: `/movies?sap_chieu=true`,
		detail: { path: '/movies/:nameId' },
	},

	booking: {
		path: '/booking/:id',
		id: (id) => `/booking/${id}`,
	}
}

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={route.home.path} element={<HomeLayout><Home /></HomeLayout>} />
				<Route path={route.login.path} element={<UserLayout title="Login" body={<Login />} />} />
				<Route path={route.user.path} element={<UserLayout title="User" body={<User />} />} />
				<Route path={route.booking.path} element={<BookingLayout title="Booking" body={<Booking />} />} />
				<Route path={route.movies.path} element={<DefaultLayout title="Danh sách phim" body={<ListMovie />} />} />
				<Route path={route.movies.detail.path} element={<DetailLayout title="" body={<Detail />} />} />
				<Route path={route.theaters.path} element={<DefaultLayout title="Danh sách rạp" body={<ListTheater />} />} />

				<Route path="*" element={<DefaultLayout title="Lỗi 404: Không tìm thấy trang!" />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
