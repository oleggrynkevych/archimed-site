
import React from 'react';
import './AppContent.css';
import mainLogo from '../images/logo.svg';
import Header from '../components/Header/Header';
import Home from '../components/Home/Home';
import Services from '../components/Services/Services';
import About from '../components/About/About';
import Contacts from '../components/Contacts/Contacts';
import PrivacyPolicy from '../components/Privacy Policy/PrivacyPolicy';
import SearchPage from '../components/Search/SearchPage';
import Footer from '../components/Footer/Footer';
import ErrorPage from '../components/Error/ErrorPage';
import ServicePage from '../components/Services/ServicePage';
import EthicsCode from '../components/EthicsCode/EthicsCode';
import { Route, Routes, useLocation, useNavigate, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import ScrollToTopOnPageChange from './ScrollToTopOnPageChange.js';
import { useTranslation } from 'react-i18next';
import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import { useEffect, useRef } from 'react';

const ABOUTINFO = gql`
query GetAboutPage ($locale: I18NLocaleCode) {
    aboutPage (locale: $locale) {
      data {
        attributes {
            Text1, 
            Text2,
            Text3,
            Text4,
            ButtonText,
            ButtonLink
        }
      }
    }
  }
`

const TEAMMEMBER = gql`
    query GetTeamMember ($locale: I18NLocaleCode) {
        teamMembers (locale: $locale) {
            data {
                id
                attributes {
                Comment,
                FirstName,
                Position,
                LastName,
                Order,
                Photo{
                    data{
                        attributes{
                            url
                        }
                    }
                }
            }
        }
    }
}
`
const SUBTITLE = gql`
    query GetHomePage ($locale: I18NLocaleCode) {
        homePage (locale: $locale) {
            data {
                attributes {
                    SubTitleHomePage
                }
            }
        }
    }
`

const SERVICES = gql`
    query GetServices ($locale: I18NLocaleCode) {
        services (locale: $locale, pagination: { start: 0, limit: 20 }) {
            data {
                id
                attributes {
                    Title,
                    Order,
                    slug
                }
            }
        }
    }
`


function AppContent() {
    const [loadingDiv, setLoadingDiv] = useState(false);
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const isContactsPath = location.pathname === '/contacts';

    const locale = i18n.language === 'ua' ? 'uk' : i18n.language;

    const initialLocale = useRef(locale);   

    if (!location.pathname.includes("/en") && 
        !location.pathname.includes("/ru") && 
        !location.pathname.includes("/ua")) {
      window.location.href = "/ua"; 
    } 
  
    const marginClass = 'margin-class';
    const marginSpecialClass = 'margin-special-class';

    const allowScroll = location.pathname !== window.location.pathname;
  
    const containerClassName = classnames({
      [marginClass]: !isContactsPath,
      [marginSpecialClass]: isContactsPath,
    });

    const loadingClass = classnames('loading', {
      hide: loadingDiv
    });

    const logoClass = classnames('logo', {
      hide: loadingDiv
    });

    const {loading, error, data} = useQuery(ABOUTINFO, {
      variables: { locale: locale }
    });

    const {loading: teamMemberLoading, error: teamMemberError, data: teamMemberData} = useQuery(TEAMMEMBER, {
        variables: { locale: locale }
    });

    const {loading: subtitleLoading, error: subtitleError, data: subtitleData} = useQuery(SUBTITLE, {
      variables: { locale: locale }
    });

    const {loading: servicesLoading, error: servicesError, data: servicesData} = useQuery(SERVICES, {
      variables: { locale: locale }
    });

    useEffect(function () {
      const timeout = setTimeout(function () {
        setLoadingDiv(true);
      }, 500)
      
      return function ()  {
          clearTimeout(timeout)
      }
  }, [data, servicesData, subtitleData, teamMemberData])


    if(loading || teamMemberLoading || subtitleLoading || servicesLoading) return <div className='loading-div'>
          <img src={mainLogo} alt={'Main Logo'}/>
      </div>
    if(error || teamMemberError || subtitleError || servicesError) return <p></p>

    const sortedTeamMembers = [...teamMemberData.teamMembers.data].sort((a, b) => {
        return a.attributes.Order - b.attributes.Order;
    });

    const sortedData = [...servicesData.services.data].sort((a, b) => {
      return a.attributes.Order - b.attributes.Order;
    });

    
  
    return (
    
        <div style={{position: 'relative', width: '100%'}}>

          <div className={loadingClass}>
              <img src={mainLogo} alt={'Main Logo'}/>
          </div>

          <Header i18n={i18n} navigate={navigate} location={location}/>
          <ScrollToTopOnPageChange allowScroll={allowScroll}/>
            <div className={containerClassName}>
              <Routes>
                <Route 
                  path='/:lang/' 
                  element={<Home 
                    subtitle = {subtitleData.homePage.data.attributes.SubTitleHomePage}
                    services = {sortedData}
                    loading = {loadingDiv}
                />} 
                />
                <Route 
                  path='/:lang/services' 
                  element={<Services 
                    services = {sortedData}
                  />} 
                />
                <Route path='/:lang/contacts' element={<Contacts />} />
                <Route 
                  path='/:lang/about' 
                  element={<About 
                    text1 = {data.aboutPage.data.attributes.Text1}
                    text2 = {data.aboutPage.data.attributes.Text2}
                    text3 = {data.aboutPage.data.attributes.Text3}
                    buttonText = {data.aboutPage.data.attributes.ButtonText}
                    text4 = {data.aboutPage.data.attributes.Text4}
                    sortedTeamMembers = {sortedTeamMembers}
                  />} 
                />
                <Route 
                  path='/:lang/services/:slug' 
                  element={<ServicePage
                    initialLocale={initialLocale}
                  />} 
                />
                <Route path='/:lang/privacypolicy' element={<PrivacyPolicy />} />
                <Route path='/:lang/search-page' element={<SearchPage />} />
                <Route path='/:lang/ethics-code' element={<EthicsCode />} />
                <Route path='/:lang/*' element={<ErrorPage />} />
              </Routes>
            </div>
          <Footer isSpecial={isContactsPath}/>
        </div>
     
    );
  }

  export default AppContent;