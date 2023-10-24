import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { route } from '../../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function Search() {
    const navigate = useNavigate()
    const [inputBar, setInputBar] = useState(false);
    const [searchKey, setSearchKey] = useState("");

    const handleOnKeyDown = (e) => {
        if (e.key == "Enter") {
            e.preventDefault()
            setInputBar(false)
            navigate(route.movies.search(searchKey))
        }
    }
    const handleSearch = () => {
        navigate(route.movies.search(searchKey))
    }

    return !inputBar ? (
        <FontAwesomeIcon icon={faSearch} onClick={() => { setInputBar(true) }} className='cursor-pointer text-xl' />
    ) : (
        <div className='search-bar' onBlur={() => {
            setInputBar(false)
        }}>
            {/* <FontAwesomeIcon icon={faSearch} className='icon' onClick={handleSearch} /> */}
            <input placeholder='Tìm kiếm'

                value={searchKey}
                onChange={(e) => { setSearchKey(e.target.value) }}
                autoFocus
                onKeyDown={handleOnKeyDown}
            />
        </div>
    )
}
