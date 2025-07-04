import { Component } from '@angular/core';
import { CubeComponent } from '../components/cube/cube.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { AboutComponent } from '../components/about/about.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { ContactComponent } from '../components/contact/contact.component';
import { TextAnimationComponent } from '../components/text-animation/text-animation.component';
import { ParallaxBackgroundComponent } from "../components/parallax-background/parallax-background.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CubeComponent, NavbarComponent, AboutComponent, ProjectsComponent, ContactComponent, TextAnimationComponent, ParallaxBackgroundComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
