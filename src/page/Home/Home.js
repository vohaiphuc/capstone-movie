import React, { useEffect, useState } from 'react'
import Header from '../../component/Header/Header'
import TabMovie from './component/TabMovie'
import Banner from './Banner'
import { Divider } from 'antd'
import FilterSelect from './component/FilterSelect'
import NowPlaying from './NowPlaying'
import ComingSoon from './ComingSoon'
import { setFilmList } from '../../redux/filmSlice'
import { useDispatch } from 'react-redux'
import { filmServ, theaterServ } from '../../api/api'
import Feature from './Feature'
import Discount from './Discount'
import './asset/style.scss'

export default function Home() {
    const dispatch = useDispatch()
    useEffect(() => {
        theaterServ.getList()
            .then((res) => {
                let list = theaterServ.mapLichChieuTheaterToLichChieuMovie(res.data.content)
                console.log("🚀 ~ file: Home.js:21 ~ .then ~ list:", list)
                dispatch(setFilmList(list))
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    // useEffect(() => {
    //     filmServ.getSuperList()
    //         .then((res) => {
    //             // let list = res.data.content
    //             let list = []
    //             res.forEach(item => list.push(...item.data.content))
    //             dispatch(setFilmList(list))
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }, [])
    return (
        <div>
            <Banner />
            <div className='block-1 pt-5 lg:py-20 space-y-5 lg:space-y-20'>
                <NowPlaying />
                <div className='bg-black relative z-20 py-5 lg:py-20'>
                    <Feature />
                </div>
                <ComingSoon />
                <Discount />
            </div>
        </div>
    )
}
