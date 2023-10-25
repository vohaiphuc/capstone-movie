import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { userLocalStorage } from '../../api/localService'
import "./style.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faFilm, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'antd'
import { formLogin, formRegister, setFormLogin } from '../../redux/loginFormSlice'
import { route } from '../../App'
import Search from './Search'

export default function HeaderDesktop() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.userSlice)

    const handleLogout = () => {
        userLocalStorage.remove()
        // navigate(0)
        window.location.href = route.home.path;
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

    const handleLogin = () => {
        dispatch(setFormLogin(formLogin))
        navigate(route.login.path)
    }

    const handleRegister = () => {
        dispatch(setFormLogin(formRegister))
        navigate(route.login.path)
    }

    const renderNavBtn = () => {
        const classBtn = 'border-2 border-red-600 px-7 py-2 rounded-xl'
        if (user) { // loged in
            return <>
                <NavLink to={route.user.path}>
                    <Tooltip title="Người dùng">
                        <FontAwesomeIcon icon={faUser} style={{ cursor: 'pointer', fontSize: '20px' }} />
                    </Tooltip>
                </NavLink>
                <Tooltip title="Đăng xuất">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={() => { handleLogout() }} style={{ cursor: 'pointer', fontSize: '20px' }} />
                </Tooltip>
            </>
        } else { // loged out
            return <>
                <button className={classBtn} onClick={handleLogin}>Đăng nhập</button>
                <button className={classBtn} onClick={handleRegister}>Đăng ký</button>
            </>
        }
    }

    return (
        <div className="h-20 w-full py-5 px-10 header">
            <div className="w-1/3">
                <NavLink to="/">
                    <div className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faFilm} style={{ color: "#d96c2c", fontSize: "40px" }} />
                        <span className='text-lg font-bold uppercase text-white'>Movie</span>
                    </div>
                </NavLink>
            </div>
            <div className='font-semibold w-1/3 flex items-center justify-center text-center'>
                <NavLink to={route.home.path} className={'nav'}>Home</NavLink>
                <NavLink to={route.movies.path} className={'nav'}>Phim</NavLink>
                {/* <NavLink to={route.theaters.path} className={'nav'}>Rạp</NavLink> */}
            </div>
            <div className='space-x-7 w-1/3 flex items-center justify-end'>
                <Tooltip title="Tìm kiếm">
                    <Search />
                </Tooltip>
                {renderNavBtn()}
            </div>
        </div>
    )
}