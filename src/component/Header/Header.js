import { useMediaQuery } from 'react-responsive'
import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from './HeaderMobile'

const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
}
const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
}
const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
}
const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 })
    return isNotMobile ? children : null
}

const Header = () => (
    <div>
        <Desktop>
            <HeaderDesktop />
        </Desktop>
        <Mobile>
            <HeaderMobile />
        </Mobile>
        <Tablet>
            <HeaderMobile />
        </Tablet>
    </div>
)

export default Header