// window.addEventListener('load', () => {
//     setTimeout(() => {
//         const loadingScreen = document.getElementById('loading-screen');
//         loadingScreen.style.display = 'none'; // Hide the loading screen once everything is loaded
//         const body = document.body;
//         body.classList.remove('loading');
//         init();
//     }, 1000);
// });
import '../css/style.scss';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { Slider, servicesSlider, menuAndLogoAnimations, textWriteEffects, generalAnimations, collage } from './motions.js';
import './photography.js'

function init() {
    gsap.registerPlugin(ScrollTrigger);
    new Slider(".hero").start();
    new Slider(".mini-slider.left", 2.5, 1, true).start();
    new Slider(".mini-slider.right", 2.5, 1, true).start();

    servicesSlider();
    menuAndLogoAnimations();
    textWriteEffects();
    generalAnimations();
    collage();
}

document.addEventListener("DOMContentLoaded", function() {
    // Check if the current URL is the homepage
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        init(); // Run the function only on the main page
    }
});