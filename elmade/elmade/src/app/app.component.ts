import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import LocomotiveScroll from 'locomotive-scroll';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnInit {
  tshirts = [
    { src: '../assets/tshirts/1.png', classes:['delay-0']},
    { src: '../assets/tshirts/2.png', classes:['delay-1']},
    { src: '../assets/tshirts/3.png', classes:['delay-2']},
    { src: '../assets/tshirts/4.png', classes:['delay-3']},
    { src: '../assets/tshirts/5.png', classes:['delay-4']},
    { src: '../assets/tshirts/6.png', classes:['delay-5']}
  ];
  currentStage: string = 'hero'; // Default to hero stage
  @ViewChild('stageHero') stageHero!: ElementRef;
  @ViewChild('stageTshirt') stageTshirt!: ElementRef;
  @ViewChild('stageCards') stageCards!: ElementRef;
  scroll!: LocomotiveScroll;  
  
  ngOnInit() {
    this.scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]') as HTMLElement,
      smooth: true
    });
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.removeActiveClassFromAllStages();
          entry.target.classList.add('active');
          this.currentStage = entry.target.id;
          console.log(this.currentStage)
          if(this.currentStage == 'tshirt' && this.tshirts[0].classes.indexOf('shadow-drop-2-center') == -1){
            setTimeout(() => {
              this.tshirts = this.tshirts.map(tshirt => ({
                ...tshirt,
                classes: [...tshirt.classes, 'shadow-drop-2-center']
              }));
            }, 1000);
          }
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(this.stageHero.nativeElement);
    observer.observe(this.stageTshirt.nativeElement);
    observer.observe(this.stageCards.nativeElement);
  }

  removeActiveClassFromAllStages() {
    const stages = [this.stageHero.nativeElement, this.stageTshirt.nativeElement, this.stageCards.nativeElement];
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
