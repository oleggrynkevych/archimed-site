import './ContactsBlock.css';
import videoLogo from '../../../../images/video-logo.svg';
import mapIcon from '../../../../images/map-icon-color.svg';
import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { useQuery, gql } from '@apollo/client';
import SiteInfoItem from './SiteInfoItem.js';
import VideoItem from './VideoItem';
import { useTranslation } from 'react-i18next';
import {useForm} from 'react-hook-form';
import classnames from 'classnames';


const INFO = gql`
    query GetFooter ($locale: I18NLocaleCode){
        footer (locale: $locale) {
            data {
                attributes {
                    Email,
                    TelephoneNumber,
                    Adress,
                    AdressLink
                }
            }
        }
    }
`


function ContactsBlock ({commonStyle}) {
    const { t, i18n } = useTranslation();
    const locale = i18n.language === 'ua' ? 'uk' : i18n.language;

    const {loading, error, data} = useQuery(INFO, {
        variables: { locale: locale }
    });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState(false);

    const {handleSubmit, register, formState: {errors}} = useForm();

    const phonePattern = /^[0-9]{12}$/;

    const validatePhone = (value) => {
        if (!value || !phonePattern.test(value)) {
            setPhoneError(true);
        } else {
            setPhoneError(false);
        }
    };

    const handlePhoneChange = (value) => {
        setPhone(value);
        validatePhone(value);
    };

    const onSubmit = values => console.log(values);

    if(loading) return <p></p>
    if(error) return <p></p>

    console.log(data);

    return(
        <section className='contacts-block' style={commonStyle}>
            <div className='contacts-block-container'>
                <div className='contacts-first-block'>
                    <span>{t('contact_form')}</span>
                    <span>{t('contact_with_us')}</span>
                    <span>{t('contact_subtitle')}</span>
                    <span>{t('contact_video_subtitle')}</span>

                    <div className='video-item-block'>
                        <VideoItem src={videoLogo} text={'Запланувати'}/>
                        
                    </div>

                    <div className='contacts-block-for-mobile'>
                        <span>{t('contact_video_subtitle')}</span>
                        <span>{t('available_at')}</span>
                        <div className='video-item-block-mobile'>
                            <VideoItem src={videoLogo} text={'Запланувати'}/>
                            
                        </div>
                    </div>

                    <div className='footer-site-info'>
                        <SiteInfoItem href={`mailto:${data.footer.data.attributes.Email}`} target={"_blank"} firstText={'пошта'} secondText={data.footer.data.attributes.Email}/>
                        <SiteInfoItem href={`tel:${data.footer.data.attributes.TelephoneNumber}`} target={"_blank"} firstText={'телефон'} secondText={data.footer.data.attributes.TelephoneNumber}/>
                        <SiteInfoItem 
                            href={data.footer.data.attributes.AdressLink}                            
                            target={"_blank"}
                            rel="noreferrer"
                            firstText={'адреса'} 
                            secondText={data.footer.data.attributes.Adress}/>
                        <div className='footer-map'>
                            <img src={mapIcon} alt="Map Icon"></img>
                            <a 
                                href={data.footer.data.attributes.AdressLink}                                
                                target="_blank"
                                rel="noreferrer"
                            >{t('google_map_text')}</a>
                        </div>
                    </div>

                    
                    <svg className='corner-icon' width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.31618 52.6095L5.19486 54.7308L9.4375 58.9735L11.5588 56.8522L7.31618 52.6095ZM56.7076 11.7034C57.8792 10.5318 57.8792 8.63228 56.7076 7.46071C55.5361 6.28914 53.6366 6.28914 52.465 7.46071L56.7076 11.7034ZM11.5588 56.8522L56.7076 11.7034L52.465 7.46071L7.31618 52.6095L11.5588 56.8522Z" fill="currentColor"/>
                        <path d="M9.4375 9.58203H54.5863V54.7308" stroke="currentColor" strokeWidth="6" strokeLinecap="square"/>
                    </svg>
                    
                    <svg className='corner-icon-small' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.93934 25.9393L2.87868 27L5 29.1213L6.06066 28.0607L3.93934 25.9393ZM28.0607 6.06066C28.6464 5.47487 28.6464 4.52513 28.0607 3.93934C27.4749 3.35355 26.5251 3.35355 25.9393 3.93934L28.0607 6.06066ZM6.06066 28.0607L28.0607 6.06066L25.9393 3.93934L3.93934 25.9393L6.06066 28.0607Z" fill="currentColor"/>
                        <path d="M4.71875 4.79102H27.2932V27.3654" stroke="currentColor" strokeWidth="3" strokeLinecap="square"/>
                    </svg>
                </div>

                <div className='contacts-border'></div>

                <div className='contacts-second-block'>
                    <span className='contacts-second-block-title'>{t('fill_fields')}</span>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <span>{t('name_form')}</span>
                        
                        <input className={classnames({ 'has-error': errors.name })}
                            {...register("name", 
                                {required: t('validation_message_default'), 
                                 pattern:{
                                    value: /^[a-zA-Zа-яА-ЯЁё ,.'-]{3,}$/,
                                    message: t('validation_message_default'),
                                }
                            })}
                            type="text"
                            placeholder='Георгій'                              
                            onBlur={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <p className={classnames({ 'has-error': errors.name })}>{t('validation_message_name')}</p>

                        <span>E-mail</span>
                        <input className={classnames({ 'has-error': errors.email})}
                            {...register("email", 
                            {required: t('validation_message_email'), 
                            pattern:{
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: t('validation_message_email'),
                            }
                            })}
                            placeholder='example@mail.com'
                            onBlur={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <p className={classnames({ 'has-error': errors.email})}>{t('validation_message_email')}</p>

                        <span>{t('phone_form')}</span>
                        <PhoneInput
                            country="ua"
                            masks={{ ua: '(..) ...-..-..' }}
                            disableCountryCode={false}
                            alwaysDefaultMask={false}
                            inputClass={classnames('phone-input', { 'has-error': phoneError })}
                            countryCodeEditable={false}
                            value={phone} 
                            onChange={handlePhoneChange}
                        />
                        <p className={classnames({ 'has-error': phoneError })}>{t('validation_message_phone')}</p>
                        <button className='form-button'><span>{t('send_form')}</span></button>
                    </form>
                </div>
            </div>
        </section>
    )
}


export default ContactsBlock;