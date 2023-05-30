import './Partners.css';
import logoCompany1 from '../../../../images/logo-company-1.svg';
import logoCompany2 from '../../../../images/logo-company-2.svg';
import React, { useEffect, useRef, useState } from 'react';



function Partners () {
let firstSlideTime = '15s';

const sectionRef = useRef(null);
const [scrollTransform, setScrollTransform] = useState({ scale: 0.9, translateY: '150px' });

const [headerBg, setHeaderBg] = useState (false);

useEffect(() => {

    const handleScroll = () => {
        const section = sectionRef.current;
        if (!section) return;

        const sectionTop = section.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;

        const scrollPercentage = Math.min(Math.max((viewportHeight - sectionTop) / viewportHeight, 0), 1);

        const initialScale = 0.9;
        const finalScale = 1;
        const initialTranslateY = 150;
        const finalTranslateY = 0;

        const scale = initialScale + (scrollPercentage * (finalScale - initialScale));
        const translateY = `${initialTranslateY - (scrollPercentage * (initialTranslateY - finalTranslateY))}px`;

        setScrollTransform({ scale, translateY });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return(
        <section className='partners-block'>
            <div className='partners-block-container' ref={sectionRef} style={{ transform: `scale(${scrollTransform.scale}) translateY(${scrollTransform.translateY})` }}>
                <h5>нам довіряють</h5>
                <h5>31 міжнародна компанія</h5>
                <h5>15 український компаній</h5>
                <h5>4 посольства</h5>
                <div className='logos'>
                    <div className='logos-slide' style={{ animation: `${firstSlideTime} slide infinite linear` }}>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                    </div>
                    <div className='logos-slide' style={{ animation: `${firstSlideTime} slide infinite linear` }}>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                    </div>
                </div>

                <div className='logos reverse'>
                    <div className='logos-slide' style={{ animation: `${firstSlideTime} slide-reverse infinite linear` }}>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                    </div>
                    <div className='logos-slide' style={{ animation: `${firstSlideTime} slide-reverse infinite linear` }}>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                    </div>
                </div>

                <div className='logos'>
                    <div className='logos-slide' style={{ animation: `${firstSlideTime} slide infinite linear` }}>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                    </div>
                    <div className='logos-slide' style={{ animation: `${firstSlideTime} slide infinite linear` }}>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                        <Logo src={logoCompany1}/>
                        <Logo src={logoCompany2}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Logo(props) {
    return (
        <div className='logo-company'>
            <img src={props.src}/>
        </div>
    )
}


export default Partners;