import { Component } from '@angular/core';
import { CubeComponent } from '../cube/cube.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CubeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
