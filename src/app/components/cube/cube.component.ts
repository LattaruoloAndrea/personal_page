import { Component, ElementRef, OnInit, OnDestroy, NgZone } from '@angular/core';
import * as THREE from 'three';
import { fromEvent } from 'rxjs';

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
  private accretionDisk!: THREE.Mesh;
  private animationFrameId: number | null = null;

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
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.el.nativeElement.querySelector('canvas'), antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000);
  }

  private createScene() {
    // Blue glacial black hole (center sphere)
    const blackHoleGeometry = new THREE.SphereGeometry(1, 32, 32);
    const blackHoleMaterial = new THREE.MeshBasicMaterial({ color: 0x007bff }); // Blue glacial color
    const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
    this.scene.add(blackHole);

    // Accretion disk
    const diskGeometry = new THREE.RingGeometry(0.1, 3, 64);
    const diskMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        
        void main() {
          float distance = length(vUv - vec2(0.5, 0.5)) * 2.0;
          float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
          float intensity = sin(distance * 10.0 + time * 2.0 - angle * 4.0) * 0.5 + 0.5;
          vec3 purpleColor = mix(vec3(0.8, 0.2, 1.0), vec3(0.4, 0.0, 0.8), distance);
          vec3 blueColor = vec3(0.0, 0.478, 1.0); // Blue glacial color
          vec3 color = mix(purpleColor, purpleColor, smoothstep(0.0, 0.2, distance));
          gl_FragColor = vec4(color * intensity, 1.0 - distance * 0.2);
        }
      `,
      side: THREE.DoubleSide,
      transparent: true,
    });
    this.accretionDisk = new THREE.Mesh(diskGeometry, diskMaterial);
    this.accretionDisk.rotation.x = Math.PI / 4;
    this.scene.add(this.accretionDisk);

    // Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1000;
    const starsPositions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      starsPositions[i] = (Math.random() - 0.5) * 100;
      starsPositions[i + 1] = (Math.random() - 0.5) * 100;
      starsPositions[i + 2] = (Math.random() - 0.5) * 100;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    this.scene.add(stars);

    this.camera.position.z = 8;
  }

  private animate() {
    this.ngZone.runOutsideAngular(() => {
      const animateFn = () => {
        this.animationFrameId = requestAnimationFrame(animateFn);

        // Update the shader time uniform (reversed direction)
        // Update the shader time uniform (reversed direction)
        (this.accretionDisk.material as THREE.ShaderMaterial).uniforms['time'].value -= 0.01;

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
}