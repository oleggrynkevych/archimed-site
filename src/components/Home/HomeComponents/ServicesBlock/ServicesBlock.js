 import './ServicesBlock.css';
 import React, { Suspense, useState} from 'react';
 import { useQuery, gql } from '@apollo/client';
 import ServiceItem from './ServiceItem.js';
 import { Canvas } from '@react-three/fiber'; 
//  import {servicesData} from './service-block-data.js';
import SyringeColorsService3D from './SyringeColorsService3D';
import { EffectComposer, SMAA } from "@react-three/postprocessing";
import SobelEdge from '../../../Sobel/SobleEdge';
import { useTranslation } from 'react-i18next';



const SERVICES = gql`
    query GetServices ($locale: I18NLocaleCode) {
        services (locale: $locale) {
            data {
                id
                attributes {
                    Title,
                    Order
                }
            }
        }
    }
`

const ServicesBlock = function ({ innerRef }) {
    const { t, i18n } = useTranslation();
    const locale = i18n.language === 'ua' ? 'uk' : i18n.language;

    const {loading, error, data} = useQuery(SERVICES, {
        variables: { locale: locale }
    });

    if(loading) return <p></p>
    if(error) return <p></p>

    const sortedData = [...data.services.data].sort((a, b) => {
        return a.attributes.Order - b.attributes.Order;
    });

    return (
        <section className='services-block'>
            <div className='services-block-container'>
                <div className='second-3d'>
                    {/* <Canvas dpr={2} camera={{fov: 45, position: [0,0,0]}}>
                        <color attach="background" args={['#F5F5F5']} linear/>

                        <Suspense fallback={null}>
                            <SyringeColorsService3D/>
                            <EffectComposer multisampling={0}>
                                <SobelEdge />
                                <SMAA />
                            </EffectComposer>
                        </Suspense>
                    </Canvas> */}
                </div>
                <h3>{t('services_subtitle')}</h3>
                <div className='services-wrapper' ref={innerRef}>
                    {sortedData.map(service => (
                        <ServiceItem 
                            key={service.id} 
                            number={service.attributes.Order < 10 ? service.attributes.Order.toString().padStart(2, '0') : service.attributes.Order.toString()} 
                            name={service.attributes.Title} 
                            id={service.id}
                        />
                    ))}
                </div>
            </div>
        </section>
    )  
 }

 export default ServicesBlock;