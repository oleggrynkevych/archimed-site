import './About.css';
import teamPhoto from '../../images/team-photo.png';
import Slider from "react-slick";
import quotesIcon from '../../images/quotes-icon.svg';
import Carousel from '../Services/Carousel/Carousel';
import {teamMembersData} from './about-page-data.js';
import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas , useFrame } from '@react-three/fiber';
import Scissors3D from './Scissors3D';
import Pills3D from './Pills3D';
import Syringe3D from './Syringe3D';

function About() {

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
                        <span>Руйнуємо пострадянські стереотипи і демонструємо всьому світу, що наша країна має величезний потенціал</span>
                        <span>мета</span>
                        <span>відкриваєм двері в Україну міжнародним виробникам товарів для охорони здоров'я</span>
                    </div>
                    <div className="about-page-header-photo">
                        <img src={teamPhoto} alt='Team Photo'></img>
                    </div>
                    </div>     
                </div>

                <div className="about-page-main">
                    <div className='third-3d'>
                        <Canvas dpr={2} camera={{fov: 45, position: [0,0,0]}}>
                            <Suspense fallback={null}>
                                <ambientLight/>
                                <directionalLight intensity={2} position={[0,0,50]}/>
                                <Scissors3D/>
                                <Pills3D/>
                                <Syringe3D/>
                            </Suspense>
                        </Canvas>
                    </div>
                    <div className='small-container-main'>
                        <span className="about-page-main-first-text">Архімед не є класичним дистрибутором, що претендує на маржинальність</span>
                        <div className="about-page-main-second-text">
                            <span>Ми – сервісна компанія, яка реалізує представницькі функції і здійснює експертну допомогу для іноземних виробників ліків, медичних виробів і косметичних засобів, забезпечуючи супровід повного життєвого циклу товару на ринку.</span>
                            <div>кодекс ділової етики</div>
                        </div>
                        <div className="about-page-main-special">
                            <div className="about-page-special-first-text">
                                <span>команда</span>
                                <span>Нами рухає інтерес до всього, що ми робимо</span>
                            </div>
                            <span className="about-page-special-second-text">Ми прагнемо формувати команду виключно з захоплених людей, упереджених до спільної справи і вміють досягати мети</span>
                        </div>
                    </div>
                </div>
                
                <div className='about-page-slider'>
                    <Slider {...settings}>
                        {teamMembersData.map((member) => (
                            <SliderTeamMember
                                key={member.id}
                                src={member.src}
                                quote={member.quote}
                                name={member.name}
                                position={member.position}
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

function SliderTeamMember (props) {
    return(
        <div className='slider-team-member'>
            <div className='slider-team-member-photo'>
                <img src={props.src}/>
            </div>
            <div className='slider-team-member-content'>
                <div className='member-content-container'>
                    <div className='slider-team-member-comment'>
                        <div className='slider-team-member-comment-image'>
                            <img src={quotesIcon}/>
                        </div>
                        <span>{props.quote}</span>
                    </div>
                    <div className='slider-team-member-person'>
                        <span>{props.name}</span>
                        <span>{props.position}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;