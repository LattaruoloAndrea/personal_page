import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  // https://stackoverflow.com/questions/48955095/horizontal-scroll-using-buttons-on-angular2

  // @ViewChild('widgetsContent', { read: ElementRef }) 
  // private widgetsContent: ElementRef<any>;

  public scrollRight(): void {
    // this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    // this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }

}
