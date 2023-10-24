import React from 'react'
import "./style.scss"
import { Breadcrumb, ConfigProvider } from 'antd'

export default function DefaultBanner({ title, breadcrumb }) {
    const showBreadcrumb = () => {
        return <ConfigProvider
            theme={{
                token: { colorText: "#fff", colorTextDescription: "#fff" },
            }}
        >
            <Breadcrumb separator=">" items={breadcrumb} />
        </ConfigProvider>
    }

    return (
        <div className='w-full h-96 default-banner flex items-center justify-center'>
            <div className="text-white text-4xl font-semibold z-10 text-center pt-20">
                {typeof breadcrumb !== undefined && showBreadcrumb()}
                <h1 className='font-bold uppercase'>{title}</h1>
            </div>
        </div>
    )
}
