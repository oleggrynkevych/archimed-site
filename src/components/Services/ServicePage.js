import './ServicePage.css';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import backIcon from '../../images/backIcon.svg';
import PhoneInput from "react-phone-input-2";
import Carousel from './Carousel/Carousel';
import Modal from './Modal/Modal';
import { useQuery, gql } from '@apollo/client';
import useScrollToTop from '../../hooks/useScrollToTop';
import MaterialItem from './MaterialItem.js';
import { useTranslation } from 'react-i18next';

const SERVICE = gql`
    query GetServices($locale: I18NLocaleCode, $id: ID!) {
        service(locale: $locale, id: $id) {
            data {
                id
                attributes {
                    Title,
                    Order,
                    locale,
                    Description {
                        ${Array.from({ length: 45 }, (_, i) => `Text${i + 1}`).join('\n')}
                    }
                    localizations {
                        data {
                            id
                            attributes {
                                Title,
                                Order,
                                locale,
                                Description {
                                    ${Array.from({ length: 45 }, (_, i) => `Text${i + 1}`).join('\n')}
                                }
                            }
                        }
                    }
                }
              }
        }
    }
`

const ADDITIONALMATERIAL = gql`
    query AdditionalMaterial ($locale: I18NLocaleCode) {
        additionalMaterials (locale: $locale) {           
            data {
                id
                attributes {
                    WhichService,
                    Title,
                    Description,
                    ModalDescription {
                        ${Array.from({ length: 30 }, (_, i) => `Text${i + 1}`).join('\n')}
                    }
                }
            }
        }
    }
`

