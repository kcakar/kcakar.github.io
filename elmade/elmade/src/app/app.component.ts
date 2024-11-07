import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { gsap } from 'gsap'
import ScrollTrigger from "gsap/ScrollTrigger";

export class Card {
  id: string = '';
  srcFront: string = '';
  srcBack: string = '';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements AfterViewInit, OnDestroy {
  tshirts = [
    { src: '../assets/tshirts/1.png', classes: ['out-top-left'] },
    { src: '../assets/tshirts/2.png', classes: ['out-top-mid'] },
    { src: '../assets/tshirts/3.png', classes: ['out-top-right'] },
    { src: '../assets/tshirts/4.png', classes: ['out-bottom-left'] },
    { src: '../assets/tshirts/5.png', classes: ['out-bottom-mid'] },
    { src: '../assets/tshirts/6.png', classes: ['out-bottom-right'] }
  ];

  cards: Card[] = [
    { id: '1', srcFront: '../assets/cards/alpack-front.png', srcBack: '../assets/cards/alpack-back.png' },
    { id: '2', srcFront: '../assets/cards/alpen-front.png', srcBack: '../assets/cards/alpen-back.png' },
    { id: '3', srcFront: '../assets/cards/bxf-front.png', srcBack: '../assets/cards/bxf-back.png' },
    { id: '5', srcFront: '../assets/cards/davul-front.png', srcBack: '../assets/cards/davul-back.png' },
    { id: '6', srcFront: '../assets/cards/dellen-front.png', srcBack: '../assets/cards/dellen-back.png' },
    { id: '7', srcFront: '../assets/cards/elmade-front.png', srcBack: '../assets/cards/elmade-back.png' },
    { id: '8', srcFront: '../assets/cards/hxf-front.png', srcBack: '../assets/cards/hxf-back.png' },
    { id: '9', srcFront: '../assets/cards/Reifenzentrum-front.png', srcBack: '../assets/cards/Reifenzentrum-back.png' },
    { id: '10', srcFront: '../assets/cards/uffing-front.png', srcBack: '../assets/cards/uffing-back.png' },
    { id: '11', srcFront: '../assets/cards/vip-front.png', srcBack: '../assets/cards/vip-back.png' }
  ];

  selectedCard: Card | null = null;
  currentStage: string = 'hero'; // Default to hero stage
  private scrollAnimationBack: GSAPTimeline | null = null;
  private scrollAnimationFront: GSAPTimeline | null = null;

  @ViewChild('stageHero') stageHero!: ElementRef;
  @ViewChild('stageTshirt') stageTshirt!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnDestroy() {
    if (this.scrollAnimationBack) {
      this.scrollAnimationBack.kill(); // Clean up the animation on destroy
    }

    if (this.scrollAnimationFront) {
      this.scrollAnimationFront.kill(); // Clean up the animation on destroy
    }
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit")
    this.initGSAP();

    // After dynamically adding the content, call refresh to recalculate positions
    this.cdr.detectChanges();
    ScrollTrigger.refresh()
    this.scrollAnimationFront = this.animateBackground('front');
    this.scrollAnimationBack = this.animateBackground('back');
    this.addHoverListeners('front');
    this.addHoverListeners('back');
  }

  addHoverListeners(direction: string) {
    const container = document.querySelectorAll(`.image-container.${direction}`);
    let scrollAnimation = direction === 'front' ? this.scrollAnimationFront : this.scrollAnimationBack;
    if (container) {
      container.forEach(c => {
        c.addEventListener('mouseenter', () => {
          // scrollAnimation!.pause(); // Pause the animation on hover
        });

        c.addEventListener('mouseleave', () => {
          // scrollAnimation!.play(); // Resume the animation when hover ends
        });
      })
    }
  }

  animateBackground(direction: string): GSAPTimeline {
    const g = document.querySelector(`.image-container.${direction}`);
    const demo = document.querySelector(`.cards-background.${direction}`);
    let cloudCopy = g!.cloneNode(true);
    demo!.appendChild(cloudCopy);
    gsap.fromTo(`.image-container.${direction}`, { opacity: 0 }, { opacity: 1, delay: 0.8, duration: 2 });
    const tl = gsap.timeline();

    document.querySelectorAll(".image-container img").forEach(i => {
      i.addEventListener('click', (e) => this.viewCard(e));
    })

    if (direction === 'back') {
      tl.set(cloudCopy, { yPercent: 100 });
      tl.to(`.image-container.${direction}`, { duration: 25, yPercent: "-=100", ease: "none", repeat: -1, delay: 0.8 });
    }
    else {
      tl.set(cloudCopy, { yPercent: -100 });
      tl.to(`.image-container.${direction}`, { duration: 25, yPercent: "+=100", ease: "none", repeat: -1, delay: 0.8 });
    }

    return tl;
  }

  initGSAP() {
    const element = document.querySelector('.logo-container');
    const yCoordinate = element!.getBoundingClientRect().top + window.scrollY; // absolute y-coordinate

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".logo-container img", { transform: 'scale(0.7)', y: '-200', duration: 1.5 });
    gsap.fromTo(".hero-text", { opacity: 0 }, { opacity: 1, duration: 1, delay: 1 });
    gsap.fromTo(".you", { color: '#1e293b' }, { color: 'red', duration: 1, delay: 2 });
    gsap.fromTo(".click", { color: '#1e293b' }, { color: 'purple', duration: 1, delay: 2 });


  gsap.fromTo(".red",    { color: '#1e293b'},{   color: '#FF0000',duration: 1, delay:2 });
  gsap.fromTo(".orange", { color: '#1e293b'},{  color: '#FF7F00',duration: 1, delay: 2.2 });
  gsap.fromTo(".yellow", { color: '#1e293b'},{  color: '#ffe000',duration: 1, delay: 2.3 });
  gsap.fromTo(".green",  { color: '#1e293b'},{  color: '#00FF00',duration: 1, delay: 2.4 });
  gsap.fromTo(".blue",   { color: '#1e293b'},{  color: '#0000FF',duration: 1, delay: 2.5 });
  gsap.fromTo(".indigo", { color: '#1e293b'},{  color: '#4B0082',duration: 1, delay: 2.6 });
  gsap.fromTo(".violet", { color: '#1e293b'},{  color: '#8B00FF',duration: 1, delay: 2.7 });

    // First animation: Moves the logo container
    gsap.to(".logo-container", {
      scrollTrigger: {
        trigger: "#tshirt",
        start: "top bottom",
        end: "50vh",
        scrub: 3
      },
      y: -yCoordinate - 100,
    });

    gsap.to("#hero", {
      scrollTrigger: {
        trigger: "#tshirt",
        start: "top center",
        end: "top center",
        scrub: 1
      },
      opacity: 0,
    });

    gsap.to("body", {
      scrollTrigger: {
        trigger: "#tshirt",
        start: "top center",
        end: "top center",
        scrub: 1
      },
      backgroundColor: '#e0e0e0'
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
    tl.to(".tshirt-grid", { background: "white", duration: 1 })
  }

  viewCard(e: any) {
    gsap.fromTo('.background-blur', { opacity: 0 }, { opacity: 1, duration: 1 });
    const cardId = (e.target as HTMLElement).getAttribute('data-cardid');
    this.selectedCard = this.cards.find(c => c.id == cardId) || null;
    this.scrollAnimationFront?.pause();
    this.scrollAnimationBack?.pause();
  }

  closeViewer() {
    gsap.fromTo('.background-blur', { opacity: 1 }, { opacity: 0, duration: 1 });
    setTimeout(() => {
      this.selectedCard = null;
      this.scrollAnimationBack?.resume();
      this.scrollAnimationFront?.resume();
    }, 1000);
  }
}
