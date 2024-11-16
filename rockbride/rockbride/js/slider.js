import gsap from "gsap";

const slides = document.querySelectorAll(".slide");
const countOfSlides = slides.length;
const delay = 2000;
const animationDuration = 1;
let currentIndex = 1; //skip first image

export function heroSlider() {
    setTimeout(() => {
        let previousIndex = currentIndex - 1;
        if (previousIndex < 0) {
            previousIndex = countOfSlides - 1;
        }
        gsap.to(slides[previousIndex], { opacity: 0, duration: animationDuration });
        gsap.to(slides[currentIndex], { opacity: 1, duration: animationDuration });
        currentIndex++;
        if (currentIndex + 1 > countOfSlides) {
            currentIndex = 0;
        }
        heroSlider();
    }, delay);
}

export function servicesSlider() {
    const services = document.querySelector(".services");
    const serviceWidth = services.scrollWidth;

    const g = document.querySelector('.list');
    const demo = document.querySelector('.services');
    let cloudCopy = g.cloneNode(true);
    demo.appendChild(cloudCopy);
    const tl2 = gsap.timeline();
    console.log(cloudCopy)
    tl2.set(cloudCopy, { xPercent: 0 });
    tl2.to('.list', { duration: 50, xPercent: "-=100", ease: "none", repeat: -1 });
}

export function menuAndLogoAnimations() {
    const tl = gsap.timeline();
    tl.fromTo('.logo', { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
    const menuLinks = document.querySelectorAll(".menu li");
    let delay = 0.5;
    menuLinks.forEach((link, key) => {
        tl.fromTo(link, { opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 })
    })

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