function ServicePage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [modalActive, setModalActive] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [nextServiceId, setNextServiceId] = useState();

    const { t, i18n } = useTranslation();
    const locale = i18n.language === 'ua' ? 'uk' : i18n.language;

    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const initialId = useRef(id);
    const initialLocale = useRef(locale);

    const {loading, error, data} = useQuery(SERVICE, {
        variables: 
            {
                locale: locale,
                id: id
            }
    });

    const {loading: additionalMaterialsLoading, error: additionalMaterialsError, data: additionalMaterialsData} = useQuery(ADDITIONALMATERIAL, {
        variables: { locale: locale }
    });

    const handleMaterialItemClick = (material) => {
        setSelectedMaterial(material);
        setModalActive(true);
    };

    function handleSubmit(event) {
        event.preventDefault();
    }

    useEffect(() => {
        if (modalActive) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'unset';
        }
    
        return () => {
          document.body.style.overflow = 'unset';
        };
    }, [modalActive]);

    // useEffect( ()=>{
    //     const modalImage = document.querySelector('.modal-content-container img');
        
    //     if (selectedMaterial && modalImage) {
    //         const currentSrc = modalImage.getAttribute('src');
        
    //     }
        
    // }, [selectedMaterial])

    useEffect(()=>{
        const allLinks = document.querySelectorAll('.service-description-block a');
        const allTitles = document.querySelectorAll('.service-description-block h2');
        const pageTitles = document.querySelectorAll('.service-description-block h2');

        allLinks.forEach((link) => {link.addEventListener('click', function(){
            this.setAttribute('target', '_blank');
        })})

        allTitles.forEach((title, index) => { 
            const cloneTitle = title.cloneNode(true);
            const number = (index + 1).toString().padStart(2, '0');
            const titleText = cloneTitle.innerText;
            cloneTitle.innerText = `${number}. \u00A0${cloneTitle.innerText}`;
            document.getElementById('list').append(cloneTitle);

            cloneTitle.addEventListener('click', () => {
                const pageTitle = Array.from(pageTitles).find((pageTitle) => pageTitle.innerText === titleText);
                if (pageTitle) {
                    pageTitle.scrollIntoView({ behavior: 'smooth' });
                }
                });
        })
    },[data]);

    useEffect(() => {
        if (data) {
            const {localizations} = data.service.data.attributes;

            const nextLocalization = localizations.data.find(localization => localization.attributes.locale === locale);
            const nextId = nextLocalization ? nextLocalization.id : null;
            
            if (nextId && locale !== initialLocale.current) {
                setNextServiceId(nextId);
            } 
        }

        if (locale === initialLocale.current) {
            setNextServiceId(initialId.current);
        }
    }, [data, locale]);

    useEffect(() => {
        const currentPath = location.pathname;
        console.log(currentPath)
       
        if (nextServiceId) {
            const pathSegments = currentPath.split('/');
            const lastSegment = pathSegments[pathSegments.length - 1];
    
            if (!isNaN(lastSegment)) {
              pathSegments[pathSegments.length - 1] = nextServiceId.toString();
              const newPath = pathSegments.join('/');
      
              navigate(newPath);
            }
          }
    }, [nextServiceId])

    const scrollToTop = useScrollToTop();
    
    if(loading || additionalMaterialsLoading ) return <p></p>
    if(error || additionalMaterialsError ) return <p></p>
    console.log(data);

    const orderSercive = data.service.data.attributes.Order;
    const hasMatchingMaterials = additionalMaterialsData && additionalMaterialsData.additionalMaterials.data.some(material => orderSercive === material.attributes.WhichService);

    return (
        <div>
            <section className='service-page'>
                <div className='service-page-title'>
                    <Link to='/services'>
                        <div className='service-page-back-button'>
                            <img src={backIcon} alt='Back Icon'/>
                            <span>всі послуги</span>
                        </div>
                    </Link>
                    <h1>{data.service.data.attributes.Title}</h1>
                </div>

                <div className='service-page-main' >
                    <div className='service-desription'>
                        <div className='zmist'>
                            <h4>Зміст</h4>
                            <div id='list'></div>
                        </div>
                        

                        <div className='service-description-block'> 

                            {Object.values(data.service.data.attributes.Description).map((text, index) => (
                                index > 0 && (
                                    <div key={index} dangerouslySetInnerHTML={{ __html: decodeURI(text) }} />
                                )
                            ))}

                            <h5>Заповніть форму і ми зв’яжемось з вами</h5>
                            <form className='service-page-form' onSubmit={handleSubmit}>
                                <span>Ім’я</span>
                                <input 
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='Георгій'/>
                                <span>E-mail</span>
                                <input 
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='example@mail.com'/>
                                <span>Телефон</span>
                                <PhoneInput
                                    country="ua"
                                    masks={{ua: '(..) ...-..-..'}}
                                    disableCountryCode={false}
                                    alwaysDefaultMask={false}
                                    countryCodeEditable={false}
                                    value=''
                                    inputClass='phone-input'
                                    onChange={(value) => setPhone(value)}
                                />
                                <button className='form-button'><span>надіслати</span></button>
                            </form>
                        </div>
                    </div>
                    
                <div className='service-materials-block'>
                    {hasMatchingMaterials && (
                        <span className='service-materials-block-title'>Додаткові матеріали</span>
                    )}
                    
                    {additionalMaterialsData.additionalMaterials.data.map((material) => 
                        orderSercive == material.attributes.WhichService ? (
                            <MaterialItem
                                onClick={() => handleMaterialItemClick(material)}                                key={material.id}
                                title={material.attributes.Title}
                                text={material.attributes.Description}
                            />
                        ) : null
                    )}

                    <div className='service-materials-block-info'>
                        <div>
                            <span>пошта</span>
                            <a href='mailto:mail@archimed.in.ua' target='_blank' rel="noreferrer">mail@archimed.in.ua</a>
                        </div>
                        <div>
                            <span>телефон</span>
                            <a href='tel:380442325252' target='_blank' rel="noreferrer">+380 (44) 232-52-52</a>
                        </div>
                    </div>

                    <div className='service-materials-button-wrapper'style={!hasMatchingMaterials ? {marginTop: '500px'} : null}>
                        <div className='service-materials-button' onClick={scrollToTop}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.5 11.8611V12.3611H7.5V11.8611H6.5ZM7.5 3.69446C7.5 3.41832 7.27614 3.19446 7 3.19446C6.72386 3.19446 6.5 3.41832 6.5 3.69446H7.5ZM7.5 11.8611V3.69446H6.5V11.8611H7.5Z" fill="currentColor"/>
                                <path d="M2.91669 7.77779L7.00002 3.69446L11.0834 7.77779" stroke="currentColor" strokeLinecap="square"/>
                            </svg>
                            <span>наверх</span>
                        </div>
                    </div>
                    
                    </div>
                </div>

                <Modal active={modalActive} setActive={setModalActive}>
                    {selectedMaterial && (
                        <>
                        {Object.values(selectedMaterial.attributes.ModalDescription).map((text, index) => (
                            index > 0 && (
                            <div key={index} dangerouslySetInnerHTML={{ __html: decodeURI(text) }} />
                            )
                        ))}
                        </>
                    )}
                </Modal>

            </section>
            <Carousel textTitle={'інші послуги'} id={id}></Carousel>
    </div>
    )
}

export default ServicePage;