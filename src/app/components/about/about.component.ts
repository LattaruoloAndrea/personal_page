import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  animations: [
    trigger('fadeInUp', [
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('0.8s ease-out')
      ])
    ]),
    trigger('slideInLeft', [
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate('0.8s 0.2s ease-out')
      ])
    ]),
    trigger('slideInRight', [
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100px)' }),
        animate('0.8s 0.4s ease-out')
      ])
    ]),
    trigger('scaleIn', [
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('0.8s 0.3s ease-out')
      ])
    ]),
    trigger('staggerIn', [
      transition(':enter', [
        query('.skill-card', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(100, [
            animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ]),
    trigger('skillCard', [
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.6s ease-out')
      ])
    ]),
    trigger('fadeIn', [
      state('visible', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.6s 0.8s ease-out')
      ])
    ]),
    trigger('countUp', [
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('0.8s 0.6s ease-out')
      ])
    ])
  ]
})
export class AboutComponent {

  public animationsEnabled = true;
  skills = [
    {
      name: 'Frontend Development',
      description: 'React, Angular, Vue.js with modern styling',
      icon: 'fas fa-code'
    },
    {
      name: 'Backend Development',
      description: 'Node.js, Python, and cloud services',
      icon: 'fas fa-server'
    },
    {
      name: 'UI/UX Design',
      description: 'User-centered design and prototyping',
      icon: 'fas fa-palette'
    },
    {
      name: 'Mobile Development',
      description: 'React Native and Progressive Web Apps',
      icon: 'fas fa-mobile-alt'
    }
  ];

  stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '3+', label: 'Years Experience' },
    { number: '100%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.animationsEnabled = window.innerWidth > 600;
    }
  }

  ngOnInit() {
    // Component initialization logic
  }

  scrollToContact() {
    // Implement smooth scroll to contact section
    const contactSection = document.getElementById('contacts');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
