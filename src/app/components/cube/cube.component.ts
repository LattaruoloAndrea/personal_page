import { Component, ElementRef, OnInit, OnDestroy, NgZone, HostListener } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-cube',
  standalone: true,
  imports: [],
  templateUrl: './cube.component.html',
  styleUrl: './cube.component.css'
})
export class CubeComponent implements OnInit, OnDestroy {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private spheresGroup!: THREE.Group;
  private animationFrameId: number | null = null;
  private rotationSpeed = 0.01;
  private fixedRotationSpeed = 0.01;
  private previousScrollY = 0;

  constructor(private ngZone: NgZone, private el: ElementRef) {}

  ngOnInit() {
    this.initThreeJS();
    this.createScene();
    this.animate();
    this.handleResize();
  }

  ngOnDestroy() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.handleResize);
  }

  private initThreeJS() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.el.nativeElement.querySelector('canvas'), antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000);
  }

  private createScene() {
    this.spheresGroup = new THREE.Group();

    const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const spheresCount = 300;
    for (let i = 0; i < spheresCount; i++) {
      const sphereMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(Math.random(), Math.random(), Math.random()) });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50);
      this.spheresGroup.add(sphere);
    }

    this.scene.add(this.spheresGroup);
    this.camera.position.z = 100;
  }

  private animate() {
    this.ngZone.runOutsideAngular(() => {
      const animateFn = () => {
        this.animationFrameId = requestAnimationFrame(animateFn);

        // Rotate the group of spheres
        this.spheresGroup.rotation.y += this.rotationSpeed;

        this.renderer.render(this.scene, this.camera);
      };
      animateFn();
    });
  }

  private handleResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollY = window.scrollY;
    if(Math.abs(scrollY-this.previousScrollY)>=1) {
      this.rotationSpeed = this.fixedRotationSpeed;
    }else{
      this.rotationSpeed = this.fixedRotationSpeed + 2;
    }
    this.previousScrollY = scrollY;
  }
  
}