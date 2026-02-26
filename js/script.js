const openBtn = document.querySelector('.icon-open-menu .ico-menu')
const closeBtn = document.querySelector('.nav-menu .ico-close')
const navMenu = document.querySelector('.header-menu')

openBtn.addEventListener('click', () => {
    if(!navMenu.classList.contains('active')) {
        navMenu.classList.add('active')
    }
})

closeBtn.addEventListener('click', () => {
    if(navMenu.classList.contains('active')) {
        navMenu.classList.remove('active')
    }
})