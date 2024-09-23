import { Component, AfterViewInit, Input } from '@angular/core';
declare var anime: any; 

@Component({
  selector: 'app-text-animation',
  standalone: true,
  imports: [],
  templateUrl: './text-animation.component.html',
  styleUrl: './text-animation.component.css'
})
export class TextAnimationComponent implements AfterViewInit  {
  @Input() message_text:string ="";
  ngAfterViewInit(): void {
      // Wrap every letter in a span
  var textWrapper = document.querySelector('.an-1');
  if(textWrapper && textWrapper.textContent){
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  }
  

anime.timeline({loop: false})
  .add({
    targets: '.an-1 .letter',
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: (el: any, i: number) => 90*i
  });


  }
}