const USER = "USER"
const AUTOPLAY = "AUTOPLAY"
export const userLocalStorage = {
    set: (loginInfo) => {
        localStorage.setItem(USER, JSON.stringify(loginInfo))
    },
    get: () => {
        return JSON.parse(localStorage.getItem(USER))
    },
    remove: () => {
        localStorage.removeItem(USER)
    },
}

export const bannerLocalStorage = {
    autoPlay: {
        set: (auto = true) => {
            localStorage.setItem(AUTOPLAY, auto)
        },
        get: () => {
            let autoplay = localStorage.getItem(AUTOPLAY)
            return autoplay == null ? true : JSON.parse(autoplay)
        }
    }
}