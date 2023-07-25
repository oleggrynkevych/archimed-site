import React, { useEffect, useRef } from 'react';
import first3d from '../../3d-elements/scissors-colors.glb';
import {gsap , Back} from 'gsap';
import {useMediaQuery} from '../../hooks/useMediaQuery';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Scissors3D (props) {
    const group = useRef();
    const pivot = useRef();
    const isDeskTop = useMediaQuery('(min-width: 1024px)');
    const isMobile = useMediaQuery('(max-width: 1024px)');

    const loadModel = () => {
        const loader = new GLTFLoader();
        loader.load(first3d, function (gltf) {
            const obj = gltf.scene;
            const box = new THREE.Box3().setFromObject(obj);
            const center = new THREE.Vector3();
            box.getCenter(center);
            obj.position.sub(center); 
            obj.rotation.y = Math.PI; 
            
            pivot.current.add(obj);
            pivot.current.position.copy(center); 
        });
    };

   

    useEffect(() => {
        loadModel();
      }, []);
    

    let startRotationX = Math.PI * -1.1;
    let startRotationY = Math.PI * -0.5;
    let startRotationZ = 0;
    
    let startPositionX
    let startPositionY 
    let startPositionZ



    if (isMobile) {
        startPositionX = 0.9;
        startPositionY = 2.3;
        startPositionZ = -5;
    } else {
        startPositionX = -0.7;
        startPositionY = 1.6;
        startPositionZ = -2.8;
    }

    const prevScrollY = useRef(0);

    useEffect(() => {

        const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        let newPositionY = startPositionY - currentScrollY*0.0004;
        let newRotationZ = Math.PI - currentScrollY*0.007;
        let newRotationX = currentScrollY*0.008 ;

        gsap.to(pivot.current.children[0].children[0].rotation, {
            x: newRotationX,
            z: newRotationZ,
            duration: 0.1,
            ease: Back.easeOut.config(3)
        })

        gsap.to(group.current.position, {
            y: newPositionY,
            duration: 0.1,
            ease: Back.easeOut.config(3)
        })

        // pivot.current.children[0].children[0].rotation.x = -currentScrollY*0.0015;

        // pivot.current.children[1].children[0].rotation.x = startRotationX - currentScrollY*0.0001;
        // group.current.rotation.z = startRotationZ - currentScrollY*0.001;

        prevScrollY.current = currentScrollY;
        };

        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;

            const rotationY = startRotationY - (clientX - window.innerWidth * 0.5) * 0.00015;
            const positionX = startPositionX + (clientY - window.innerHeight * 0.5) * 0.0001;
            const positionZ = startPositionZ + (clientY - window.innerHeight * 0.5) * 0.0001;

            gsap.to(group.current.rotation, {
                y: rotationY,
                duration: 1.2,
                ease: 'power2.out'
            })

            gsap.to(group.current.position, {
                x: positionX,
                z: positionZ,
                duration: 1.2,
                ease: 'power2.out'
            })
        };

        window.addEventListener('scroll', handleScroll);
        if (isDeskTop) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);

        };
    }, [isDeskTop, startPositionX, startPositionY, startPositionZ, startRotationY ]);


    return (
      <group position={[startPositionX, startPositionY, startPositionZ]} rotation={[startRotationX, startRotationY, startRotationZ]} ref={group} {...props} dispose={null} scale={[0.23, 0.23, 0.23]}>
        <group ref={pivot} name="Scene">
        </group>
      </group>
    )
}

export default Scissors3D;