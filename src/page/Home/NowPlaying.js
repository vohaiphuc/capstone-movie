import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import ArrowCarousel from './component/Carousel/ArrowCarousel'
import { route } from '../../App'
import ContainerCarousel from './component/Carousel/ContainerCarousel'
import HeaderCarousel from './component/Carousel/HeaderCarousel'

const sliderConfig = {
    width: 270,
    maxItem: 5
}

const extraInfo = {
    phimHay: true,
    phimHot: true,
    button: 'dat-ve',
}

export default function NowPlaying() {

    const list = useSelector(state => state.filmSlice.list)
        .filter(phim => phim.dangChieu && !phim.sapChieu)

    return <ContainerCarousel>
        <HeaderCarousel title='Phim đang chiếu' navLink={route.movies.dangChieu} />
        <ArrowCarousel sliderConfig={sliderConfig} list={list} extraInfo={extraInfo} />
    </ContainerCarousel>
}
