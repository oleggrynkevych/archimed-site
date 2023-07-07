 import './ServicesBlock.css';
 import React, { Suspense, useEffect, useRef, useState} from 'react';
 import { Canvas , useFrame } from '@react-three/fiber'; import { Link } from 'react-router-dom';
 import {servicesData} from './service-block-data.js';
import SyringeColorsService3D from './SyringeColorsService3D';
import { extend, useThree } from "@react-three/fiber";

import { EffectComposer, SMAA } from "@react-three/postprocessing";
import SobelEdge from '../../../Sobel/SobleEdge'


 const ServicesBlock = function ({ innerRef }) {

    return (
        <section className='services-block'>
            <div className='services-block-container'>
                <div className='second-3d'>
                    <Canvas dpr={2} camera={{fov: 45, position: [0,0,0]}}>
                        <color attach="background" args={['#F5F5F5']} linear/>

                        <Suspense fallback={null}>
                            <ambientLight/>
                            <directionalLight intensity={2} position={[0,0,50]}/>
                            <SyringeColorsService3D/>
                            <EffectComposer multisampling={0}>
                                <SobelEdge />
                                <SMAA />
                            </EffectComposer>
                        </Suspense>
                    </Canvas>
                </div>
                <h3 >Наші послуги</h3>
                <div className='services-wrapper' ref={innerRef}>
                    {servicesData.map((service, index) => (
                        <ServiceItem key={index} number={service.number} name={service.name} />
                    ))}
                </div>
            </div>
        </section>
    )  
 }

 function ServiceItem({...props}){
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <Link 
            to='/servicepage'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={`service-item ${isHovered ? 'hovered' : ''}`}>
                <span>{props.number}</span>
                <h4>{props.name}</h4>
                <div className='service-item-link'>
                    <span >дізнатись більше</span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.89791 13.5218L4.54436 13.8754L5.25146 14.5825L5.60502 14.2289L4.89791 13.5218ZM13.105 6.72892C13.3003 6.53366 13.3003 6.21707 13.105 6.02181C12.9098 5.82655 12.5932 5.82655 12.3979 6.02181L13.105 6.72892ZM5.60502 14.2289L13.105 6.72892L12.3979 6.02181L4.89791 13.5218L5.60502 14.2289Z" fill="currentColor"/>
                        <path d="M5.25146 6.37537H12.7515V13.8754" stroke="currentColor" strokeLinecap="square"/>
                    </svg>
                </div>
            </div>
        </Link>
    )
}

 export default ServicesBlock;