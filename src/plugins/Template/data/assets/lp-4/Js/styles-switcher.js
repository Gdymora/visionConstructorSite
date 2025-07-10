function changeVarible() {
    mainPartActive = true
}

function changeStyles() {
    if (changeVarible.mainPartActive == true) {
        let headTag = document.getElementById('media-styles')
        headTag.setAttribute("href", "Media/media-main.css")
    }

    else if (changeVarible.mainPartActive == false) {
        let headTag = document.getElementById('media-styles')
        headTag.setAttribute("href", "Media/media-form.css")
    }
}

export { changeVarible, changeStyles }