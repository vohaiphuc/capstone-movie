import React, { useEffect, useRef, useState } from 'react'
import { filmServ, theaterServ } from '../../api/api'
import "./style.scss"
import { useLocation } from 'react-router-dom';
import Movies from './Movies';
import SearchBar from './SearchBar';
import { convertToSlug } from './utils';
import { Skeleton } from 'antd';

export default function ListMovie() {
    const location = useLocation()
    const [listPhim, setListPhim] = useState([]);
    const [listPhimSearch, setListPhimSearch] = useState([]);
    const [loading, setLoading] = useState(true);

    const getParams = (key) => {
        const searchParams = new URLSearchParams(location.search);
        let objParam = {}
        for (var [k, value] of searchParams) {
            objParam[k] = value
        }

        if (key && objParam[key]) { // có truyển key, param có key
            return objParam[key]
        } else if (key && !objParam[key]) { // có truyển key nhưng ko có key trong param
            return undefined
        } else { // ko có key
            return objParam
        }
    }

    const searchPhim = (list) => {

        let searchKey = getParams('search')
        let result = [...list]
        result = searchKey
            ? result.filter(phim => convertToSlug(phim.tenPhim).includes(convertToSlug(searchKey)))
            : result

        let dangChieu = getParams('dang_chieu')
        result = dangChieu
            ? result.filter(phim => phim.dangChieu)
            : result

        let sapChieu = getParams('sap_chieu')
        result = sapChieu
            ? result.filter(phim => phim.sapChieu)
            : result

        return result
    }

    useEffect(() => {
        // filmServ.getSuperList()
        //     .then((res) => {
        //         let list = []
        //         res.forEach(item => {
        //             let filter = item.data.content.filter(phim => phim.trailer.startsWith("http") && !phim.trailer.startsWith("https://youtube.com/rebound"))
        //             list.push(...filter)
        //         })

        //         setListPhim(list)
        //         console.log("🚀 ~ file: ListMovie.js:75 ~ .then ~ list:", list)

        //         let result = searchPhim(list)
        //         setListPhimSearch(result)
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        theaterServ.getList()
            .then((res) => {
                let list = theaterServ.mapLichChieuTheaterToLichChieuMovie(res.data.content)
                setListPhim(list)
                let result = searchPhim(list)
                setListPhimSearch(result)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    useEffect(() => {
        let result = searchPhim(listPhim)
        setListPhimSearch(result)
    }, [location])

    // useEffect(() => {
    //     setLoading(!listPhimSearch ? true : false)
    // }, [listPhimSearch])


    return (
        <div className='container'>
            <div className="search-bar mt-5 w-full md:w-1/2 flex items-center mx-auto">
                <SearchBar defaultValue={getParams('search')} />
            </div>
            <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {loading ? <Skeleton.Button active block></Skeleton.Button> :
                    <Movies list={listPhimSearch} />
                }

            </div>
        </div>
    )
}
