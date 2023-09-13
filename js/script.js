/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav__menu"),
    navToggle = document.getElementById("nav__toggle"),
    navClose = document.getElementById("nav__close")

//* ===== MENU SHOW ===== *//
/* Validate if constant Exist */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

//* ===== MENU HIDDEN ===== *//
/* Validate if constant Exist */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link")

const linkAction = () => {
    const navMenu = document.getElementById('nav__menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header')
    // when the scroll is greater than 50 viewport height, add thescroll-header calss
    this.scrollY >= 50 ? header.classList.add('bg-header')
        : header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


// const sections = document.querySelectorAll('section[id]');

// const scrollActive = () => {
//   const scrollY = window.pageYOffset;

//   sections.forEach(current => {
//     const sectionHeight = current.offsetHeight,
//           sectionTop = current.offsetTop - 58,
//           sectionId = current.getAttribute('id'),
//           sectionsClass = document.querySelector(`nav__menu a[href*="${sectionId}"]`);

//     if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
//       sectionsClass.classList.add('active-link');
//     } else {
//       sectionsClass.classList.remove('active-link');
//     }
//   });
// };

// window.addEventListener('scroll', scrollActive);

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active-link');
                } else {
                    link.classList.remove('active-link');
                }
            });
        }
    });
};

window.addEventListener('scroll', scrollActive);


/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    //When the scroller is higher than 350 viewport height,addthe show scroll class to the a tag with the scrollup
    this.scrollY >=550 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}

window.addEventListener('scroll', scrollUp)


/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance:'60px',
    duration:2500,
    delay:400,
})

sr.reveal(`.home__data, .footer__container, .footer__group`)
sr.reveal(`.home__img`, {delay: 700, origin:'bottom'})
sr.reveal(`.logos__img, .program__card, .pricing__card`, {interval: 100})
sr.reveal(`.choose__img, .calculate__content`, {origin:'left'})
sr.reveal(`.choose__content, .calculate__img`, {origin:'lright'})

/*=============== CALCULATE JS ===============*/
const calculateForm = document.getElementById("calculate__form"),
    calculateCm = document.getElementById("calculate__cm"),
    calculateKg = document.getElementById("calculate__kg"),
    calculateMessage = document.getElementById("calculate__message");

const calculateBmi = (e) => {
    e.preventDefault()

    // Check if the fields have a value
    if (calculateCm.value === '' || calculateKg.value === '') {
        // Add and remove color
        calculateMessage.classList.remove('color-green')
        calculateMessage.classList.add('color-red')

        // Show message
        calculateMessage.textContent = 'Fill in the Height and Weight 🤦‍♂️'

        // Remove message three seconds
        setTimeout(() => {
            calculateMessage.textContent = ''
        }, 2000)
    }
    else {
        // BMI Formula
        const cm = calculateCm.value / 100,
            kg = calculateKg.value,
            bmi = Math.round(kg / (cm * cm))

        // Show your health status
        if (bmi < 18.5) {
            // Add color and display message
            calculateMessage.classList.add('color-green')
            calculateMessage.textContent = `Your BMI is ${bmi} and you are skinny 🙁`
        }
        else if (bmi < 25) {
            calculateMessage.classList.add('color-green')
            calculateMessage.textContent = `Your BMI is ${bmi} and you are healthy 🥳`
        }
        else {
            calculateMessage.classList.remove('color-green')
            calculateMessage.classList.add('color-red')
            calculateMessage.textContent = `Your BMI is ${bmi} and you are overweight 😞`
        }

        // To clear the input field
        setTimeout(() => {
            calculateCm.value = ''
            calculateKg.value = ''
        }, 1000)

        // Remove message four seconds
        setTimeout(() => {
            calculateMessage.textContent = ''
        }, 4000)

    }
}

calculateForm.addEventListener('submit', calculateBmi);


/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message'),
    contactUser = document.getElementById('contact-user')

const sendemail = (e) => {
    e.preventDefault()

    // Check if the field has a value
    if (contactUser.value === '') {
        // Add and remove color
        contactMessage.classList.remove('color-green')
        contactMessage.classList.add('color-red')

        // Show message
        contactMessage.textContent = 'You must enter your email 👆';

        // Remove message three seconds
        setTimeout(() => {
            contactMessage.textContent = ''
        }, 2000)
    }
    else {
        // serviceID - templateID - #form - publicKey
        emailjs.sendForm('service_cageyes', 'template_ofmklu9', '#contact-form', 'XulQqyukcx5FEh9-P')
            .then(() => {
                // Show message and add color
                contactMessage.classList.add('color-green')
                contactMessage.textContent = 'You registered successfully 💪'

                // Remove message after three seconds
                setTimeout(() => {
                    contactMessage.textContent = ''
                }, 3000)
            }, (error) => {
                // Mail sending error
                alert('OOPS! SOMETHING HAS FAILED...', error)
            })

        // To clear the input field
        contactUser.value = '';
    }
}

contactForm.addEventListener('submit', sendemail)