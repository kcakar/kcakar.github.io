import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { slider } from './slider';
import '../css/style.scss';

gsap.registerPlugin(ScrollTrigger);

slider();

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
// Wrap the entire content in a GSAP animation loop
// Get the total width of the services container (combined width of all items inside it)
const services = document.querySelector(".services");
const serviceWidth = services.scrollWidth;

// Use GSAP to animate the services container
gsap.to(".services", {
  x: `-${serviceWidth}px`,  // Move the container to the left by its total width
  duration: 20,             // Set the speed of the scroll
  repeat: -1,               // Repeat infinitely
  ease: "none",             // Use a linear ease for a smooth constant speed
});

    