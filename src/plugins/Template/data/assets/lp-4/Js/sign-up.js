import { changeVarible, changeStyles } from './styles-switcher.js'

let links = document.querySelector('.links')
let mainContent = document.querySelector('.main-content-wrapper').children;
let form = document.querySelector('.sign-up-form')
let footer = document.querySelector('footer')

function viewForm() {
    form.style.opacity = "1"
}

function checkSentences() {
    if (changeVarible.mainPartActive == false) {
        let h1 = document.querySelector('.hero > h1')
        if (window.screen.width <= 350) {
            h1.textContent = "Welcome. We exist to make entrepre-\nneurism easier."
        }
        else if (window.screen.width >= 325) {
            h1.textContent = "Welcome. We exist to make entrepreneurism easier."
        }
    }
}

window.onresize = function () {
    checkSentences()
}

function viewSignUpPage() {
    changeVarible.mainPartActive = false
    links.style.display = "none"
    form.style.display = "flex"
    footer.style.display = "none"
    changeStyles()
    setTimeout(viewForm, 500)

    for (let i = 0; i < mainContent.length; i++) {
        mainContent[i].style.display = "none"
        mainContent[1].style.display = "flex"
        let h1 = mainContent[1].children

        for (let e = 0; e < h1.length; e++) {
            h1[e].style.display = "none"
            h1[0].style.display = "initial"
            h1[0].textContent = "Welcome. We exist to make entrepreneurism easier."
        }
    }
    checkSentences()
}

document.getElementById('goToForm').addEventListener('click', viewSignUpPage)






