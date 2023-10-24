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
    phimHay: true,
    phimHot: true,
    button: 'dat-ve',
}

const NowPlaying = () => {
    const [width, height] = useWindowSize()
    const listPhim = useSelector(state => state.filmSlice.list)
    const [nowPlayingMovie, setNowPlayingMovie] = useState([]);
    const [slidesToShow, setSlidesToShow] = useState(0)

    useEffect(() => {
        setNowPlayingMovie(listPhim.filter(phim => phim.dangChieu && phim.sapChieu == false))
    }, [listPhim])

    // Responsive
    useEffect(() => {
        let slides = Math.floor(width / sliderStat.width)
        slides = slides > sliderStat.maxItem ? sliderStat.maxItem : slides
        setSlidesToShow(slides)
    }, [width])

    return <div className='container now-playing slider-style-1 relative'>
        <SlideHeader header='Phim đang chiếu' navLink={route.movies.dangChieu} />
        <ArrowCarousel slidesToShow={slidesToShow} list={nowPlayingMovie} extraInfo={extraInfo} />
    </div>
}
export default NowPlaying