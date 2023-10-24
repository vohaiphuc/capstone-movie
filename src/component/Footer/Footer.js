import { faFacebook, faInstagram, faPinterest, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "./style.scss"
import { faLocationArrow, faPlane } from '@fortawesome/free-solid-svg-icons'
import { ConfigProvider, Radio } from 'antd'

export default function Footer() {
    const renderSocialIcon = () => {
        const socialList = [faFacebook, faTwitter, faPinterest, faInstagram,]
        return socialList.map((icon, index) => {
            return <div className="social-icon" key={index}>
                <FontAwesomeIcon icon={icon} />
            </div>
        })
    }
    return (
        <div className='bg-black pt-5'>
            <div className="container px-5 xl:px-0">
                <div className="flex items-center justify-between mb-5 flex-col md:flex-row">
                    <h2 className='text-2xl text-white font-bold'>MOVIE</h2>
                    <div className='text-gray-500 flex items-center'>
                        <span className='mr-8'>
                            <a href="#" className='mr-2'>Help</a>
                            /
                            <a href="#" className='ml-2'>Privacy</a>
                        </span>
                        <div className='space-x-2 flex items-center'>
                            {renderSocialIcon()}
                        </div>
                    </div>
                </div>
                <div className='divider'></div>
                <div className='links py-5 lg:py-24 grid grid-cols-4 space-y-8 lg:space-y-0'>
                    <div className='col-span-4 lg:col-span-1'>
                        <p className='font-bold text-xl text-white mb-5'>Buy movie tickets easily with Aovis system nationwide</p>
                        <button className='py-2 px-5 bg-orange-600 text-white text-sm font-semibold'>Get your ticket</button>
                    </div>
                    <div className='text-gray-500 flex flex-col col-span-2 lg:col-span-1'>
                        <h3>Movies</h3>
                        <div className='space-y-4 flex flex-col pages'>
                            <a href="#">Action</a>
                            <a href="#">Adventure</a>
                            <a href="#">Animation</a>
                            <a href="#">Comedy</a>
                            <a href="#">Crime</a>
                        </div>
                    </div>
                    <div className='text-gray-500 flex flex-col col-span-2 lg:col-span-1'>
                        <h3>Links</h3>
                        <div className='space-y-4 flex flex-col pages'>
                            <a href="#">About</a>
                            <a href="#">My account</a>
                            <a href="#">News</a>
                            <a href="#">Latest Events</a>
                            <a href="#">Contact</a>
                        </div>
                    </div>
                    <div className='text-gray-500 col-span-4 lg:col-span-1'>
                        <h3>Newsletter</h3>
                        <p className='mb-8'>Subscribe to Leitmotif newsletter this very day.</p>
                        <div className="email mb-4">
                            <input type="text" className='w-full' placeholder='Email Address' />
                            <div className="email-icon">
                                <FontAwesomeIcon icon={faLocationArrow} />
                            </div>
                        </div>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: "#d96c2c"
                                },
                            }}
                        >
                            <Radio><span className='text-base text-gray-500'>I agree to all <a href="#" className='text-orange-700'>terms and policies</a> of the company</span></Radio>
                        </ConfigProvider>
                    </div>
                </div>
            </div>
            <div className="copyright py-5 text-center bg-[#131313]">
                <p className='text-gray-500'>© Copyright 2023</p>
            </div>
        </div >
    )
}
