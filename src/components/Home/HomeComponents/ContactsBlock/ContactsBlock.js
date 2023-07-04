import './ContactsBlock.css';
import videoLogo from '../../../../images/video-logo.svg';
import mapIcon from '../../../../images/map-icon-color.svg';
import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";


function ContactsBlock ({commonStyle}) {

    const [phoneNumber, setPhoneNumber] = useState("");

    const handlePhoneNumberChange = (value) => {
        setPhoneNumber(value);
    };

    return(
        <section className='contacts-block' style={commonStyle}>
            <div className='contacts-block-container'>
                <div className='contacts-first-block'>
                    <span>контактна форма</span>
                    <span>зв’яжіться з нами</span>
                    <span>і ми реалізуємо найкраще рішення для вашого бізнесу</span>
                    <span>або заплануйте відео-зустріч</span>
                    {/* <span>ми доступні в</span> */}
                    <div className='video-item-block'>
                        <VideoItem src={videoLogo} text={'Запланувати'}/>
                        
                    </div>

                    <div className='contacts-block-for-mobile'>
                        <span>або заплануйте відео-зустріч</span>
                        <span>ми доступні в</span>
                        <div className='video-item-block-mobile'>
                            <VideoItem src={videoLogo} text={'Запланувати'}/>
                            
                        </div>
                    </div>

                    <div className='footer-site-info'>
                        <SiteInfoItem href={'mailto:mail@archimed.in.ua'} target={"_blank"} firstText={'пошта'} secondText={'mail@archimed.in.ua'}/>
                        <SiteInfoItem href={'tel:380442325252'} target={"_blank"} firstText={'телефон'} secondText={'+380 (44) 232-52-52'}/>
                        <SiteInfoItem 
                            href={'https://www.google.com/maps/place/%D0%A2%D0%9E%D0%92+%22%D0%90%D1%80%D1%85%D1%96%D0%BC%D0%B5%D0%B4+%D0%9C%D0%B5%D0%B4%D1%96%D0%BA%D0%B0%D0%BB%22/@50.4705986,30.5185406,18z/data=!4m6!3m5!1s0x40d4d3f7f5a65159:0x337c2360967c3ed3!8m2!3d50.470532!4d30.519643!16s%2Fg%2F11h4qrnrfh?entry=ttu'} 
                            target={"_blank"}
                            firstText={'адреса'} 
                            secondText={'04071, м. Київ, вул. Верхній Вал, 64'}/>
                        <div className='footer-map'>
                            <img src={mapIcon} alt="Map Icon"></img>
                            <a 
                                href={'https://www.google.com/maps/place/%D0%A2%D0%9E%D0%92+%22%D0%90%D1%80%D1%85%D1%96%D0%BC%D0%B5%D0%B4+%D0%9C%D0%B5%D0%B4%D1%96%D0%BA%D0%B0%D0%BB%22/@50.4705986,30.5185406,18z/data=!4m6!3m5!1s0x40d4d3f7f5a65159:0x337c2360967c3ed3!8m2!3d50.470532!4d30.519643!16s%2Fg%2F11h4qrnrfh?entry=ttu'}
                                target="_blank"
                            >Дивитись в картах Google</a>
                        </div>
                    </div>

                    {/* <img className='corner-icon' src={cornerIcon}/> */}
                    <svg className='corner-icon' width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.31618 52.6095L5.19486 54.7308L9.4375 58.9735L11.5588 56.8522L7.31618 52.6095ZM56.7076 11.7034C57.8792 10.5318 57.8792 8.63228 56.7076 7.46071C55.5361 6.28914 53.6366 6.28914 52.465 7.46071L56.7076 11.7034ZM11.5588 56.8522L56.7076 11.7034L52.465 7.46071L7.31618 52.6095L11.5588 56.8522Z" fill="currentColor"/>
                        <path d="M9.4375 9.58203H54.5863V54.7308" stroke="currentColor" strokeWidth="6" strokeLinecap="square"/>
                    </svg>
                    {/* <img className='corner-icon-small' src={cornerIconSmall}/> */}
                    <svg className='corner-icon-small' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.93934 25.9393L2.87868 27L5 29.1213L6.06066 28.0607L3.93934 25.9393ZM28.0607 6.06066C28.6464 5.47487 28.6464 4.52513 28.0607 3.93934C27.4749 3.35355 26.5251 3.35355 25.9393 3.93934L28.0607 6.06066ZM6.06066 28.0607L28.0607 6.06066L25.9393 3.93934L3.93934 25.9393L6.06066 28.0607Z" fill="currentColor"/>
                        <path d="M4.71875 4.79102H27.2932V27.3654" stroke="currentColor" strokeWidth="3" strokeLinecap="square"/>
                    </svg>
                </div>

                <div className='contacts-second-block'>
                    <span className='contacts-second-block-title'>Заповніть поля</span>
                    <form>
                        <span>Ім’я</span>
                        <input placeholder='Георгій'/>
                        <span>E-mail</span>
                        <input placeholder='example@mail.com'/>
                        <span>Телефон</span>
                        <PhoneInput
                            country="ua"
                            masks={{ua: '(..) ...-..-..'}}
                            disableCountryCode={false}
                            alwaysDefaultMask={false}
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            inputClass='phone-input'
                            countryCodeEditable={false}
                        />
                        <div className='form-button'><span>надіслати</span></div>
                    </form>
                </div>
            </div>
        </section>
    )
}

function SiteInfoItem (props) {
    return(
       <div>
            <span className='site-info-subtitle'>{props.firstText}</span>
            <a href={props.href} target={props.target}>{props.secondText}</a>
       </div>
    )
}

function VideoItem ({...props}){
    return (
        <a href='https://calendly.com/d/y45-v9w-nhm/30-minute-preliminary-consultation?month=2023-06'
        target='_blank'>
       <div className='video-item'>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1443_569)">
                <path d="M15.3333 4.66663L10.6666 7.99996L15.3333 11.3333V4.66663Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.33329 3.33337H1.99996C1.26358 3.33337 0.666626 3.93033 0.666626 4.66671V11.3334C0.666626 12.0698 1.26358 12.6667 1.99996 12.6667H9.33329C10.0697 12.6667 10.6666 12.0698 10.6666 11.3334V4.66671C10.6666 3.93033 10.0697 3.33337 9.33329 3.33337Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_1443_569">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
                </defs>
            </svg>
            <span>{props.text}</span>
       </div>
       </a>
    )
}


export default ContactsBlock;