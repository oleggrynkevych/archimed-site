import mapIcon from '../../images/map-icon.svg';
import {Link} from 'react-router-dom';
import {dataNav} from './footer-data.js';
import { useQuery, gql } from '@apollo/client';
import './Footer.css';
import useScrollToTop from '../../hooks/useScrollToTop';
import SiteInfoItem from './SiteInfoItem.js';
import { useTranslation } from 'react-i18next';
import Markdown from 'marked-react';


const INFO = gql`
    query GetFooter ($locale: I18NLocaleCode) {
        footer (locale: $locale) {
            data {
                attributes {
                    Email,
                    TelephoneNumber,
                    Adress,
                    AdressLink, 
                    SocialMedia,
                }
            }
        }
    }
`

function Footer ({ isSpecial }) {
    const { t, i18n } = useTranslation();
    const locale = i18n.language === 'ua' ? 'uk' : i18n.language;

    const {loading, error, data} = useQuery(INFO, {
        variables: { locale: locale }
    });

    const specialClass = isSpecial ? 'special-footer' : '';

    const scrollToTop = useScrollToTop();

    if(loading) return <p></p>
    if(error) return <p></p>
    
    return (
        <footer className={specialClass}>
            <div className='footer-container'>
                <div className='footer-head'>
                    <span>{t('footer-title')}</span>
                    <div onClick={scrollToTop}>
                        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.25 24.25V25H14.75V24.25H16.25ZM14.75 6.75C14.75 6.33579 15.0858 6 15.5 6C15.9142 6 16.25 6.33579 16.25 6.75H14.75ZM14.75 24.25V6.75H16.25V24.25H14.75Z" fill="currentColor"/>
                            <path d="M20.5 11.75L15.5 6.75L10.5 11.75" stroke='currentColor' strokeWidth="1.5" strokeLinecap="square"/>
                        </svg>
                    </div>
                </div>
                <div className='footer-main'>
                    <div className='footer-site-info'>
                        <SiteInfoItem href={`mailto:${data.footer.data.attributes.Email}`} target={"_blank"} rel={"noopener"} firstText={t('post')} secondText={data.footer.data.attributes.Email}/>
                        <SiteInfoItem href={`tel:${data.footer.data.attributes.TelephoneNumber}`} target={"_blank"} rel={"noopener"} firstText={t('phone')} secondText={data.footer.data.attributes.TelephoneNumber}/>
                        <SiteInfoItem 
                            href={data.footer.data.attributes.AdressLink} 
                            target={"_blank"}
                            rel={"noopener"}
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

                    <div className='footer-nav-and-socmedia'>
                        <div className='footer-nav'>
                            <span className='footer-subtitle'>{t('nav')}</span>
                            <ul>
                            {dataNav.map((item, index) => (
                                <li key={index}>
                                    {item.to.startsWith("https") ? (
                                    <a href={item.to} target={item.target}>
                                       {t(item.label)}
                                    </a>
                                    ) : (
                                    <Link to={`/${i18n.language}${item.to}`}>
                                        {t(item.label)}
                                    </Link>
                                    )}
                                </li>
                            ))}
                            </ul>
                        </div>
                        <div className='footer-socmedia'>
                            <span className='footer-subtitle'>{t('social')}</span>
                            <div>
                                <Markdown>{data.footer.data.attributes.SocialMedia}</Markdown>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='footer-bottom'>
                    <span className={
                        i18n.language == 'en' ? 'en-footer-span'
                        : i18n.language == 'ru' ? 'ru-footer-span'
                        : 'ua-footer-span'
                    }>{t('rights')}</span>
                    <Link to={`/${i18n.language}/privacypolicy`}>{t('privacy_policy')}</Link>
                    <a href='https://www.instagram.com/vania_gun/' target='_blank'>{t('developed_by')}</a>
                </div>
                <div></div>
            </div>
        </footer>
    )
}

export default Footer;