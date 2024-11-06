import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { gsap } from 'gsap'
import ScrollTrigger from "gsap/ScrollTrigger";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  tshirts = [
    { src: '../assets/tshirts/1.png', classes: ['out-top-left'] },
    { src: '../assets/tshirts/2.png', classes: ['out-top-mid'] },
    { src: '../assets/tshirts/3.png', classes: ['out-top-right'] },
    { src: '../assets/tshirts/4.png', classes: ['out-bottom-left'] },
    { src: '../assets/tshirts/5.png', classes: ['out-bottom-mid'] },
    { src: '../assets/tshirts/6.png', classes: ['out-bottom-right'] }
  ];
  currentStage: string = 'hero'; // Default to hero stage
  @ViewChild('stageHero') stageHero!: ElementRef;
  @ViewChild('stageTshirt') stageTshirt!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    console.log("ngAfterViewInit")
    this.initGSAP();

    // After dynamically adding the content, call refresh to recalculate positions
    this.cdr.detectChanges();
    ScrollTrigger.refresh()
  }

  ngOnInit() {

  }

  initGSAP() {
    console.log("initGSAP")

    const element = document.querySelector('.logo-container');
    const yCoordinate = element!.getBoundingClientRect().top + window.scrollY; // absolute y-coordinate

    gsap.registerPlugin(ScrollTrigger);
    // First animation for the logo
    // First animation: Moves the logo container
    gsap.to(".logo-container", {
      scrollTrigger: {
        trigger: "#tshirt",
        start: "top bottom",
        end: "50vh",
        scrub: 3,
      },
      y: -yCoordinate - 100,
    });

    // Create the main GSAP timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#tshirt",          // The element to trigger the scroll animation
        start: "top top",            // Start when #tshirt reaches the top of the viewport
        end: "top+=1500px",          // End when #tshirt scrolls up by 1500px (for the main animation)
        pin: true,                   // Pin the element during the scroll
        pinSpacing: true,            // Ensure space is added when pinned
        scrub: true,                 // Sync with scroll position
      }
    });

    // Box-shadow animation (first)
    tl.to(".tshirt-container", {
      boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
      duration: 1,  // Duration of the box-shadow animation
    });




    // Animations for the other elements (moving them based on scroll)
    tl.to(".tshirt-container.out-top-left", { x: -200, y: -200, ease: "power2.inOut", duration: 1 }, 2)
      .to(".tshirt-container.out-top-mid", { y: -200, ease: "power2.inOut", duration: 1 }, 2)
      .to(".tshirt-container.out-top-right", { x: 200, y: -200, ease: "power2.inOut", duration: 1 }, 2)
      .to(".tshirt-container.out-bottom-left", { x: -200, y: 200, ease: "power2.inOut", duration: 1 }, 2)
      .to(".tshirt-container.out-bottom-mid", { y: 200, ease: "power2.inOut", duration: 1 }, 2)
      .to(".tshirt-container.out-bottom-right", { x: 200, y: 200, ease: "power2.inOut", duration: 1 }, 2);

    tl.to(".tshirt-text", { opacity: "1", duration: 1 })

  }

  removeActiveClassFromAllStages() {
    const stages = [this.stageHero.nativeElement, this.stageTshirt.nativeElement];
    stages.forEach(stage => {
      stage.classList.remove('active');
    });
  }

  // Scroll to a specific stage when the circle is clicked
  goToStage(stageId: string): void {
    this.currentStage = stageId;
    this.scrollToStage(stageId);
  }

  // Scroll smoothly to the selected stage
  scrollToStage(stageId: string): void {
    const stageElement = document.getElementById(stageId);
    if (stageElement) {
      stageElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
