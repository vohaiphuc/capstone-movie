import React from 'react'
import MoviesItem from './MoviesItem'

export default function Movies({ list }) {
    const renderMovieList = () => {
        return list.map((phim, index) => {
            return <MoviesItem phim={phim} key={index} />
        })
    }
    return (
        <>
            {renderMovieList()}
        </>
    )
}
