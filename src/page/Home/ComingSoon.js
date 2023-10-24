import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import { useSelector } from 'react-redux'
import { useWindowSize } from '@react-hook/window-size'
import ArrowCarousel from './component/Carousel/ArrowCarousel'
import { NavLink } from 'react-router-dom'
import { route } from '../../App'
import ItemCarousel from './component/Carousel/ItemCarousel'
import SlideHeader from './component/Carousel/SlideHeader'

const sliderStat = {
    width: 270,
    maxItem: 5
}

const extraInfo = {
    phimHay: false,
    phimHot: false,
    button: null,
}

export default function ComingSoon() {
    const listPhim = useSelector(state => state.filmSlice.list)
    const [comingSoonMovie, setComingSoonMovie] = useState([]);
    const [width, height] = useWindowSize()
    const [slidesToShow, setSlidesToShow] = useState(0)
    // Responsive
    useEffect(() => {
        let slides = Math.floor(width / sliderStat.width)
        slides = slides > sliderStat.maxItem ? sliderStat.maxItem : slides
        setSlidesToShow(slides)
    }, [width])

    useEffect(() => {
        setComingSoonMovie(listPhim.filter(phim => phim.sapChieu && !phim.dangChieu))
    }, [listPhim])

    return <div className='container coming-soon slider-style-1 relative'>
        <SlideHeader header='Sắp ra mắt' navLink={route.movies.sapChieu} />
        <ArrowCarousel slidesToShow={slidesToShow} list={comingSoonMovie} extraInfo={extraInfo} />
    </div>
}
