// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import pillsColors3d from '../../../../images/pills-colors.glb';

import first3d from '../../../../images/3D-object-1.png';
import second3d from '../../../../images/3D-object-2.png';
import third3d from '../../../../images/3D-object-3.png';

import './FirstSection.css';

const FirstSection = function ({ scrollToNextComponent }) {

    return(
        <section className='first-section'>
            <div className='first-section-container'>
                <div className='first-3d'>
                    <img src={first3d}></img>
                </div>
                <div className='second-3d'>
                    <img src={second3d}></img>
                </div>
                <div className='third-3d'>
                    <img src={third3d}></img>
                </div>
                <h1>Архімед — ваш торговий представник в Україні</h1>
                <h2>Відкриваєм двері в Україну міжнародним виробникам товарів для охорони здоров'я</h2>
                <div className='first-section-button'>
                    <div onClick={scrollToNextComponent}>
                        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.25 24.25V25H14.75V24.25H16.25ZM14.75 6.75C14.75 6.33579 15.0858 6 15.5 6C15.9142 6 16.25 6.33579 16.25 6.75H14.75ZM14.75 24.25V6.75H16.25V24.25H14.75Z" fill="currentColor"/>
                            <path d="M20.5 11.75L15.5 6.75L10.5 11.75" stroke='currentColor' strokeWidth="1.5" strokeLinecap="square"/>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    )
}

// const ModelViewer = () => {
//     const containerRef = useRef(null);
//     const rendererRef = useRef(null);
  
//     useEffect(() => {
//       let renderer, scene, camera;
  
  
//       const init = () => {
//         if (!rendererRef.current) {
//           renderer = new THREE.WebGLRenderer({ antialias: true });
//           renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
//           rendererRef.current = renderer;
//           containerRef.current.appendChild(renderer.domElement);
//         } else {
//           renderer = rendererRef.current;
//         }
  
//         scene = new THREE.Scene();
//         camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
//         camera.position.z = 1;
  
//         const loader = new GLTFLoader();
  
//         loader.load(pillsColors3d, (gltf) => {
//             // Store the loaded GLTF object
//             const model = gltf.scene;
          
//             // Add the model to the scene
//             model.scale.set(0.5, 0.5, 0.5); // Example: Scale the model to 50% of its original size

//             scene.add(model);

//             // Add a directional light to the scene
//             const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//             directionalLight.position.set(1, 2, 3); // Example: Set the light position
//             scene.add(directionalLight);

//             renderer.setClearColor(0x000000, 0); // Example: Set the background color to black with full transparency
//             renderer.setClearAlpha(0); // Set the renderer's clear alpha to 0 (fully transparent)

//             model.rotation.y = -8;
//             model.rotation.x = 6;
//             model.rotation.z = 5.8;


//             // Configure material to have an alpha channel
//             model.traverse((node) => {
//                 if (node.isMesh) {
//                 node.material.color.set(0x042336);
//                 node.material.transparent = true;
//                 node.material.alphaTest = 0.5; // Example: Set the alpha test threshold
//                 }
//             });
//           });
  
//         // Additional rendering code here (e.g., lights, controls, etc.)
//         // ...
  
//         const animate = () => {
//           requestAnimationFrame(animate);
//           renderer.render(scene, camera);
//         };
  
//         animate();
//       };
  
//       init();
  
//       return () => {
//         rendererRef.current.dispose();
//         // Dispose other resources as needed
//       };
//     }, []);
  
//     return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
//   };
  
export default FirstSection;