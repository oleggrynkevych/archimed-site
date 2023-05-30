import './ContactsBlock.css';
import googleMeetsIcon from '../../../../images/google-meets-icon.svg';
import zoomIcon from '../../../../images/zoom-icon.svg';
import microsoftTeamsIcon from '../../../../images/microsoft-teams-icon.svg';
import cornerIcon from '../../../../images/corner-icon.svg';
import cornerIconSmall from '../../../../images/corner-icon-small.svg';
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

                    <img className='corner-icon' src={cornerIcon}/>
                    <img className='corner-icon-small' src={cornerIconSmall}/>
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