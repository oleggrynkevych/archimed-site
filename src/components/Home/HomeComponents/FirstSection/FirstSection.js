import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas , useFrame } from '@react-three/fiber';
import './FirstSection.css';
import ScissorsColors3D from './ScissorsColors3D';
import PillsColors3D from './PillsColors3D';
import SyringeColors3D from './SyringeColors3D';

const FirstSection = function ({ scrollToNextComponent }) {

    return(
        <section className='first-section'>
            <div className='first-3d' style={{width:'100%', height:'100%', top:'64px', left:'0', overflow: 'visible'}}>
                    <Canvas dpr={2} camera={{fov: 45, position: [0,0,0]}}>
                        <Suspense fallback={null}>
                            <ambientLight/>
                            <directionalLight intensity={2} position={[0,0,50]}/>
                            
                            {/* <ScissorsColor3D/> */}
                            <ScissorsColors3D/>
                            <PillsColors3D/>
                            <SyringeColors3D/>
                        </Suspense>
                    </Canvas>
                </div>
            <div className='first-section-container'>
                <div className='first-section-button'>
                    <div onClick={scrollToNextComponent}>
                        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.25 24.25V25H14.75V24.25H16.25ZM14.75 6.75C14.75 6.33579 15.0858 6 15.5 6C15.9142 6 16.25 6.33579 16.25 6.75H14.75ZM14.75 24.25V6.75H16.25V24.25H14.75Z" fill="currentColor"/>
                            <path d="M20.5 11.75L15.5 6.75L10.5 11.75" stroke='currentColor' strokeWidth="1.5" strokeLinecap="square"/>
                        </svg>
                    </div>
                </div>
                <div className='first-section-container-text'>
                    <h1>Архімед — ваш торговий представник в Україні</h1>
                    <h2>Відкриваєм двері в Україну міжнародним виробникам товарів для охорони здоров'я</h2>
                </div>
            </div>
        </section>
    )
}
  
export default FirstSection;