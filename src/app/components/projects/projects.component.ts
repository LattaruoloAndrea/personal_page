import { Component, ElementRef, ViewChild } from '@angular/core';
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

  public scrollRight(): void {
    // this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    // this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }

  images = [
    'https://via.placeholder.com/800x400?text=Slide+1',
    'https://via.placeholder.com/800x400?text=Slide+2',
    'https://via.placeholder.com/800x400?text=Slide+3',
    'https://via.placeholder.com/800x400?text=Slide+4',
  ];

  currentSlide = 0;

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.images.length) % this.images.length;
  }

  setSlide(index: number) {
    this.currentSlide = index;
  }

}
