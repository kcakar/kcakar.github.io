import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
gsap.registerPlugin(ScrollTrigger);

const mediaQuery = window.matchMedia("(min-width: 701px)");

export class Slider {
    constructor(selector, delay = 2, animationDuration = 1, showIndicators = false) {
        this.slides = document.querySelectorAll(`${selector} .slide`);
        this.countOfSlides = this.slides.length;
        this.delay = delay * 1000;
        this.animationDuration = animationDuration;
        this.currentIndex = 1;
        this.showIndicators = showIndicators;

        if (this.showIndicators) {
            this.createIndicators(selector);
        }
    }

    start() {
        this.loop();
    }

    loop() {
        this.animationTimer = setTimeout(() => {
            let previousIndex = this.currentIndex - 1;
            if (previousIndex < 0) {
                previousIndex = this.countOfSlides - 1;
            }

            gsap.to(this.slides[previousIndex], {
                opacity: 0,
                duration: this.animationDuration,
            });
            gsap.to(this.slides[this.currentIndex], {
                opacity: 1,
                duration: this.animationDuration,
            });

            if (this.showIndicators) {
                this.updateIndicators(previousIndex, this.currentIndex);
            }

            this.currentIndex++;
            if (this.currentIndex >= this.countOfSlides) {
                this.currentIndex = 0;
            }

            this.loop();
        }, this.delay);
    }

    stop() {
        clearTimeout(this.animationTimer);
    }

    createIndicators(selector) {
        const container = document.querySelector(selector);
        this.indicatorContainer = document.createElement('div');
        this.indicatorContainer.classList.add('slider-indicators');
        container.appendChild(this.indicatorContainer);

        this.indicators = [];
        for (let i = 0; i < this.countOfSlides; i++) {
            const circle = document.createElement('div');
            circle.classList.add('indicator');
            circle.addEventListener('click', () => this.onIndicatorClick(i));
            this.indicatorContainer.appendChild(circle);
            this.indicators.push(circle);
        }

        this.updateIndicators(-1, 0);
    }

    onIndicatorClick(index) {
        this.stop();
        this.currentIndex = index;
        this.updateSlides();
    }

    updateSlides() {
        let previousIndex = this.currentIndex - 1;
        if (previousIndex < 0) {
            previousIndex = this.countOfSlides - 1;
        }

        this.slides.forEach(slide => {
            gsap.to(slide, {
                opacity: 0,
                duration: this.animationDuration,
            });
        })

        gsap.to(this.slides[this.currentIndex], {
            opacity: 1,
            duration: this.animationDuration,
        });

        this.indicators.forEach((item, index) => {
            if (this.currentIndex != index) {
                item.classList.remove('active');
            }
        })
        this.updateIndicators(previousIndex, this.currentIndex);
    }

    updateIndicators(previousIndex, currentIndex) {
        if (previousIndex !== -1) {
            this.indicators[previousIndex].classList.remove('active');
        }
        this.indicators[currentIndex].classList.add('active');
    }
}

export function servicesSlider() {
    const services = document.querySelector(".services");
    const serviceWidth = services.scrollWidth;

    const g = document.querySelector('.list');
    const demo = document.querySelector('.services');
    let cloudCopy = g.cloneNode(true);
    demo.appendChild(cloudCopy);
    const tl2 = gsap.timeline();
    tl2.set(cloudCopy, { xPercent: 0 });
    tl2.to('.list', { duration: 50, xPercent: "-=100", ease: "none", repeat: -1 });
}

fixedNavbar();
export function fixedNavbar() {
    if (mediaQuery.matches) {
        gsap.to(".navbar", {
            scrollTrigger: {
                trigger: ".menu",
                start: "top top",
                end: "max",
                pin: true,
                pinSpacing: false
            }
        });
    }
}
mediaQuery.addEventListener("change", fixedNavbar);

