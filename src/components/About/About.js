import './About.css';
import Slider from "react-slick";
import Carousel from '../Services/Carousel/Carousel';
import {teamMembersData} from './about-page-data.js';
import React, { Suspense} from 'react';
import { Canvas } from '@react-three/fiber';
import Scissors3D from './Scissors3D';
import Pills3D from './Pills3D';
import Syringe3D from './Syringe3D';
import { EffectComposer, SMAA } from "@react-three/postprocessing";
import SobelEdge from '../Sobel/SobleEdge';
import { useQuery, gql } from '@apollo/client';
import SliderTeamMember from './SliderTeamMember.js';
import { useTranslation } from 'react-i18next';


const ABOUTINFO = gql`
query GetAboutPage ($locale: I18NLocaleCode) {
    aboutPage (locale: $locale) {
      data {
        attributes {
            Text1, 
            Text2,
            Text3,
            Text4,
            ButtonText,
            ButtonLink
        }
      }
    }
  }
`

const TEAMMEMBER = gql`
    query GetTeamMember ($locale: I18NLocaleCode) {
        teamMembers (locale: $locale) {
            data {
                id
                attributes {
                Comment,
                FirstName,
                Position,
                LastName,
                Order,
                Photo{
                    data{
                        attributes{
                            url
                        }
                    }
                }
            }
        }
    }
}
`

function About() {
    const { t, i18n } = useTranslation();
    const locale = i18n.language === 'ua' ? 'uk' : i18n.language;

    const {loading, error, data} = useQuery(ABOUTINFO, {
        variables: { locale: locale }
    });

    const {loading: teamMemberLoading, error: teamMemberError, data: teamMemberData} = useQuery(TEAMMEMBER, {
        variables: { locale: locale }
    });

    if(loading || teamMemberLoading) return <p></p>
    if(error || teamMemberError) return <p></p>

    const sortedTeamMembers = [...teamMemberData.teamMembers.data].sort((a, b) => {
        return a.attributes.Order - b.attributes.Order;
    });

    const settings = {
        dots: false,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return (
        <div className="about-page">
                <div className="about-page-header">  
                    <div className='small-container-header'>   
                        <div className="about-page-header-text">
                            <span>{data.aboutPage.data.attributes.Text1}</span>
                            <span>мета</span>
                            <span>відкриваєм двері в Україну міжнародним виробникам товарів для охорони здоров'я</span>
                        </div>
                        <div className="about-page-header-photo">
                            <div className="background-team-image"></div>
                        </div>
                    </div>  
                </div>

                <div className="about-page-main">
                    <div className='third-3d'>
                        <Canvas dpr={1.5} camera={{fov: 45, position: [0,0,0]}}>
                            <Suspense fallback={null}>
                        
                                <Scissors3D/>
                                <Pills3D/>
                                <Syringe3D/>
                                <EffectComposer multisampling={0}>
                                    <SobelEdge />
                                    <SMAA />
                                </EffectComposer>
                            </Suspense>
                        </Canvas>
                    </div>
                    <div className='small-container-main'>
                        <span className="about-page-main-first-text">{data.aboutPage.data.attributes.Text2}</span>
                        <div className="about-page-main-second-text">
                            <span>{data.aboutPage.data.attributes.Text3}</span>
                            <a href={data.aboutPage.data.attributes.ButtonLink} target='_blank' rel='noopener'><div>{data.aboutPage.data.attributes.ButtonText}</div></a>
                        </div>
                        <div className="about-page-main-special">
                            <div className="about-page-special-first-text">
                                <span>команда</span>
                                <span>Нами рухає інтерес до всього, що ми робимо</span>
                            </div>
                            <span className="about-page-special-second-text">{data.aboutPage.data.attributes.Text4}</span>
                        </div>
                    </div>
                </div>
                
                <div className='about-page-slider'>
                    <Slider {...settings}>
                        {sortedTeamMembers.map((member) => (
                            <SliderTeamMember
                                key={member.id}
                                src={member.attributes.Photo.data.attributes.url}
                                quote={member.attributes.Comment}
                                firstname={member.attributes.FirstName}
                                lastname={member.attributes.LastName}
                                position={member.attributes.Position}
                            />
                        ))}
                    </Slider>  
                </div>  

                <div className='about-page-carousel'>
                    <Carousel textTitle={'наші послуги'}/> 
                </div>           
        </div>
    )
}

export default About;