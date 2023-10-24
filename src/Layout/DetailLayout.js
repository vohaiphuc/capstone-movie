import React from 'react'
import Header from '../component/Header/Header'
import Footer from '../component/Footer/Footer'

export default function DetailLayout({ body }) {
    return (
        <>
            <Header />
            {body}
            <Footer />
        </>
    )
}
