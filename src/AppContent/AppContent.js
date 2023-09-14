
import React from 'react';
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



function AppContent() {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const isContactsPath = location.pathname === '/contacts';

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
  
    return (
    
        <div>
          <Header i18n={i18n} navigate={navigate} location={location}/>
          <ScrollToTopOnPageChange allowScroll={allowScroll}/>
            <div className={containerClassName}>
              <Routes>

                <Route path='/:lang/' element={<Home />} />
                <Route path='/:lang/services' element={<Services />} />
                <Route path='/:lang/contacts' element={<Contacts />} />
                <Route path='/:lang/about' element={<About />} />
                <Route path='/:lang/services/:slug' element={<ServicePage />} />
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