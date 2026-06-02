const hero = document.querySelector('.hero-container');
const navbar = document.querySelector('.navbar');

const burger = document.querySelector('.ico-burger');
const panel = document.querySelector('.pannel');
const closeBtn = document.querySelector('.ico-close');

const body = document.querySelector('body')
const firstSection = document.getElementById('donde');

let navbarReachedTop = false;
let navbarVisible = false;
let heroHeightLocked = false;

function setStableHeroHeight() {
    if (heroHeightLocked) {
        return;
    }

    const viewportHeight = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight;

    document.documentElement.style.setProperty('--hero-height', `${viewportHeight}px`);
    heroHeightLocked = true;
}

/* MOSTRAR NAVBAR CUANDO APARECE LA SECCION "DONDE" */

// function checkNavbarVisibility() {
//     if (!firstSection) {
//         return;
//     }

//     const sectionTop = firstSection.getBoundingClientRect().top;
//     const showPoint = window.innerHeight - 1;
//     const hidePoint = window.innerHeight + navbar.offsetHeight;

//     if (!navbarVisible && sectionTop <= showPoint) {
//         navbarVisible = true;
//     }

//     if (navbarVisible && sectionTop > hidePoint) {
//         navbarVisible = false;
//     }

//     navbar.classList.toggle('visible', navbarVisible);

//     /* comprobar si la navbar ya tocó el top */
//     const rect = navbar.getBoundingClientRect();

//     navbarReachedTop = rect.top <= 0;
// }

setStableHeroHeight();

// window.addEventListener('scroll', checkNavbarVisibility, { passive: true });
// window.addEventListener('orientationchange', () => {
//     heroHeightLocked = false;
//     setTimeout(() => {
//         setStableHeroHeight();
//         checkNavbarVisibility();
//     }, 300);
// });

// checkNavbarVisibility();

/* ABRIR MENÚ */

burger.addEventListener('click', () => {

    /*
        Si la navbar todavía no llegó arriba,
        hacemos scroll automático hasta ella
    */

    if (!navbarReachedTop) {

        navbar.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        /*
            esperamos a que termine el scroll
            antes de abrir el menú
        */

        setTimeout(() => {
            body.classList.add('open');
        }, 500);

    } else {

        body.classList.add('open');
    }
});

/* CERRAR MENÚ */

closeBtn.addEventListener('click', () => {
    body.classList.remove('open');
});

function moveScrollto(id) {
    //Obtener la altura del header
    const headerElement = document.querySelector('.navbar')
    const headerHeight = headerElement ? headerElement.offsetHeight : 0;

    const secureSpace = 30;

    const section = document.getElementById(id)

    if(section) {
        const sectionTopAbsolute = section.getBoundingClientRect().top + window.pageYOffset

        const scrollEnd = sectionTopAbsolute - headerHeight - secureSpace

        window.scrollTo({
            top: scrollEnd,
            behavior: 'smooth'
        })
    }
}

const navLinks = document.querySelectorAll('.menu-item')

navLinks.forEach( item => {
    item.addEventListener('click', event => {
        event.preventDefault()

        const section = item.dataset.rel
        moveScrollto(section)

        body.classList.remove('open');
    })
})
