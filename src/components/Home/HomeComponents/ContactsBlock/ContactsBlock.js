import './ContactsBlock.css';
import googleMeetsIcon from '../../../../images/google-meets-icon.svg';
import zoomIcon from '../../../../images/zoom-icon.svg';
import microsoftTeamsIcon from '../../../../images/microsoft-teams-icon.svg';
import cornerIcon from '../../../../images/corner-icon.svg';
import mapIcon from '../../../../images/map-icon-color.svg';
import cornerIconSmall from '../../../../images/corner-icon-small.svg';
import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";


function ContactsBlock ({commonStyle}) {
    function SiteInfoItem (props) {
        return(
           <div>
                <span className='site-info-subtitle'>{props.firstText}</span>
                <a href={props.href} target={props.target}>{props.secondText}</a>
           </div>
        )
    }

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
                    <span>ми доступні в</span>
                    <div className='video-item-block'>
                        <VideoItem src={googleMeetsIcon} text={'Google meet'}/>
                        <VideoItem src={zoomIcon} text={'Zoom'}/>
                        <VideoItem src={microsoftTeamsIcon} text={'Microsoft teams'}/>
                    </div>

                    <div className='contacts-block-for-mobile'>
                        <span>або заплануйте відео-зустріч</span>
                        <span>ми доступні в</span>
                        <div className='video-item-block-mobile'>
                            <VideoItem src={googleMeetsIcon} text={'Google meet'}/>
                            <VideoItem src={zoomIcon} text={'Zoom'}/>
                            <VideoItem src={microsoftTeamsIcon} text={'Microsoft teams'}/>
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
                            masks={{ua: '(..) ..-..-..'}}
                            disableCountryCode={false}
                            alwaysDefaultMask={false}
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            inputClass='phone-input'
                        />
                        <div className='form-button'><span>надіслати</span></div>
                    </form>
                </div>
            </div>
        </section>
    )
}

function VideoItem ({...props}){
    return (
       <div className='video-item'>
            <img src={props.src}/>
            <span>{props.text}</span>
       </div>
    )
}


export default ContactsBlock;