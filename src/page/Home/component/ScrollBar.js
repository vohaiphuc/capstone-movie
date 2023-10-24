import React, { useEffect } from 'react'
import Scrollbar from 'smooth-scrollbar';

export default function ScrollBar({ style, content }) {
    useEffect(() => {
        Scrollbar.initAll()
    }, [])
    return (
        <div style={style} data-scrollbar>
            {content}
        </div>
    )
}
