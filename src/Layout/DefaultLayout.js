import React from 'react'
import Header from '../component/Header/Header'
import DefaultBanner from '../component/Header/DefaultBanner'
import Footer from '../component/Footer/Footer'

export default function DefaultLayout({ title, body, breadcrumb }) {
    return (
        <>
            <Header />
            <DefaultBanner title={title} breadcrumb={breadcrumb} />
            {body}
            <Footer />
        </>
    )
}
