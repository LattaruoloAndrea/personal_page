import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MatCardModule,MatGridListModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
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
    trigger('slideInUp', [
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.6s 0.4s ease-out')
      ])
    ]),
    trigger('staggerIn', [
      transition(':enter', [
        query('.project-card', [
          style({ opacity: 0, transform: 'translateY(30px) scale(0.9)' }),
          stagger(150, [
            animate('0.8s ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
          ])
        ])
      ])
    ]),
    trigger('projectCard', [
      state('visible', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px) scale(0.9)' }),
        animate('0.8s ease-out')
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
export class ProjectsComponent {
 selectedFilter = 'all';
  hasMoreProjects = true;
  visibleProjects = 6;  
  public animationsEnabled = true;

  
  categories = ['Web App', 'Mobile App', 'UI/UX', 'API'];
  // https://picsum.photos/
  projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web App',
      description: 'A full-featured e-commerce platform with real-time inventory management, secure payment processing, and advanced analytics dashboard.',
      image: 'https://picsum.photos/id/29/600/300',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe API'],
      year: '2024',
      duration: '4 months',
      team: '4 developers',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example'
    },
    {
      id: 2,
      title: 'Task Management App',
      category: 'Mobile App',
      description: 'Cross-platform mobile app for team collaboration with real-time updates, file sharing, and integrated calendar functionality.',
      image: 'https://picsum.photos/id/25/600/300',
      technologies: ['React Native', 'Firebase', 'Redux', 'Push Notifications'],
      year: '2024',
      duration: '3 months',
      team: '2 developers',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example'
    },
    {
      id: 3,
      title: 'Banking Dashboard',
      category: 'UI/UX',
      description: 'Modern and intuitive banking interface design with focus on accessibility, security, and user experience optimization.',
      image: 'https://picsum.photos/id/19/600/300',
      technologies: ['Figma', 'Sketch', 'Principle', 'Adobe XD'],
      year: '2024',
      duration: '2 months',
      team: null,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example'
    },
    {
      id: 4,
      title: 'Social Media API',
      category: 'API',
      description: 'RESTful API for social media platform with authentication, real-time messaging, and scalable architecture.',
      image: 'https://picsum.photos/id/13/600/300',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
      year: '2024',
      duration: '3 months',
      team: '3 developers',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example'
    },
    {
      id: 5,
      title: 'Weather Dashboard',
      category: 'Web App',
      description: 'Interactive weather application with location-based forecasts, historical data analysis, and beautiful data visualizations.',
      image: 'https://picsum.photos/id/11/600/300',
      technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'Tailwind CSS'],
      year: '2023',
      duration: '1 month',
      team: null,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example'
    },
    {
      id: 6,
      title: 'Fitness Tracker',
      category: 'Mobile App',
      description: 'Comprehensive fitness tracking app with workout plans, nutrition tracking, and progress analytics.',
      image: 'https://picsum.photos/id/10/600/300',
      technologies: ['Flutter', 'Dart', 'SQLite', 'Health APIs'],
      year: '2023',
      duration: '5 months',
      team: '2 developers',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example'
    }
  ];

  achievements = [
    { number: '25+', label: 'Projects Completed', icon: 'fas fa-project-diagram' },
    { number: '15+', label: 'Happy Clients', icon: 'fas fa-smile' },
    { number: '50K+', label: 'Lines of Code', icon: 'fas fa-code' },
    { number: '99%', label: 'Success Rate', icon: 'fas fa-trophy' }
  ];

  filteredProjects = this.projects;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.animationsEnabled = window.innerWidth > 600;
    }
  }


  ngOnInit() {
    this.filterProjects('all');
  }

  filterProjects(category: string) {
    this.selectedFilter = category;
    if (category === 'all') {
      this.filteredProjects = this.projects.slice(0, this.visibleProjects);
    } else {
      this.filteredProjects = this.projects
        .filter(project => project.category === category)
        .slice(0, this.visibleProjects);
    }
    this.updateHasMoreProjects();
  }

  loadMoreProjects() {
    this.visibleProjects += 3;
    this.filterProjects(this.selectedFilter);
  }

  updateHasMoreProjects() {
    const totalProjects = this.selectedFilter === 'all' 
      ? this.projects.length 
      : this.projects.filter(p => p.category === this.selectedFilter).length;
    this.hasMoreProjects = this.visibleProjects < totalProjects;
  }

  openProject(project: any) {
    window.open(project.liveUrl, '_blank');
  }

  openGithub(project: any) {
    window.open(project.githubUrl, '_blank');
  }

}
