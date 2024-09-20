import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MatCardModule,MatGridListModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  // https://stackoverflow.com/questions/48955095/horizontal-scroll-using-buttons-on-angular2
  // https://www.databricks.com/ example projects
  // @ViewChild('widgetsContent', { read: ElementRef }) 
  // private widgetsContent: ElementRef<any>;
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;
  @ViewChild('carouselTrack') carouselTrack!: ElementRef;
  slides = [
    {
      image: 'https://via.placeholder.com/800x400?text=Slide+1',
      alt: 'Slide 1',
      title: 'Welcome to Slide 1',
      description: 'This is the first slide of our carousel.'
    },
    {
      image: 'https://via.placeholder.com/800x400?text=Slide+2',
      alt: 'Slide 2',
      title: 'Explore Slide 2',
      description: 'Discover more in our second slide.'
    },
    {
      image: 'https://via.placeholder.com/800x400?text=Slide+3',
      alt: 'Slide 3',
      title: 'Check out Slide 3',
      description: 'The third slide brings more excitement.'
    },
    {
      image: 'https://via.placeholder.com/800x400?text=Slide+4',
      alt: 'Slide 4',
      title: 'Slide 4 Insights',
      description: 'Gain new perspectives in our fourth slide.'
    },
    {
      image: 'https://via.placeholder.com/800x400?text=Slide+5',
      alt: 'Slide 5',
      title: 'Finale on Slide 5',
      description: 'Wrap up the experience with our fifth slide.'
    }
  ];
  currentIndex = 0;
  isMobile = false;
  cardWidth = 0;
  containerWidth = 0;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.checkIfMobile();
  }

  ngAfterViewInit() {
    this.setupScrollListener();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkIfMobile();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  setupScrollListener() {
    if (this.isMobile) {
      this.carouselContainer.nativeElement.addEventListener('scroll', () => {
        const scrollPosition = this.carouselContainer.nativeElement.scrollLeft;
        this.currentIndex = Math.round(scrollPosition / this.cardWidth);
      });
    }
  }

  onPreviousClick() {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.slides.length - 1;
  }

  onNextClick() {
    this.currentIndex = this.currentIndex < this.slides.length - 1 ? this.currentIndex + 1 : 0;
  }

}
