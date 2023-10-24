function handleScroll() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementsByClassName("header")[0].classList.add("scrolling")
    } else {
        document.getElementsByClassName("header")[0].classList.remove("scrolling")
    }
}

console.log(123);