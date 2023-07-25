import './ServicePage.css';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import backIcon from '../../images/backIcon.svg';
import certificatePhoto from '../../images/certificate-photo.png';
import PhoneInput from "react-phone-input-2";
import Carousel from './Carousel/Carousel';
import Modal from './Modal/Modal';
import { useQuery, gql } from '@apollo/client';
import useScrollToTop from '../../hooks/useScrollToTop';
import MaterialItem from './MaterialItem.js';

const SERVICE = gql`
    query GetServices($id: ID!) {
        service(id: $id) {
            data {
                id
                attributes {
                    Title,
                    Order,
                    Description{
                        ${Array.from({ length: 45 }, (_, i) => `Text${i + 1}`).join('\n')}
                    }
                    
                }
            }
        }
    }
`

const ADDITIONALMATERIAL = gql`
    query AdditionalMaterial {
        additionalMaterials {           
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

    function handleSubmit(event) {
        event.preventDefault();
    }

    const {id} = useParams();

    const {loading, error, data} = useQuery(SERVICE, {
        variables: {id: id}
    });

    const {loading: additionalMaterialsLoading, error: additionalMaterialsError, data: additionalMaterialsData} = useQuery(ADDITIONALMATERIAL);

    const handleMaterialItemClick = (material) => {
        setSelectedMaterial(material);
        setModalActive(true);
    };

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

    useEffect( ()=>{
        const strapiDomain = "http://localhost:1337";
        const modalImage = document.querySelector('.modal-content-container img');
        
        if (selectedMaterial && modalImage) {
            const currentSrc = modalImage.getAttribute('src');

            if (!currentSrc.startsWith('http://localhost:1337')) {
                modalImage.setAttribute('src', strapiDomain + currentSrc);
            }
        }
        
    }, [selectedMaterial])

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

    const scrollToTop = useScrollToTop();
    
    if(loading || additionalMaterialsLoading) return <p></p>
    if(error || additionalMaterialsError) return <p></p>

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
                    
                    {/* <h4>Реєстрація косметичних продуктів</h4>
                    <span>Косметичні продукти</span>
                    <p>До косметичних продуктів відносяться наступні продукти:</p>
                    <ul>
                        <li>засоби для догляду (крему, сиворотки, маски, бальзами, лосьйони, тоніки, серуми і тд.)</li>
                        <li>декоративна косметика</li>
                        <li>дитяча косметика, так само косметика по догляду за дітьми</li>
                        <li>космецевтика (в залежності від складу і наявності певних рекомендацій)</li>
                        <li>засоби по догляду за волоссям (шампуні, маски, масла, кондиціонери і тд.)</li>
                        <li>засоби для очищення шкіри (гелі для душу, мило, пінки, скраби і тд.)</li>
                        <li>препарати на основі крові та плазми</li>
                    </ul>
                    <div className='certificate-photo'>
                        <img src={certificatePhoto} alt='Sertificate'/>
                    </div>
                    <p className='p-special'>Для ввезення та реалізації косметичних продуктів необхідно пройти реєстрацію і отримати висновок санітарно-епідеміологічної експертизи (СЕС). Видачу даних висновків здійснює ДержПродСлужба.</p>
                    <p>Реєстрація косметики складається з двох етапів: документальна експертиза та випробування зразків. Функції з проведення експертизи покладені на акредитовані спеціалізовані організації. Термін реєстрації з моменту подачі документації і зразків становить близько 4-х тижнів. В результаті реєстрації видається звіт терміном дії-5 років.</p>
                    <p>Компанія Архімед має великий досвід в проведенні реєстрації косметичних продуктів і готова запропонувати Вам реєстрацію «під ключ», та усі необхідні додаткові послуги:</p>
                    <ul>
                        <li>підготовка тексту маркування, згідно з чинними законодавчими актам</li>
                        <li>переклад та нотаріальне копіювання документації</li>
                        <li>супровід при ввезенні зразків для реєстрації</li>
                    </ul>
                    <p>А також всі необхідні консультації.</p>
                    <p>Більш детальну консультацію можна отримати, написавши нам короткий запит або зателефонувавши за номером, вказаним нижче.</p> */}
                </Modal>

            </section>
            <Carousel textTitle={'інші послуги'} id={id}></Carousel>
    </div>

        
    )
}

export default ServicePage;