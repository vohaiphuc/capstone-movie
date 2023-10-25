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
    phimHay: false,
    phimHot: false,
    button: null,
}

export default function ComingSoon() {

    const list = useSelector(state => state.filmSlice.list)
        .filter(phim => !phim.dangChieu && phim.sapChieu)

    return <ContainerCarousel>
        <HeaderCarousel title='Sắp ra mắt' navLink={route.movies.sapChieu} />
        <ArrowCarousel sliderConfig={sliderConfig} list={list} extraInfo={extraInfo} />
    </ContainerCarousel>
}
