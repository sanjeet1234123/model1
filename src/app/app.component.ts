import { Component, OnInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  loader!: GLTFLoader;
  turbineSpeed: number = 10; 
  controls!: OrbitControls;
  model!: THREE.Group; 
  groundModel!: THREE.Group; // Ground model reference

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initThreeJS();
    }
  }

  initThreeJS(): void {
    window.addEventListener('resize', () => {
      const width = this.rendererContainer.nativeElement.clientWidth;
      const height = this.rendererContainer.nativeElement.clientHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb); // Light blue color

    const fov = 50;
    const aspect = this.rendererContainer.nativeElement.clientWidth / this.rendererContainer.nativeElement.clientHeight;
    const near = 0.1;
    const far = 1000;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0, 0, 22); // Position camera

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.rendererContainer.nativeElement.clientWidth, this.rendererContainer.nativeElement.clientHeight);
    this.renderer.setClearColor(0x87ceeb, 1);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    this.scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xfffffff);
    this.scene.add(ambientLight);

    // Load turbine model
    this.loader = new GLTFLoader();
    this.loader.load("/assets/model.glb", (gltf: any) => {
      this.model = gltf.scene;
      this.model.position.y = -7.3;
      this.model.scale.set(0.3, 0.3, 0.3);
      this.scene.add(this.model);

      const blades = this.model.getObjectByName('Helice__0') as THREE.Mesh; 
      if (blades) {
        this.animate(blades); 
      } else {
        console.error('Blades not found! Ensure the name is correct.');
      }
    }, undefined, (error: any) => {
      console.error('An error occurred while loading the turbine model:', error);
    });

    // Load ground model
    this.loader.load("/assets/ground.glb", (gltf: any) => {
      this.groundModel = gltf.scene;
      this.groundModel.position.y = -7; // Adjust position if necessary
      this.scene.add(this.groundModel);
    }, undefined, (error: any) => {
      console.error('An error occurred while loading the ground model:', error);
    });

    // Add OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.enableZoom = true;
    this.controls.minDistance = 1; 
    this.controls.maxDistance = 100;

    // this.controls.minPolarAngle = Math.PI / 2;  // 30 degrees (restrict looking too far up)
    this.controls.maxPolarAngle = Math.PI / 1.7;  // 60 degrees (restrict looking too far down)

// For horizontal rotation (Y-axis)
    // this.controls.minAzimuthAngle = -Math.PI / 3;  // -45 degrees (restrict how far left)
    // this.controls.maxAzimuthAngle = Math.PI / 3;
  }

  animate(blades: THREE.Mesh): void {
    requestAnimationFrame(() => this.animate(blades));
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    blades.rotation.y += this.turbineSpeed * 0.01;
  }
}
