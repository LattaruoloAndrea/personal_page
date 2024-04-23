import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild  } from '@angular/core';
import { fromEvent } from 'rxjs';
import * as THREE from "three";

@Component({
  selector: 'app-cube',
  standalone: true,
  imports: [],
  templateUrl: './cube.component.html',
  styleUrl: './cube.component.css'
})
export class CubeComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas')
  private canvasRef: ElementRef | undefined;
  //* Cube Properties

  @Input() public rotationSpeedX: number = 0.05;

  @Input() public rotationSpeedY: number = 0.01;

  @Input() public size: number = 200;

  // @Input() public texture: string = "/assets/texture.jpg";


  //* Stage Properties

  @Input() public cameraZ: number = 400;

  @Input() public fieldOfView: number = 45;

  @Input('nearClipping') public nearClippingPlane: number = 1;

  @Input('farClipping') public farClippingPlane: number = 1000;

  //? Helper Properties (Private Properties);

  private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef?.nativeElement;
  }
  // private loader = new THREE.TextureLoader();
  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private  light = new THREE.AmbientLight( 0xff0000, 1, );
  private  pointLight = new THREE.PointLight( 0xffffff, 4, 100);

  // private material = new THREE.MeshBasicMaterial({ map: this.loader.load(this.texture) });
  private material = new THREE.MeshLambertMaterial({
    color: "#ffffff"
    // color: "#e03024",
    // wireframe: true,
    // wireframeLinewidth: 20,
  });

  private cube: THREE.Mesh = new THREE.Mesh(this.geometry,this.material);

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  getWidth() {
    return this.canvas.width;
  }
  
  getHeight() {
    return this.canvas.height;
  }

  /**
   *Animate the cube
   *
   * @private
   * @memberof CubeComponent
   */
  private animateCube() {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  /**
   * Create the scene
   *
   * @private
   * @memberof CubeComponent
   */
  private createScene() {
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.cube.translateY(2);
    this.scene.add(this.cube);
    var bulb = new THREE.SphereGeometry(0.1, 32, 32);
    var bulb_material = new THREE.MeshBasicMaterial({
      color: "#e03024",
    });
    var  bulb_mesh = new THREE.Mesh(bulb,bulb_material);
    // bulb.translate(0,2,0);
    // this.scene.add(bulb_mesh);
    this.pointLight.position.set( 0, 4, 0 );
    this.scene.add(this.light);
    this.scene.add(this.pointLight);
    //*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      1,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
 * Start the rendering loop
 *
 * @private
 * @memberof CubeComponent
 */
  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: CubeComponent = this;
    function render() {
      requestAnimationFrame(render);
      window.addEventListener('resize',()=>{
        component.canvas.width = window.innerWidth;
        component.canvas.height = window.innerHeight;
        // console.log(component.canvas.width,component.canvas.height);
        component.camera.aspect = component.getWidth()/component.getHeight();
        component.renderer.setSize(component.getWidth(),component.getHeight());
        component.camera.updateProjectionMatrix();
      },false);
      component.animateCube();
      component.renderer.render(component.scene, component.camera);
    };
    render();
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
  }

}
