import gsap from "gsap";

const slides = document.querySelectorAll(".slide");
const countOfSlides = slides.length;
const delay = 2000;
const animationDuration = 1;
let currentIndex = 1; //skip first image

export function slider() {
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
        slider();
    }, delay);
}

