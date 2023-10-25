import { useWindowWidth } from '@react-hook/window-size';
import React, { useEffect, useState } from 'react'

export default function useSlideToShow(sliderConfig) {
    const [slides, setSlides] = useState(0);
    const width = useWindowWidth()

    // Responsive
    useEffect(() => {
        let slides = Math.floor(width / sliderConfig.width)
        slides = slides > sliderConfig.maxItem ? sliderConfig.maxItem : slides
        setSlides(slides)
    }, [width])

    return slides
}
