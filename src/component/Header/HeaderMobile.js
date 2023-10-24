import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { userLocalStorage } from '../../api/localService'
import "./style.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faFilm, faUser } from '@fortawesome/free-solid-svg-icons'
import { Dropdown, Tooltip } from 'antd'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { formLogin, formRegister, setFormLogin } from '../../redux/loginFormSlice'

export default function HeaderMobile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.userSlice)

    const handleLogout = () => {
        userLocalStorage.remove()
        window.location.href = "/";
    }

    const handleRegister = () => {
        dispatch(setFormLogin(formRegister))
        navigate("/login")
    }

    const handleLogin = () => {
        dispatch(setFormLogin(formLogin))
        navigate("/login")
    }

    useEffect(() => {

        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                document.getElementsByClassName("header")[0].classList.add("scrolling")
            } else {
                document.getElementsByClassName("header")[0].classList.remove("scrolling")
            }
        })
    }, [])


    const renderNavBtn = () => {
        const classBtn = 'border-2 border-red-600 px-7 py-2 rounded-xl'
        if (user) { // loged in
            return [
                {
                    key: 'user',
                    label: <NavLink to="/user">Trang cá nhân</NavLink>,
                },
                {
                    key: 'logout',
                    label: <p onClick={handleLogout}>Đăng xuất</p>,
                }
            ]
        } else { // loged out
            return [
                {
                    key: 'login',
                    label: <p onClick={handleLogin}>Đăng nhập</p>,
                },
                {
                    key: 'register',
                    label: <p onClick={handleRegister}>Đăng ký</p>,
                }
            ]
        }
    }
    const items = [
        {
            key: 'home',
            label: <NavLink to="/" style={{ textAlign: 'right' }}>Trang chủ</NavLink>,
        },
        {
            key: 'movie',
            label: <NavLink to="/movies">Phim</NavLink>,
        },
        {
            key: 'theater',
            label: <NavLink to="/theaters">Rạp</NavLink>,
        },
        ...renderNavBtn()
    ];
    return (
        <div className="h-20 w-full py-5 px-5 md:px-10 header">
            <NavLink to="/">
                <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faFilm} style={{ color: "#d96c2c", fontSize: "40px" }} />
                    <span className='text-lg font-bold uppercase text-white'>Movie</span>
                </div>
            </NavLink>
            <Dropdown menu={{ items }} placement="bottomRight" overlayClassName='text-right'>
                <FontAwesomeIcon icon={faBars} style={{ fontSize: 30 }} />
            </Dropdown>
        </div>
    )
}