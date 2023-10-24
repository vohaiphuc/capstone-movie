import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Carousel } from 'antd'
import React, { useRef } from 'react'
import ItemCarousel from './ItemCarousel'
import ItemCarousel2 from './ItemCarousel2'

const defaultExtraInfo = {
    phimHay: false,
    phimHot: false,
    button: null,
}

export default function ArrowCarousel({ slidesToShow, list, extraInfo }) {
    const refCarousel = useRef()
    const renderCarousel = () => {
        let { phimHay, phimHot, button } = extraInfo
        return list?.map((phim, index) => {
            return <ItemCarousel key={index} phim={phim} phimHay={phimHay} phimHot={phimHot} button={button} />
        })
    }
    const renderCarousel2 = () => {
        return list?.map((phim, index) => {
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
                {/* {renderItem()} */}
                {extraInfo
                    ? renderCarousel()
                    : renderCarousel2()
                }
            </Carousel>
            <div className="slick-arrow">
                <button className="slick-next" onClick={() => { refCarousel.current.next() }}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    )
}
