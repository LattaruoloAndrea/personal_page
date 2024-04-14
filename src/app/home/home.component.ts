import { Component } from '@angular/core';
import { CubeComponent } from '../cube/cube.component';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CubeComponent,NavbarComponent,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
