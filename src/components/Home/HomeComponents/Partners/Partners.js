import './Partners.css';

import React, { useEffect, useRef, useState } from 'react';
import InternationalPartners from './InternationalPartners';
import UkrainianPartners from './UkrainianPartners';
import EmbassiesPartners from './EmbassiesPartners';
import { useTranslation } from 'react-i18next';

function Partners () {
    let firstSlideTime = '20s';

    const { t } = useTranslation();
    const sectionRef = useRef(null);
    const [scrollTransform, setScrollTransform] = useState({ scale: 0.9, translateY: '150px' });

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
                    <h5>{t('partners_text')}</h5>
                    <h5>{t('inter_companies')}</h5>
                    <h5>{t('ua_companies')}</h5>
                    <h5>{t('embassies')}</h5>
                    <div className='logos'>
                        <InternationalPartners/>
                        <InternationalPartners/>
                        <InternationalPartners/>
                        <InternationalPartners/>
                    </div>

                    <div className='logos reverse'>
                        <UkrainianPartners/>
                        <UkrainianPartners/>
                        <UkrainianPartners/>
                        <UkrainianPartners/>
                    </div>

                    <div className='logos'>
                        <EmbassiesPartners/>
                        <EmbassiesPartners/>
                        <EmbassiesPartners/>
                        <EmbassiesPartners/>
                    </div>

                </div>
            </section>
        )
}


export default Partners;