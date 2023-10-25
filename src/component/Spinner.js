import React from 'react'
import { useSelector } from 'react-redux'
import { BounceLoader, RotateLoader } from 'react-spinners'

export default function Spinner() {
    let { isLoading } = useSelector(state => state.spinnerSlice)
    return (
        <>
            {isLoading && <div className='w-screen h-screen bg-black flex justify-center items-center fixed top-0 left-0 z-20'>
                <RotateLoader color="#d96c2c" speedMultiplier={0.6} />
            </div>}
        </>
    )
}
