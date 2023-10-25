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
import Spinner from "./component/Spinner";

export const route = {
	home: {
		path: "/",
		element: <HomeLayout><Home /></HomeLayout>
	},
	login: {
		path: "/login",
		element: <UserLayout title="Login" body={<Login />} />
	},
	user: {
		path: "/user",
		element: <UserLayout title="User" body={<User />} />
	},
	theaters: {
		path: "/theaters",
		element: <DefaultLayout title="Danh sách rạp" body={<ListTheater />} />
	},

	movies: {
		path: "/movies",
		element: <DefaultLayout title="Danh sách phim" body={<ListMovie />} />,
		nameId: (nameId) => `/movies/${nameId}`,
		search: (keyword) => `/movies?search=${keyword}`,
		dangChieu: `/movies?dang_chieu=true`,
		sapChieu: `/movies?sap_chieu=true`,
	},

	detail: {
		path: '/movies/:nameId',
		element: <DetailLayout title="" body={<Detail />} />
	},

	booking: {
		path: '/booking/:id',
		element: <BookingLayout title="Booking" body={<Booking />} />,
		id: (id) => `/booking/${id}`,
	},

	others: {
		path: "*",
		element: <DefaultLayout title="Lỗi 404: Không tìm thấy trang!" />,
	}
}

function App() {
	return <>
		<Spinner />
		<BrowserRouter>
			<Routes>
				{Object.values(route).map(({ path, element }) => {
					return <Route key={path} path={path} element={element} />
				})}
			</Routes>
		</BrowserRouter>
	</>
}

export default App