export function menuAndLogoAnimations() {
    const tl = gsap.timeline();
    tl.fromTo('.logo', { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
    if (mediaQuery.matches) {
        const menuLinks = document.querySelectorAll(".menu li");
        let delay = 0.5;
        menuLinks.forEach((link, key) => {
            tl.fromTo(link, { opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 })
        })
    }
}

export function textWriteEffects() {
    const textsToAnimate = document.querySelectorAll('.write');

    textsToAnimate.forEach((textElement, index) => {
        const rainbowContent = textElement.querySelector('.rainbow');

        let text = '';
        if (!rainbowContent) {
            text = textElement.textContent;
        } else {
            text = textElement.textContent.replace(rainbowContent.textContent, '');
        }

        textElement.textContent = '';
        text.split('').forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char;
            textElement.appendChild(span);
        });

        if (rainbowContent) {
            const rainbowText = rainbowContent.textContent;
            rainbowContent.textContent = '';
            const length = rainbowText.split('').length;
            rainbowText.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.color = getRockColors(index);
                textElement.appendChild(span);
            });
        }
        if (index + 1 == textsToAnimate.length) {
            textsToAnimate.forEach(el => animateLetters(el));
        }
    });
}

export function animateText(textElement, duration, stagger, delay) {
    const text = textElement.textContent;
    textElement.textContent = '';
    text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        textElement.appendChild(span);
    });
    return animateLetters(textElement, duration, stagger, delay);
}

function animateLetters(textElement, duration = 1, stagger = 0.03, delay = 0) {
    return gsap.fromTo(textElement.childNodes,
        { opacity: 0, y: 50 },
        {
            scrollTrigger: {
                trigger: textElement,
                start: "top center+=100px",
                end: "center center",
            },
            opacity: 1,
            y: 50,
            duration: duration,
            stagger: stagger,
            delay: delay,
            ease: "power4.out",
        });
}

function getRockColors(index) {
    const colors = ['#D32F2F', '#1976D2', '#F57C00', '#7B1FA2', '#0288D1', '#388E3C', '#FBC02D',];
    return colors[index % colors.length];
}

export function generalAnimations() {
    //HERO appear
    sectionReveal(".hero", null, 1, 1);

    //Airplane section
    sectionReveal('.text-bubble', '.airplane', 0.3, 2);
    sectionReveal('.text-bubble h3:not(.inverted)', '.airplane', 0.6, 2);
    sectionReveal('.text-bubble h3.inverted', '.airplane', 0.9, 2);
    sectionReveal('.text-bubble p', '.airplane', 1.2, 2);

    //fun section
    sectionReveal('.fun .description', '.fun', 0.3, 2);
    sectionReveal('.mini-slider.left', '.fun', 0.8, 2);
    sectionReveal('.mini-slider.right', '.fun', 1.2, 2);

    //testimonials
    sectionReveal('.testimonial:nth-child(1)', '.testimonial:nth-child(2)', 0, 2);
    sectionReveal('.testimonial:nth-child(2)', '.testimonial:nth-child(2)', 0.5, 2);
    sectionReveal('.testimonial:nth-child(3)', '.testimonial:nth-child(2)', 1, 2);

    //about
    sectionReveal('.card', '.about', 0.2, 2);
}

export function sectionReveal(target, trigger, delay, duration) {
    if (trigger) {
        gsap.fromTo(target,
            { opacity: 0 },
            {
                scrollTrigger: {
                    trigger: trigger,
                    start: "top center+=100px",
                    end: "center center+=100px",
                },
                opacity: 1,
                duration: duration,
                delay: delay
            });
    }
    else {
        gsap.fromTo(target,
            { opacity: 0 },
            {
                opacity: 1,
                duration: duration,
                delay: delay
            });
    }
}

export function collage() {
    // collageWithMove();
    // collageWithOpacity();
}

