// import React, { useEffect, useRef, useState, useMemo } from 'react';
// import { useFrame, useThree } from '@react-three/fiber';
// import { useGLTF, useAnimations } from '@react-three/drei';
// import first3d from '../../../../images/scissors-colors.glb';
// import {gsap} from 'gsap';
// import {useMediaQuery} from '../../../../hooks/useMediaQuery';



// function ScissorsColor3D (props) {
//     const group = useRef();
//     const isDeskTop = useMediaQuery('(min-width: 1024px)');
//     const isMobile = useMediaQuery('(max-width: 1024px)');

//     const { nodes, materials, animations } = useGLTF(first3d);
//     const { actions } = useAnimations(animations, group);

    
//     let startRotationX = Math.PI*-1.1;
//     let startRotationY = Math.PI*0.5;
//     let startRotationZ = 0;
    
//     let startPositionX
//     let startPositionY 
//     let startPositionZ

//     if (isMobile) {
//         startPositionX = 0.6;
//         startPositionY = 2.7;
//         startPositionZ = -5;
//     } else {
//         startPositionX = 1.6;
//         startPositionY = 2.1;
//         startPositionZ = -2.8;
//     }



//     const prevScrollY = useRef(0);

//     useEffect(() => {

//         const handleScroll = () => {
//         const currentScrollY = window.scrollY;
        
//         group.current.position.y = startPositionY - currentScrollY*0.0015;
//         group.current.rotation.x = startRotationX - currentScrollY*0.001;
//         group.current.rotation.z = startRotationZ - currentScrollY*0.001;

//         prevScrollY.current = currentScrollY;
//         };

//         const handleMouseMove = (event) => {
//             const { clientX, clientY } = event;

//             const sensitivity = 0.0001;
//             const rotationY = startRotationY - (clientX - window.innerWidth * 0.5) * sensitivity;
//             const positionX = startPositionX + (clientY - window.innerHeight * 0.5) * sensitivity;
//             const positionZ = startPositionZ + (clientY - window.innerHeight * 0.5) * sensitivity;

//             gsap.to(group.current.rotation, {
//                 y: rotationY,
//                 duration: 1.2,
//                 ease: 'power2.out'
//             })

//             gsap.to(group.current.position, {
//                 x: positionX,
//                 z: positionZ,
//                 duration: 1.2,
//                 ease: 'power2.out'
//             })
//         };

//         window.addEventListener('scroll', handleScroll);
//         if (isDeskTop) {
//             window.addEventListener('mousemove', handleMouseMove);
//         }

//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//             window.removeEventListener('mousemove', handleMouseMove);

//         };
//     }, );


//     return (
//       <group position={[startPositionX, startPositionY, startPositionZ]} rotation={[startRotationX, startRotationY, startRotationZ]} ref={group} {...props} dispose={null} scale={[0.5, 0.5, 0.5]}>
//         <group name="Scene">
//           <mesh name="Plane001" geometry={nodes.Plane001.geometry} material={materials.Metal_Medical} position={[-1.004, 1.264, -3.21]} />
//           <mesh name="Plane002" geometry={nodes.Plane002.geometry} material={materials.Metal_Medical} position={[-1.008, 2.596, -3.208]} rotation={[0, 0, -Math.PI]} />
//         </group>
//       </group>
//     )
// }

// export default ScissorsColor3D;