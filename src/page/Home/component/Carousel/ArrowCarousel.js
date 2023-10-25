import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Carousel } from 'antd'
import React, { useRef } from 'react'
import ItemCarousel from './ItemCarousel'
import ItemCarousel2 from './ItemCarousel2'
import useSlideToShow from '../../hook/useSlideToShow'

export default function ArrowCarousel({ sliderConfig, list, extraInfo }) {
    const slidesToShow = useSlideToShow(sliderConfig)
    const refCarousel = useRef()

    const renderCarousel = () => {
        return (extraInfo) ?
            list?.map((phim, index) => {
                let { phimHay, phimHot, button } = extraInfo
                return <ItemCarousel key={index} phim={phim} phimHay={phimHay} phimHot={phimHot} button={button} />
            }) :
            list?.map((phim, index) => {
                return <ItemCarousel2 phim={phim} key={index} />
            })
    }


    return (
        <div className='carousel'>
            <div className="slick-arrow">
                <button className="slick-prev" onClick={() => { refCarousel.current.prev() }}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
            </div>
            <Carousel dots={false} slidesToShow={slidesToShow} ref={refCarousel}>
                {renderCarousel()}
            </Carousel>
            <div className="slick-arrow">
                <button className="slick-next" onClick={() => { refCarousel.current.next() }}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    )
}
