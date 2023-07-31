import React, { useEffect, useRef} from 'react';
import second3d from '../../../../3d-elements/pills-colors.glb';
import {gsap, Back} from 'gsap';
import {useMediaQuery} from '../../../../hooks/useMediaQuery';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';



function PillsColors3D (props) {
    const group = useRef();
    const pivot = useRef();
    const isDeskTop = useMediaQuery('(min-width: 1024px)');
    const isMobile = useMediaQuery('(max-width: 1024px)');


    const loadModel = () => {
        const loader = new GLTFLoader();
        loader.load(second3d, function (gltf) {
            const obj = gltf.scene;
            const box = new THREE.Box3().setFromObject(obj);
            const center = new THREE.Vector3();
            box.getCenter(center);
            obj.position.sub(center); 

            
            obj.remove(obj.children[1]);

            obj.rotation.y = Math.PI; 
            pivot.current.add(obj);
            pivot.current.position.copy(center); 
        });
    };

    

    useEffect(() => {
        loadModel();
      }, []);
    

    let startRotationX = Math.PI * -1.05;
    let startRotationY = Math.PI * -0.19;
    let startRotationZ = 0;
    
    let startPositionX
    let startPositionY 
    let startPositionZ



    if (isMobile) {
        startPositionX = 1;
        startPositionY = 1.4;
        startPositionZ = -5.7;
    } else if (isDeskTop) {
        startPositionX = 1.6;
        startPositionY = 1.3;
        startPositionZ = -3.2;
    }

    const prevScrollY = useRef(0);

    useEffect(() => {

        const handleScroll = () => {
        if (!pivot.current || !pivot.current.children[0]) return;
        const currentScrollY = window.scrollY;
        
        let newPositionY = startPositionY - currentScrollY*0.001;
        let newRotationZ = currentScrollY*0.01;
        let newRotationX = -currentScrollY*0.005 ;
        
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

        prevScrollY.current = currentScrollY;
        };

        const handleMouseMove = (event) => {
            if (!pivot.current || !pivot.current.children[0]) return;
            const { clientX, clientY } = event;

            const rotationX = startRotationX - (clientX - window.innerWidth * 0.5) * 0.00016;
            const positionX = startPositionX + (clientY - window.innerHeight * 0.5) * 0.0001;
            const positionZ = startPositionZ + (clientY - window.innerHeight * 0.5) * 0.0001;

            gsap.to(group.current.rotation, {
                x: rotationX,
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
    }, [isDeskTop, startPositionX, startPositionY, startPositionZ, startRotationX ]);

    return (
      <group position={[startPositionX, startPositionY, startPositionZ]} rotation={[startRotationX, startRotationY, startRotationZ]} ref={group} {...props} dispose={null} scale={[0.2, 0.2, 0.2]}>
        <group ref={pivot} name="Scene">
        </group>
      </group>
    )
}

export default PillsColors3D;