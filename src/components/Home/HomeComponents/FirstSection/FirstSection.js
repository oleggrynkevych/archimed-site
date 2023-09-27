import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import './FirstSection.css';
import ScissorsColors3D from './ScissorsColors3D';
import PillsColors3D from './PillsColors3D';
import SyringeColors3D from './SyringeColors3D';
import classnames from 'classnames';
import { EffectComposer, SMAA, FXAA } from "@react-three/postprocessing";
import SobelEdge from '../../../Sobel/SobleEdge';
import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';



// const SUBTITLE = gql`
//     query GetHomePage ($locale: I18NLocaleCode) {
//         homePage (locale: $locale) {
//             data {
//                 attributes {
//                     SubTitleHomePage
//                 }
//             }
//         }
//     }
// `



const FirstSection = function ({ scrollToNextComponent, props }) {
    const { t, i18n } = useTranslation();
    // const locale = i18n.language === 'ua' ? 'uk' : i18n.language;

    // const {loading, error, subtitleData} = useQuery(SUBTITLE, {
    //     variables: { locale: locale }
    // });

    // if(loading) return <div style={{backgroundColor: '#F5F5F5', width: '100%', height: '200vh', position: 'relative'}}>
    //     <img src={mainLogo} alt={'Main Logo'} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50vh)'}}/>
    // </div>
    // if(error) return <p></p>
    

    useEffect(() => {
        const subtitle = document.getElementById('subtitle').textContent;
        const title = document.getElementById('title').textContent;

        const words = subtitle.split(" ");
        const words_2 = title.split(" ");


        const animatedSubtitle = words.map((word, index) => {
            return `<span class="word"><span>${word}</span></span>`;
        }).join(" ");

        const animatedTitle = words_2.map((word, index) => {
            return `<span class="word"><span>${word}</span></span>`;
        }).join(" ");

        document.getElementById('title').innerHTML = animatedTitle;
        document.getElementById('subtitle').innerHTML = animatedSubtitle;

        const allWords = document.querySelectorAll('.word');

        if(props.loading) {
            allWords.forEach((word, index) => {
                const spanElements = word.querySelectorAll('span');
                spanElements.forEach((span) => {
                    span.classList.add('without-delay');
                });
            });
        }

    }, [])
    
    
    return(
        <section className='first-section'>
            <div className='first-3d' style={{width:'100%', height:'100%', top:'64px', left:'0', overflow: 'visible'}}>
                    <Canvas dpr={1.2} camera={{fov: 45, position: [0,0,0]}}>
                    <color attach="background" args={['#F5F5F5']} linear/>
                        <Suspense fallback={null}>
                            <ScissorsColors3D/>
                            <PillsColors3D/>
                            <SyringeColors3D/>
                            <EffectComposer multisampling={0}>
                                <SobelEdge />
                                <FXAA />
                            </EffectComposer>
                            
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
                    <h1 id="title">{t('title')}</h1>
                    <h2 id="subtitle">{props.subtitle}</h2>
                </div>
            </div>
        </section>
    )
}
  
export default FirstSection;