function collageWithOpacity() {
    const images = document.querySelectorAll('.collage img');
    images.forEach((image, index) => {
        if (index == 0) {
            movePhoto(image, 5, 8, 'rotate(-2deg)', 'rotate(-2deg)', 5, 8, 0)
        }
        if (index == 1) {
            movePhoto(image, -2, 10, 'rotate(5deg)', 'rotate(5deg)', -2, 10, 0)
        }
        if (index == 2) {
            movePhoto(image, -5, 5, 'rotate(5deg)', 'rotate(5deg)', -5, 5, 0)
        }
        if (index == 3) {
            movePhoto(image, 4, 0, 'rotate(3deg)', 'rotate(3deg)', 4, 0, 0)
        }
        if (index == 4) {
            movePhoto(image, 0, 0, 'rotate(-2deg)', 'rotate(-2deg)', 0, 0, 0)
        }
        if (index == 5) {
            movePhoto(image, -9, 0, 'rotate(2deg)', 'rotate(2deg)', -9, 0, 0)
        }
        if (index == 6) {
            movePhoto(image, 7, -10, 'rotate(8deg)', 'rotate(8deg)', 7, -10, 0)
        }
        if (index == 7) {
            movePhoto(image, 0, -5, 'rotate(2deg)', 'rotate(2deg)', 0, -5, 0)
        }
        if (index == 8) {
            movePhoto(image, -7, -8, 'rotate(-3deg)', 'rotate(-3deg)', -7, -8, 0)
        }
    })
}

function collageWithMove() {
    const images = document.querySelectorAll('.collage img');
    images.forEach((image, index) => {
        if (index == 0) {
            movePhoto(image, '-100vw', '-100vh', 'rotate(45deg)', 'rotate(-2deg)', 5, 8, index)
        }
        if (index == 1) {
            movePhoto(image, 0, '-100vh', 'rotate(45deg)', 'rotate(5deg)', -2, 10, index)
        }
        if (index == 2) {
            movePhoto(image, '100vw', '-100vh', 'rotate(45deg)', 'rotate(5deg)', -5, 5, index)
        }
        if (index == 3) {
            movePhoto(image, '-100vw', 0, 'rotate(45deg)', 'rotate(3deg)', 4, 0, index)
        }
        if (index == 4) {
            movePhoto(image, 0, 0, 'rotate(-2deg)', 'rotate(-2deg)', 0, 0, index)
        }
        if (index == 5) {
            movePhoto(image, '100vw', 0, 'rotate(45deg)', 'rotate(2deg)', -9, 0, index)
        }
        if (index == 6) {
            movePhoto(image, '-100vw', '100vh', 'rotate(45deg)', 'rotate(8deg)', 7, -10, index)
        }
        if (index == 7) {
            movePhoto(image, 0, '+100vh', 'rotate(45deg)', 'rotate(2deg)', 0, -5, index)
        }
        if (index == 8) {
            movePhoto(image, '100vw', '100vh', 'rotate(45deg)', 'rotate(-3deg)', -7, -8, index)
        }
    })
}

function movePhoto(element, x, y, transform, targetTransform, targetX, targetY, index, isOpacity) {
    gsap.fromTo(element,
        { opacity: 0, x, transform, y },
        {
            scrollTrigger: {
                trigger: ".collage",
                start: "top center-=20vh",
                end: "center center"
            },
            opacity: 1,
            x: targetX,
            y: targetY,
            transform: targetTransform,
            duration: 2,
            delay: index * 0.15
        });
}

export function bindHamburger() {
    const menu = document.querySelector('.menu');
    document.querySelector('.hamburger').addEventListener("click", e => {
        menu.classList.toggle('visible')
        if (menu.classList.contains('visible')) {
            document.body.classList.add('menu-open');
            const menuLinks = document.querySelectorAll(".menu li");
            menuLinks.forEach((link, key) => {
                gsap.fromTo(link, { opacity: 0 }, { opacity: 1, duration: 1, delay: key * 0.2 })
            })
        }
        else {
            document.body.classList.remove('menu-open');
        }
    })
}


// window.addEventListener('beforeunload', function () {
//     console.log("hey")
//     document.body.style.opacity = 0;
//   });

//   // Fade in the new page after loading
//   window.onload = function () {
//     console.log("hey")
//     document.body.style.opacity = 1;
//   };



const scrollToTopButton = document.getElementById('scroll-up');
scrollToTopButton.style.display = "none";
export function initScrollButton() {
    window.onscroll = function () {
        if (document.documentElement.scrollTop > 200 || document.body.scrollTop > 200) {
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    };

    scrollToTopButton.onclick = function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

}