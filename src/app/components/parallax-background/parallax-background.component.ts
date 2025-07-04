import { Component, HostListener, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-parallax-background',
  standalone: true,
  imports: [],
  templateUrl: './parallax-background.component.html',
  styleUrl: './parallax-background.component.css'
})
export class ParallaxBackgroundComponent implements AfterViewInit{
constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.updateGlow();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateGlow();
  }

  updateGlow() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollY / docHeight : 0;

    // Interpolate between three colors based on scroll position
    // 0%: orange, 50%: blue, 100%: magenta
    let r, g, b;
    if (scrollPercent < 0.5) {
      // orange to blue
      const t = scrollPercent * 2;
      r = Math.round(255 * (1 - t) + 0 * t);
      g = Math.round(153 * (1 - t) + 200 * t);
      b = Math.round(0 * (1 - t) + 255 * t);
    } else {
      // blue to magenta
      const t = (scrollPercent - 0.5) * 2;
      r = Math.round(0 * (1 - t) + 255 * t);
      g = Math.round(200 * (1 - t) + 0 * t);
      b = Math.round(255 * (1 - t) + 200 * t);
    }

    const glow = this.el.nativeElement.querySelector('.glow-center');
    if (glow) {
      glow.style.boxShadow = `
        0 0 60px 30px rgba(${r},${g},${b},0.9),
        0 0 120px 60px rgba(${r},${g},${b},0.5),
        0 0 200px 100px rgba(${r},${g},${b},0.3)
      `;
    }
  }

}