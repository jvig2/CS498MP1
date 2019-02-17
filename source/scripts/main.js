var currentScrollY = 0;
var targetScrollY = 0;

function scrollTo(yPosition, timeToScroll = 10, scrollSpeed = 50) {
    targetScrollY = yPosition - 50;
    
    let screenY = Math.floor(window.scrollY);
    if (screenY > yPosition) {
        var scrolling = setInterval(function () {
            screenY = screenY - scrollSpeed;
            if (screenY <= targetScrollY) {
                clearInterval(scrolling);
                return;
            }
            window.scrollTo(0, screenY);
        }, timeToScroll);
    } 
    if (screenY < yPosition) {
        var scrolling = setInterval(function () {
            screenY = screenY + scrollSpeed;
            if (screenY >= targetScrollY) {
                clearInterval(scrolling);
                return;
            }
            window.scrollTo(0, screenY);
        }, timeToScroll);
    }
}

function setOnclickNavBar () {
    Bottom.onclick = function () {
        scrollTo(0)
    }
    reviews.onclick = function () {
        scrollTo(distReviews)
    } 
    sponsors.onclick = function () {
        scrollTo(sectB.offsetTop)
    }
    video.onclick = function () {
        scrollTo(sectC.offsetTop)
    }
    contact.onclick = function () {
        scrollTo(sectD.offsetTop)
    }
}

function highlightLi (element) {
    let selectables = document.getElementsByClassName('selectable')
    Array.prototype.map.call(selectables, function (element) {
        element.classList.remove('active')
    })

    element.classList.add('active')
}

function resizeNavBar(shrink) {
    console.log(shrink)
    if (shrink) {
        Array.prototype.map.call(document.getElementsByClassName('shrink'), function (element) {
            element.style.visibility = 'hidden'
            element.classList.add('gone')
        })          
        Array.prototype.map.call(document.getElementsByClassName('selectable'), function (element) {
            element.style.width = '22%'
        })
        document.getElementById('bottom').style.width = '10%'
        document.getElementById('svg-small').style.fontSize = '48px'
        document.getElementById('nav-box').style.height = '0px'
    } else {
        Array.prototype.map.call(document.getElementsByClassName('shrink'), function (element) {
            element.classList.remove('gone')
            element.style.visibility = 'visible'
        })
        Array.prototype.map.call(document.getElementsByClassName('selectable'), function (element) {
            element.style.width = '25%'
        })
        document.getElementById('bottom').style.width = '0%'
        document.getElementById('svg-small').style.fontSize = '0px'
        document.getElementById('nav-box').style.height = navBarHeight
    }
}

function setOnmouseoverNavBar () {
    let selectables = document.getElementsByClassName('selectable')
    Array.prototype.map.call(selectables, function (element) {
        element.onmouseover = function (event) {
            Array.prototype.map.call(selectables, function (element) {
                element.classList.remove('active')
            })

            element.classList.add('active')
        }

        element.onmouseout = function (event) {
            changeSelectedByScroll(window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0)
        }
    })
}

function changeSelectedByScroll (scrolled) {
    let frScroll = scrolled + 100

    if (frScroll < sectA.offsetTop) {
        highlightLi(Bottom)
    } else if (frScroll < sectB.offsetTop) {
        highlightLi(reviews)
    } else if (frScroll < sectC.offsetTop) {
        highlightLi(sponsors)
    } else if (frScroll < sectD.offsetTop) {
        highlightLi(video)
    } else {
        highlightLi(contact)
    }
}

function carouselTravis(index, right) {
    let caro = document.getElementById('carousel-pic')
    
    if (right) {
        caro.classList.add('slideRight')
        setTimeout(() => {
            caro.classList.remove('slideRight')
            caro.src = picArr[index]
            caro.classList.add('fromLeft')
            setTimeout(() => {
                caro.classList.remove('fromLeft')
            }, 100)
        }, 100)

    } else {
        caro.classList.add('slideLeft')
        setTimeout(() => {
            caro.classList.remove('slideLeft')
            caro.src = picArr[index]
            caro.classList.add('fromRight')
            setTimeout(() => {
                caro.classList.remove('fromRight')
            }, 100)
        }, 100)
    }
}

document.getElementById('left-carousel-button').onclick = function () {
    let temp = picArr[0]
    picArr.splice(0, 1)
    picArr = picArr.concat([temp])
    carouselTravis(0, false)
}

document.getElementById('right-carousel-button').onclick = function () {
    picArr.splice(0, 0, picArr[picArr.length - 1])
    picArr.splice(picArr.length - 1, 1)
    carouselTravis(0, true)
}

var modal = document.getElementById('factory-modal-pic');
modal.style.display = 'none'

var facPic = document.getElementById('normal-factory-pic')

facPic.onclick = function () {
    modal.style.display = 'block'
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none'
    }
}

document.getElementById('close-button').onclick = function () {
    console.log('close')
    modal.style.display = 'none'
}

document.body.onscroll = function (event) {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    resizeNavBar(scrolled > 50)
    changeSelectedByScroll(scrolled)
}

var Bottom = document.getElementById('bottom')
var reviews = document.getElementById('reviews-li')
var sponsors = document.getElementById('sponsors-li')
var video = document.getElementById('video-li')
var contact = document.getElementById('stay-in-contact-li')

var sectA = document.getElementById('review-section')
var sectB = document.getElementById('sponsor-footer')
var sectC = document.getElementById('video-container-picture-box')
var sectD = document.getElementById('social-media-div')

var navBarHeight = document.getElementById('nav-box').style.height;

var picArr = [
    'assets/33783381576_e884137181_o.jpg',
    'assets/33783384216_1bc658219d_o.jpg',
    'assets/33783385616_beefdbba1a_o.jpg'
]

setOnclickNavBar()

setOnmouseoverNavBar()