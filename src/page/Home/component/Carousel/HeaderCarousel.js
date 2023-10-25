import { Button, ConfigProvider } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function HeaderCarousel({ title, navLink }) {
    return (
        <div className="flex items-center justify-between px-5 mb-5 xl:px-0">
            <h2 className='text-2xl lg:text-4xl font-semibold'>{title}</h2>
            <NavLink to={navLink}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#d96c2c",
                        },
                    }}
                >
                    <Button>Xem tất cả</Button>
                </ConfigProvider>
            </NavLink>
        </div>
    )
}
