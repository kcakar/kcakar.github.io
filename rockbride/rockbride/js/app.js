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
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

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

// init();
document.addEventListener("DOMContentLoaded", function () {
    // Step 1: Initialize Masonry
    var elem = document.querySelector('.masonry-container');
    var msnry = new Masonry(elem, {
        itemSelector: '.masonry-item', // Select the items within the container
        columnWidth: '.masonry-item',  // The width of the column should be based on the items
        percentPosition: true, // Use percentage positioning
        gutter: 20, // Space between items
    });

    // Step 2: Use IntersectionObserver to load images lazily and fade them in
    var lazyImages = document.querySelectorAll('.lazy-load'); // Select all images with the lazy-load class

    var observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var img = entry.target;
                img.src = img.getAttribute('data-src'); // Set the source from data-src
                img.classList.add('visible'); // Add the 'visible' class to trigger fade-in

                img.onload = function () {
                    msnry.layout(); // Recalculate Masonry layout after the image is loaded
                };

                observer.unobserve(img); // Stop observing this image after it's loaded
            }
        });
    }, {
        rootMargin: '200px 0px', // Start loading before the image enters the viewport
        threshold: 0.1 // Start loading when 10% of the image is in the viewport
    });

    // Step 3: Observe each lazy-load image
    lazyImages.forEach(function (img) {
        observer.observe(img);
    });

    // Step 4: Trigger Masonry layout after initial image loading (in case images are loaded on page load)
    imagesLoaded(elem, function () {
        msnry.layout(); // Recalculate the layout after images are loaded
    });
});
