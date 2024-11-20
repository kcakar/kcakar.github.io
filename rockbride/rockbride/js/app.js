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
import { languageSelectorINIT, Slider, initScrollButton, servicesSlider, menuAndLogoAnimations, textWriteEffects, generalAnimations, collage, bindHamburger } from './motions.js';

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
  bindHamburger();
  languageSelectorINIT();
}

document.addEventListener("DOMContentLoaded", function () {
  init();
});

const lazyImages = document.querySelectorAll('.lazy-img');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting || entry.intersectionRatio >= 0.3) {
      // When the image is 30% in view (or slightly before), load the image
      const img = entry.target;
      img.src = img.dataset.src; // Set the actual image source from data-src

      // Optionally, add a class to fade in the image once it's loaded
      img.onload = () => {
        img.classList.add('loaded'); // Fade in the image
      };

      // Stop observing the image once it's loaded
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '300px 0px', // Preload 300px before entering the viewport
  threshold: 0.1, // Trigger when 10% of the image is visible
});

lazyImages.forEach(img => {
  observer.observe(img); // Observe each image
});

initScrollButton();

