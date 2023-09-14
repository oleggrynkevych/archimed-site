import './ContactsBlock.css';
import videoLogo from '../../../../images/video-logo.svg';
import mapIcon from '../../../../images/map-icon-color.svg';
import React, { useState, useEffect, useRef } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import {phones} from './phones.js';
import { useQuery, gql, useMutation } from '@apollo/client';
import SiteInfoItem from './SiteInfoItem.js';
import VideoItem from './VideoItem';
import { useTranslation } from 'react-i18next';
import {useForm, Controller} from 'react-hook-form';
import classnames from 'classnames';
import emailjs from '@emailjs/browser';

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

export const CREATE_REQUEST = gql`
  mutation CreateRequest($data: RequestInput!) {
    createRequest(data: $data) {
      data {
        id
        attributes {
          Name
          EMail
          Telephone
          publishedAt
        }
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
    }
  }
`;


function ContactsBlock ({commonStyle}) {
    const [authToken, setAuthToken] = useState('');
    const [countryCode, setCountryCode] = useState('ua');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState(false);

    const { t, i18n } = useTranslation();
    const locale = i18n.language === 'ua' ? 'uk' : i18n.language;
    const form = useRef();

    const {loading, error, data} = useQuery(INFO, {
        variables: { locale: locale }
    });

    const [login] = useMutation(LOGIN_MUTATION);
    const [createRequest] = useMutation(CREATE_REQUEST);

    const {handleSubmit, register, control, formState: {errors}} = useForm();
    
    const validatePhone = (value, country) => {
        if (!value || !countryCode) {
          setPhoneError(true);
          return;
        }
        
        const phonePattern = phones[country];
      
        if (!phonePattern || !phonePattern.test(value)) {
          setPhoneError(true);
        } else {
          setPhoneError(false);
        }
    };

    const handlePhoneChange = (value, country) => {
        setPhone(value);
        const phoneNumber = value.replace(/[^\d]/g, '');
        validatePhone(phoneNumber, country.countryCode
            );
        setCountryCode(country.dialCode);
    };

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_4z9bkgm', 'template_ijtb4pp', form.current, 'Bre4mNFxUF0ygljp-')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

    useEffect(() => {
        const loginUser = async () => {
          try {
            const { data } = await login({
              variables: {
                input: {
                  identifier: 'ArchimedAdmin',
                  password: 'ArchimedSite2023',
                },
              },
            });
      
            const token = data.login.jwt;
            setAuthToken(token);
          } catch (error) {
            console.error('Error:', error);
          }
        };
      
        loginUser();
    }, []);
      

    const onSubmit = async (formData, e) => {

      if(phoneError) {
        return;
      }
      
      sendEmail(e);
      e.target.reset();
      setPhone(countryCode);
      

      try {
          const { data } = await createRequest({
              variables: {
                data: {
                    Name: formData.name,
                    EMail: formData.email,
                    Telephone: phone,
                    publishedAt: new Date().toISOString(),
                },
              },
              context: {
                headers: {
                  authorization: authToken ? `Bearer ${authToken}` : '',
                },
              },
            });
        }catch (error) {
          console.error('Error:', JSON.stringify(error));
      }
    };

    if(loading) return <p></p>
    if(error) return <p></p>

    return(
        <section className='contacts-block' style={commonStyle}>
            <div className='contacts-block-container'>
                <div className='contacts-first-block'>
                    <span>{t('contact_form')}</span>
                    <span>{t('contact_with_us')}</span>
                    <span>{t('contact_subtitle')}</span>
                    <span style={i18n.language == 'en' ? {marginTop: '242px'} : {marginTop: '182px'}}>{t('contact_video_subtitle')}</span>

                    <div className='video-item-block'>
                        <VideoItem src={videoLogo} text={t('schedule')}/>
                        
                    </div>

                    <div className='contacts-block-for-mobile'>
                        <span>{t('contact_video_subtitle')}</span>
                        <span>{t('available_at')}</span>
                        <div className='video-item-block-mobile'>
                            <VideoItem src={videoLogo} text={t('schedule')}/>
                            
                        </div>
                    </div>

                    <div className='footer-site-info'>
                        <SiteInfoItem href={`mailto:${data.footer.data.attributes.Email}`} target={"_blank"} firstText={t('post')} secondText={data.footer.data.attributes.Email}/>
                        <SiteInfoItem href={`tel:${data.footer.data.attributes.TelephoneNumber}`} target={"_blank"} firstText={t('phone')} secondText={data.footer.data.attributes.TelephoneNumber}/>
                        <SiteInfoItem 
                            href={data.footer.data.attributes.AdressLink}                            
                            target={"_blank"}
                            rel="noreferrer"
                            firstText={t('adress')} 
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
                    <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                        <span>{t('name_form')}</span>
                        
                        <input className={classnames({ 'has-error': errors.name })}
                            {...register("name", 
                                {required: t('validation_message_default'), 
                                 pattern:{
                                    value: /^[a-zA-Zа-яА-ЯЁёієїґ ,.'-]{3,}$/,
                                    message: t('validation_message_default'),
                                }
                            })}
                            type="text"
                            placeholder={t('name_placeholder')}                          
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
                        <Controller
                          control={control}
                          name="phone"
                          rules={{
                            required: t('validation_message_phone'),
                          }}
                          render={({ field: { ref, ...field } }) => (
                            <PhoneInput
                              {...field}
                              inputExtraProps={{
                                ref,
                              }}
                              inputProps={{
                                name: 'phone'
                              }}
                              country={countryCode}
                              masks={{ ua: '(..) ...-..-..' }}
                              disableCountryCode={false}
                              alwaysDefaultMask={false}
                              inputClass={classnames('phone-input', { 'has-error': errors.phone || phoneError })}
                              countryCodeEditable={false}
                              value={phone} 
                              onChange={(value, country) => {
                                handlePhoneChange(value, country);
                                field.onChange(value); 
                              }}
                            />
                            )}
                          />
                        <p className={classnames({ 'has-error': errors.phone || phoneError })}>{t('validation_message_phone')}</p>
                        <button className='form-button' type="submit"><span>{t('send_form')}</span></button>
                    </form>
                </div>
            </div>
        </section>
    )
}


export default ContactsBlock;