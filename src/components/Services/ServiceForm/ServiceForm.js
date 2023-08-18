import React, { useState, useEffect, useRef } from "react";
import {useForm} from 'react-hook-form';
import {gql, useMutation } from '@apollo/client';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import PhoneInput from "react-phone-input-2";
import{ phones } from '../../Home/HomeComponents/ContactsBlock/phones';




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


function ServiceForm() {
    const form = useRef();
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    const [countryCode, setCountryCode] = useState('ua');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [authToken, setAuthToken] = useState('');

    const { t, i18n } = useTranslation();
    const {handleSubmit, register, formState: {errors}} = useForm();
    
    const [login] = useMutation(LOGIN_MUTATION);
    const [createRequest] = useMutation(CREATE_REQUEST);

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
        sendEmail(e);
        e.target.reset();
        setPhone(countryCode);
        setPhoneError(false);
    };

    return(
        <form className='service-page-form' ref={form} onSubmit={handleSubmit(onSubmit)}>
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
            <PhoneInput
                inputProps={{
                name: 'phone'
                }}
                country={countryCode}
                masks={{ ua: '(..) ...-..-..' }}
                disableCountryCode={false}
                alwaysDefaultMask={false}
                inputClass={classnames('phone-input', { 'has-error': phoneError })}
                countryCodeEditable={false}
                value={phone} 
                onChange={handlePhoneChange}
            />
            <p className={classnames({ 'has-error': phoneError })}>{t('validation_message_phone')}</p>
            <button className='form-button' type="submit" disabled={phoneError || phone == ''}><span>{t('send_form')}</span></button>
        </form>
    )
}

export default ServiceForm;