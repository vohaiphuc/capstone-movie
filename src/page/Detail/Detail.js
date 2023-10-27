import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DefaultBanner from '../../component/Header/DefaultBanner';
import TabTheater from './TabTheater';
import { theaterServ } from '../../api/api';
import moment from 'moment';
import "./style.scss"
import { useWindowWidth } from '@react-hook/window-size';
import { useMediaQuery } from 'react-responsive'
import { ConfigProvider, Skeleton } from 'antd';

const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
}
const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
}
const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
}

const itemsBreadcrumb = [
    {
        href: '/',
        title: "Home",
    },
    {
        href: '/movies',
        title: 'Movie',
    },
    {
        title: '',
    },
]

export default function Detail() {
    const params = useParams()
    const nameIdParam = params.nameId.split("-")
    const idPhim = nameIdParam[nameIdParam.length - 1]
    const [phim, setPhim] = useState([]);
    const width = useWindowWidth()
    const [loading, setLoading] = useState(true);

    // xử lý API => gọi ra tên phim để gắn vào title của DefaultBanner

    useEffect(() => {
        theaterServ.getLichChieu(idPhim)
            .then((res) => {
                const phim = res.data.content
                let defaultTrailer = "https://www.youtube.com/embed/hktzirCnJmQ?si=_I17nhK-w7n7gstR"
                phim.trailer = !phim.trailer.startsWith("https://www.youtube.com") ? defaultTrailer : phim.trailer
                phim.trailer = phim.trailer.startsWith("https://www.youtube.com/watch?v=") ? phim.trailer.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/") : phim.trailer
                setPhim(phim)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    return (
        <>
            <DefaultBanner title={phim.tenPhim} breadcrumb={itemsBreadcrumb} />
            <div className="container space-y-10 px-3 pb-10">

                <div className='my-10'>
                    <h2 className='text-2xl font-semibold mb-2 capitalize'>{phim.tenPhim}</h2>
                    <span className='font-light'>Ngày khởi chiếu: {moment(phim.ngayKhoiChieu).format("DD/MM/YYYY")}</span>
                </div>
                <div className="grid grid-cols-4 gap-5 relative py-10">
                    <div className={` w-[${width}px] bg-full`}></div>
                    <div className="col-span-4 md:col-span-1">
                        {loading ?
                            <ConfigProvider
                                theme={{
                                    token: {
                                        controlHeight: 100
                                    },
                                }}
                            >
                                <Skeleton.Image active block></Skeleton.Image>
                            </ConfigProvider>
                            :
                            <img src={phim.hinhAnh} alt="" className='w-full aspect-[4/3] md:aspect-[3/4] object-cover' />
                        }
                    </div>
                    <div className="col-span-4 md:col-span-3">
                        {loading ? <ConfigProvider
                            theme={{
                                token: {
                                    controlHeight: 100
                                },
                            }}
                        >
                            <Skeleton.Image active block></Skeleton.Image>
                        </ConfigProvider> :
                            <iframe className="w-full h-[300px] md:h-full" src={phim.trailer} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                        }
                    </div>
                </div>

                <div>
                    <h2 className='text-2xl font-semibold mb-10'>Mô tả</h2>
                    <span className='font-normal w-4/5'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos veniam maiores architecto voluptas quas iste eius delectus. Nulla, dolore. Facilis harum dolorum nisi ex officia, voluptatibus expedita inventore tempore tempora temporibus culpa quas beatae suscipit. Mollitia neque eveniet blanditiis corrupti inventore ipsum, hic iure, aspernatur itaque sapiente quod labore? Esse.
                    </span>
                </div>

                <div>
                    <h2 className='text-2xl font-semibold mb-10'>Lịch chiếu</h2>
                    <Desktop>
                        <TabTheater phim={phim} screen='desktop' />
                    </Desktop>
                    <Tablet>
                        <TabTheater phim={phim} screen='desktop' />
                    </Tablet>
                    <Mobile>
                        <TabTheater phim={phim} screen='mobile' />
                    </Mobile>
                </div>

            </div>
        </>
    )
}
