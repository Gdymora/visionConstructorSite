let btn = document.getElementById('btn-to-top')
let height = 1500

window.onscroll = function () {
    scrollFunction()
}

function scrollFunction() {
    if (document.documentElement.scrollTop > height) {
        btn.style.display = "inherit"
    }

    else {
        btn.style.display = "none"
    }
}

function toTop() {
    document.documentElement.scrollTop = 0
}