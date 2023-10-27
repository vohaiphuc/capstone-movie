import React, { useEffect, useRef, useState } from 'react';
import { Carousel, ConfigProvider, Radio, Switch, message } from 'antd';
import { filmServ } from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faFacebookF, faGooglePlusG, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { bannerLocalStorage } from '../../api/localService';
import { useWindowSize } from '@react-hook/window-size';
import { NavLink } from 'react-router-dom';
import { route } from '../../App';

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const Banner = () => {
    const [banner, setBanner] = useState([]);
    const [movie, setMovie] = useState();
    const ref1 = useRef()
    const ref2 = useRef()

    const [width, height] = useWindowSize()
    let slideShowTrailer = 2
    let dotPosition = 'right'
    if (width < 640 && width > 0) {
        slideShowTrailer = 1
        dotPosition = 'bottom'
        bannerLocalStorage.autoPlay.set(false)
    } else {
        slideShowTrailer = 2
    }

    useEffect(() => {
        filmServ.getBanner()
            .then((res) => {
                setBanner(res.data.content)
            })
            .catch((err) => {
                console.log(err);
                message.error("Lấy banner thất bại")
            })
    }, [])

    const renderBanner = () => {
        return banner.map((item, index) => {
            return <div className='main-banner' key={index}>
                <img src={item.hinhAnh} alt="" className='w-full h-screen object-cover' />
                <div className="share text-lg space-y-3 rounded-full py-5 hidden sm:flex">
                    <span className='text-white shar'>Share</span>
                    <span className='line' />
                    <FontAwesomeIcon icon={faFacebookF} />
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faGooglePlusG} />
                </div>
            </div>
        })
    }

    const renderTrailer = () => {
        return banner.map((item, index) => {
            return <div key={index}>
                <img src={item.hinhAnh} alt="" className='object-cover' />
            </div>
        })
    }

    const handleSlide = (currentPage, nextPage) => {
        setMovie(banner[nextPage]);
        if (nextPage - currentPage == 1 || (currentPage > 1 && nextPage == 0)) { // next
            ref2.current.next()
        } else if (nextPage - currentPage == -1) { // prev
            ref2.current.prev()
        } else {
            ref2.current.goTo(nextPage)
        }
    }

    const handleAutoplay = (auto) => {
        if (auto) {
            ref1.current.innerSlider.autoPlay()
        } else {
            ref1.current.innerSlider.pause("paused")
        }
        bannerLocalStorage.autoPlay.set(auto)
    }

    return (
        <div className='banner'>
            <ConfigProvider
                theme={{
                    components: {
                        Carousel: {
                            dotWidth: 30,
                            dotActiveWidth: 100,
                        },
                    },
                }}
            >
                <Carousel autoplay={bannerLocalStorage.autoPlay.get()} draggable dotPosition={dotPosition} ref={ref1} beforeChange={handleSlide}>
                    {renderBanner()}
                </Carousel>
            </ConfigProvider>
            {/* hidden md:flex  */}
            <div className="trailer flex w-full md:w-[650px]">
                <img src="./arrow-watch-trailer.png" alt="" className='hidden sm:block w-8 h-auto' />
                <div className='trailer-container'>
                    <div className="flex w-full items-center justify-center sm:justify-between mb-10">
                        {/* <p className='text-white font-semibold ml-5'>Trailer</p> */}
                        <div className='text-white sm:ml-5'>
                            <NavLink to={route.movies.nameId(movie?.maPhim)}>
                                <button className='rounded-sm px-5 py-3 bg-orange-600 mr-5'>Đặt vé</button>
                            </NavLink>
                            <NavLink to={route.movies.nameId(movie?.maPhim)}>
                                <button className='rounded-sm px-5 py-3 text-orange-600 bg-white'>Chi tiết</button>
                            </NavLink>
                        </div>

                        <div className="hidden sm:block">
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: "#d96c2c"
                                    },
                                }}
                            >
                                <Switch defaultChecked={bannerLocalStorage.autoPlay.get()} onChange={handleAutoplay} />
                            </ConfigProvider>
                        </div>

                    </div>
                    <Carousel dots={false} ref={ref2} dotPosition={"top"} slidesToShow={slideShowTrailer} infinite >
                        {renderTrailer()}
                    </Carousel>
                </div>
            </div>
        </div>

    );
};
export default Banner;