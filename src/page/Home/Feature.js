import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux';
import ArrowCarousel from './component/Carousel/ArrowCarousel';

const sliderConfig = {
    width: 270,
    maxItem: 3
}

export default function Feature() {
    let list = [...useSelector(state => state.filmSlice.list)]
        .sort((a, b) => b.danhGia - a.danhGia).slice(0, 5)

    return (
        <div className='container flex items-center justify-end flex-wrap mb-10 featured-movie'>
            <div className="w-full md:w-1/2 flex flex-col items-start px-5 xl:px-0">
                <div className="mb-2">
                    <FontAwesomeIcon icon={faFilm} color='#d96c2c' style={{ fontSize: 24 }} />
                </div>
                <p className='text-gray-500 mb-2 font-semibold'>Top phim</p>
                <h2 className='text-5xl mb-5 font-semibold text-white'>Đánh giá cao</h2>
            </div>
            <div className="hidden md:block w-1/2 text-gray-500">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus voluptatibus repellendus provident quia sunt ipsum voluptatem porro sed harum nostrum.</p>
            </div>
            <div className="w-full">
                <ArrowCarousel list={list} sliderConfig={sliderConfig} />
            </div>
        </div>
    )
}
