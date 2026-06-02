const hero = document.querySelector('.hero-container');
const navbar = document.querySelector('.navbar');

const burger = document.querySelector('.ico-burger');
const panel = document.querySelector('.pannel');
const closeBtn = document.querySelector('.ico-close');

let navbarReachedTop = false;

/* MOSTRAR NAVBAR AL PASAR MEDIA HERO */

function checkNavbarVisibility() {

    const heroHeight = hero.offsetHeight;
    const triggerPoint = heroHeight / 2;

    if (window.scrollY > triggerPoint) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }

    /* comprobar si la navbar ya tocó el top */
    const rect = navbar.getBoundingClientRect();

    navbarReachedTop = rect.top <= 0;
}

window.addEventListener('scroll', checkNavbarVisibility);

checkNavbarVisibility();

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
            panel.classList.add('open');
        }, 500);

    } else {

        panel.classList.add('open');
    }
});

/* CERRAR MENÚ */

closeBtn.addEventListener('click', () => {
    panel.classList.remove('open');
});

function moveScrollto(id) {
    //Obtener la altura del header
    const headerElement = document.querySelector('navbar')
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

        if(item.classList.contains('!active')) {
            item.classList.add('active')
        }

        const section = item.dataset.rel
        moveScrollto(section)

        panel.classList.remove('open');
    })
})
