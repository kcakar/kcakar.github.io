import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroSlider, servicesSlider, menuAndLogoAnimations } from './slider';
import '../css/style.scss';

gsap.registerPlugin(ScrollTrigger);

heroSlider();
servicesSlider();
menuAndLogoAnimations();

gsap.fromTo(".hero",
    { opacity: 0 },
    {
        opacity: 1,
        duration: 1,
        delay: 1
    });

gsap.fromTo(".secondary h1",
    { opacity: 0 },
    {
        scrollTrigger: {
            trigger: ".secondary h1", // The element that will trigger the animation
            start: "top center", // Start the animation when the element's top is 80% from the top of the viewport
            end: "center center",
        },
        opacity: 1,
        duration: 1
    });


const headline = document.querySelector('.headline');
const letters = headline.querySelectorAll('span');
gsap.fromTo(letters,
    { opacity: 0 },
    {
        scrollTrigger: {
            trigger: ".secondary .headline", // The element that will trigger the animation
            start: "top center", // Start the animation when the element's top is 80% from the top of the viewport
            end: "center center",   // End the animation when the element's top reaches 30% from the top of the viewport
        },
        opacity: 1,
        y: 50,              // Slide from bottom
        duration: 1,        // Duration of each letter's animation
        stagger: 0.05,      // Delay between each letter's appearance
        ease: "power4.out", // Easing for smooth animation
    });

    
    gsap.fromTo('.text-bubble',
        { opacity: 0},
        {
            scrollTrigger: {
                trigger: ".secondary .airplane", // The element that will trigger the animation
                start: "top center", // Start the animation when the element's top is 80% from the top of the viewport
                end: "center center",   // End the animation when the element's top reaches 30% from the top of the viewport
            },
            opacity: 1,
            duration: 2,        // Duration of each letter's animation
            delay:0.3
        });

    gsap.fromTo('.text-bubble h3:not(.inverted)',
        { opacity: 0},
        {
            scrollTrigger: {
                trigger: ".secondary .airplane", // The element that will trigger the animation
                start: "top center", // Start the animation when the element's top is 80% from the top of the viewport
                end: "center center",   // End the animation when the element's top reaches 30% from the top of the viewport
            },
            opacity: 1,
            duration: 2,        // Duration of each letter's animation
            delay:0.6
        });
        
    gsap.fromTo('.text-bubble h3.inverted',
        { opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".secondary .airplane", // The element that will trigger the animation
                start: "top center", // Start the animation when the element's top is 80% from the top of the viewport
                end: "center center",   // End the animation when the element's top reaches 30% from the top of the viewport
            },
            opacity: 1,
            duration: 2,        // Duration of each letter's animation
            delay:0.9
        });
             
    gsap.fromTo('.text-bubble p',
        { opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".secondary .airplane", // The element that will trigger the animation
                start: "top center", // Start the animation when the element's top is 80% from the top of the viewport
                end: "center center",   // End the animation when the element's top reaches 30% from the top of the viewport
            },
            opacity: 1,
            duration: 2,        // Duration of each letter's animation
            delay:1.2
        });
    
    
