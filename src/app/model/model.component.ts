// import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { isPlatformBrowser } from '@angular/common';

// @Component({
//   selector: 'app-model',
//   standalone:true,
//   template: '<div #modelContainer><canvas #canvas></canvas></div>',
// })
// export class ModelComponent implements OnInit, AfterViewInit {
//   @ViewChild('modelContainer', { static: false }) modelContainer!: ElementRef;
//   @ViewChild('canvas', { static: false }) canvas!: ElementRef;
//   private loader = new GLTFLoader();
//   private model: THREE.Group | undefined;
//   private scene: THREE.Scene | null = null;
//   private camera: THREE.PerspectiveCamera | null = null;
//   private renderer: THREE.WebGLRenderer | null = null;
//   private blades: THREE.Mesh | undefined; // Blades reference

//   private hardcodedRotationSpeed = 0.01; // Hardcoded turbine blade rotation speed

//   constructor(@Inject(PLATFORM_ID) private platformId: string) {}

//   ngOnInit(): void {}

//   ngAfterViewInit(): void {
//     if (this.isBrowser) {
//       const canvas = this.canvas.nativeElement as HTMLCanvasElement;
//       this.scene = new THREE.Scene();
//       this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
//       this.camera.position.z = 10;
//       this.camera.position.y = 2;
//       this.renderer = new THREE.WebGLRenderer({
//         canvas: canvas,
//         antialias: true,
//       });
//     }

//     // Load the GLTF model
//     this.loader.load('/assets/model.glb', (gltf: any) => {
//       this.model = gltf.scene as THREE.Group;
//       if (this.model) {
//         this.model.position.set(0, 0, 0); // Adjust model position
//         this.model.scale.set(0.1, 0.1, 0.1); // Adjust scale
//  // Adjust scale
//         this.scene!.add(this.model);

//         // Find the blades object by name
//         this.blades = this.model.getObjectByName('Helice__0') as THREE.Mesh;
//         console.log('Blades object:', this.blades); // Inspect the blades object

//         if (!this.blades) {
//           console.error('Blades not found! Ensure the name is correct.');
//         }

//         this.animate(); // Start animation loop
//       }
//     });
//   }

//   private get isBrowser(): boolean {
//     return isPlatformBrowser(this.platformId);
//   }

//   // Animation loop
//   private animate(): void {
//     requestAnimationFrame(() => this.animate());

//     if (this.blades) {
//       // Rotate the blades by the hardcoded speed
//       this.blades.rotation.z += this.hardcodedRotationSpeed; // Rotating around z-axis
//       console.log(`Blades Rotating: ${this.blades.rotation.z}`);
//     }

//     this.renderer!.render(this.scene!, this.camera!);
//   }
// }
