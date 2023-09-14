import './ServicePage.css';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import backIcon from '../../images/backIcon.svg';
import Carousel from './Carousel/Carousel';
import Modal from './Modal/Modal';
import { useQuery, useLazyQuery, gql } from '@apollo/client';
import useScrollToTop from '../../hooks/useScrollToTop';
import MaterialItem from './MaterialItem.js';
import { useTranslation } from 'react-i18next';
import Markdown from 'marked-react';
import ServiceForm from './ServiceForm/ServiceForm';

const SERVICE = gql`
    query GetServices ($slug: String!, $locale: I18NLocaleCode) {
        services(locale: $locale, filters: {slug: {eq: $slug}}) {
            data {
                id
                attributes {
                    Title,
                    Order,
                    locale,
                    slug,
                    Description, 
                    localizations {
                        data {
                            id
                            attributes {
                                Title,
                                Order,
                                locale,
                                slug,
                                Description 
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
                    ModalDescription
                }
            }
        }
    }
`

function ServicePage() {
    const { t, i18n } = useTranslation();
    let locale = i18n.language === 'ua' ? 'uk' : i18n.language;
   
    let { slug } = useParams();

    const [modalActive, setModalActive] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    
    const location = useLocation();
    const navigate = useNavigate();


    const initialSlug = useRef(slug);
    const initialLocale = useRef(locale);    

    const fetchServiceData = (newSlug, newLocale) => {
        getServiceData({
            variables: {
                slug: newSlug,
                locale: newLocale
            }
        });
    };
   
    const [getServiceData, { loading, error, data }] = useLazyQuery(SERVICE);

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
        fetchServiceData(slug, locale);
    }, [location.pathname]);

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

    useEffect(()=>{
        const allLinks = document.querySelectorAll('.service-description-block a');
        const allParagraphs = document.querySelectorAll('.service-description-block p');
        const allLists = document.querySelectorAll('.service-description-block ul, .service-description-block ol');
        const allTitles = document.querySelectorAll('.service-description-block h2');
        const pageTitles = document.querySelectorAll('.service-description-block h2');
        const svgArrow = document.querySelector('.svg-arrow');
        const zmist = document.querySelector('.zmist');


        allLinks.forEach((link) => {
            link.addEventListener('click', function() {
                this.setAttribute('target', '_blank');
            });
        });

        allParagraphs.forEach((paragraph) => {
            const nextElement = paragraph.nextElementSibling;
            if (nextElement && (nextElement.tagName === 'UL' || nextElement.tagName === 'OL')) {
                paragraph.style.marginBottom = '24px';
            }
        })

        allLists.forEach((list) => {
            const nextElement = list.nextElementSibling;
            if (nextElement && (nextElement.tagName === 'H2' || nextElement.tagName === 'H3')) {
                list.style.marginBottom = '40px';
            }
        })

        if (zmist !== null) {
            if (allTitles.length == 0) {
                zmist.style.paddingTop = '0';
                zmist.style.visibility = 'hidden';
            }
        }


        allTitles.forEach((title, index) => { 
            const cloneTitle = title.cloneNode(true);
            const cloneSvg = svgArrow.cloneNode(true);
            const number = (index + 1).toString().padStart(2, '0');
            const titleText = cloneTitle.innerText;
            const titleDiv = document.createElement('div');
            titleDiv.className = 'title-with-svg';

            cloneTitle.innerText = `${number}. \u00A0${cloneTitle.innerText}`;

            titleDiv.appendChild(cloneTitle);
            titleDiv.appendChild(cloneSvg);

            document.getElementById('list').append(titleDiv);


            titleDiv.addEventListener('click', () => {
                const pageTitle = Array.from(pageTitles).find((pageTitle) => pageTitle.innerText === titleText);
                if (pageTitle) {
                    pageTitle.scrollIntoView({ behavior: 'smooth' });
                }
                });
        })
    },[data]);

    useEffect(() => {
        if (data && data.services.data.length>0) {
            const localizations = data.services.data[0].attributes.localizations.data;

            const slugs = [];

            for (let i = 0; i < localizations.length; i++){
                slugs.push(
                    { 
                        "locale":localizations[i].attributes.locale,
                        "slug": localizations[i].attributes.slug
                    }
                )
            }
            localStorage.setItem("slugs", JSON.stringify(slugs))
        }
    }, [data]);

    useEffect(() => {
        const currentPath = location.pathname;
        const pathSegments = currentPath.split('/');
    
        if (locale !== initialLocale.current) {
            let newSlugsForUrl = JSON.parse(localStorage.getItem("slugs"));
            let nextServiceSlug = null;
    
            for (let i = 0; i < newSlugsForUrl.length; i++) {
                if (newSlugsForUrl && newSlugsForUrl.length > 0) {
                    if (locale === newSlugsForUrl[i].locale) {
                        nextServiceSlug = newSlugsForUrl[i].slug;
                    }
                }
            }

            if (nextServiceSlug !== null) {
                pathSegments[pathSegments.length - 1] = nextServiceSlug;
                const newPath = pathSegments.join('/');
                navigate(newPath);
                fetchServiceData(nextServiceSlug, locale);
                localStorage.clear();
            }
        } else {
            pathSegments[pathSegments.length - 1] = initialSlug.current;
            const newPath = pathSegments.join('/');
            navigate(newPath);
            fetchServiceData(initialSlug.current, locale);
            localStorage.clear();
        }
    }, [locale]);

    const scrollToTop = useScrollToTop();
    
    if(loading || additionalMaterialsLoading ) return <p></p>
    if(error || additionalMaterialsError ) return <p>{JSON.stringify(error)}</p>

    let orderSercive =  null;
    let hasMatchingMaterials = null;

    if(data && data.services.data.length>0){
        orderSercive = data.services.data[0].attributes.Order;
        hasMatchingMaterials = additionalMaterialsData && additionalMaterialsData.additionalMaterials.data.some(material => orderSercive === material.attributes.WhichService);
    }

    return (
        <div>
            <section className='service-page'>
                <div className='service-page-title'>
                    <Link to={`/${i18n.language}/services`}>
                        <div className='service-page-back-button'>
                            <img src={backIcon} alt='Back Icon'/>
                            <span>{t('service_back_link')}</span>
                        </div>
                    </Link>
                    <h1>{data && data.services.data.length>0 ? data.services.data[0].attributes.Title : ''}</h1>
                </div>

                <div className='service-page-main' >
                    <div className='service-desription'>
                        <div className='zmist'>
                            <h4>{t('zmist')}</h4>
                            <div id='list'></div>
                        </div>
                        

                        <div className='service-description-block'> 

                            <Markdown>{data && data.services.data.length>0 ? data.services.data[0].attributes.Description : ''}</Markdown>

                            <h5>{t('form_text')}</h5>
                            <ServiceForm/>
                        </div>
                    </div>
                    
                <div className='service-materials-block'>
                    {hasMatchingMaterials && (
                        <span className='service-materials-block-title'>{t('add_materials')}</span>
                    )}
                    
                    {additionalMaterialsData.additionalMaterials.data.map((material) => 
                        orderSercive == material.attributes.WhichService ? (
                            <MaterialItem
                                onClick={() => handleMaterialItemClick(material)} key={material.id}
                                title={material.attributes.Title}
                                text={material.attributes.Description}
                            />
                        ) : null
                    )}

                    <div className='service-materials-block-info'>
                        <div>
                            <span>{t('post')}</span>
                            <a href='mailto:mail@archimed.in.ua' target='_blank' rel="noreferrer">mail@archimed.in.ua</a>
                        </div>
                        <div>
                            <span>{t('phone')}</span>
                            <a href='tel:380442325252' target='_blank' rel="noreferrer">+380 (44) 232-52-52</a>
                        </div>
                    </div>

                    <div className='service-materials-button-wrapper'>
                        <div className='service-materials-button' onClick={scrollToTop}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.5 11.8611V12.3611H7.5V11.8611H6.5ZM7.5 3.69446C7.5 3.41832 7.27614 3.19446 7 3.19446C6.72386 3.19446 6.5 3.41832 6.5 3.69446H7.5ZM7.5 11.8611V3.69446H6.5V11.8611H7.5Z" fill="currentColor"/>
                                <path d="M2.91669 7.77779L7.00002 3.69446L11.0834 7.77779" stroke="currentColor" strokeLinecap="square"/>
                            </svg>
                            <span>{t('up_button')}</span>
                        </div>
                    </div>
                    
                    </div>
                </div>

                <Modal active={modalActive} setActive={setModalActive}>
                    {selectedMaterial && (
                        <>
                            <h2>{selectedMaterial.attributes.Title}</h2>
                            <Markdown>{selectedMaterial.attributes.ModalDescription}</Markdown>
                        </>
                    )}
                </Modal>

            </section>
            <Carousel textTitle={t('other_services')} slug={slug}></Carousel>

            <div className='svg-arrow'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <g opacity="0.5">
                    <path d="M9.50146 3.99992L9.50146 3.49992L8.50146 3.49992L8.50146 3.99992L9.50146 3.99992ZM8.50146 14.6065C8.50146 14.8827 8.72532 15.1065 9.00146 15.1065C9.27761 15.1065 9.50146 14.8827 9.50146 14.6065L8.50146 14.6065ZM8.50146 3.99992V14.6065L9.50146 14.6065V3.99992L8.50146 3.99992Z" fill="currentColor"/>
                    <path d="M14.3048 9.30322L9.00146 14.6065L3.69816 9.30322" stroke="currentColor" strokeLinecap="square"/>
                    </g>
                </svg>
            </div>
    </div>
    )
}

export default ServicePage;