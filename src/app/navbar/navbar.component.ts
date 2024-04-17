import { Component } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
// import { NgModule } from '@angular/core';
// import { FlexLayoutModule } from "@angular/flex-layout";
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,MatSidenavModule,MatListModule,MatButtonModule,MatIconModule,MatSlideToggleModule,], 
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
