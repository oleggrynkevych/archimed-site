
import Header from '../components/Header/Header';
import Home from '../components/Home/Home';
import Services from '../components/Services/Services';
import About from '../components/About/About';
import Contacts from '../components/Contacts/Contacts';
import PrivacyPolicy from '../components/Privacy Policy/PrivacyPolicy';
import Footer from '../components/Footer/Footer';
import ServicePage from '../components/Services/ServicePage';
import { Route, Routes, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import ScrollToTopOnPageChange from './ScrollToTopOnPageChange.js';





function AppContent() {
    const location = useLocation();
    const isContactsPath = location.pathname === '/contacts';
  
    const marginClass = 'margin-class';
    const marginSpecialClass = 'margin-special-class';
  
    const containerClassName = classnames({
      [marginClass]: !isContactsPath,
      [marginSpecialClass]: isContactsPath,
    });
  
    return (
    
        <div>
          <Header />
          <ScrollToTopOnPageChange/>
            <div className={containerClassName}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/services' element={<Services />} />
                <Route path='/contacts' element={<Contacts />} />
                <Route path='/about' element={<About />} />
                <Route path='/services/:id' element={<ServicePage />} />
                <Route path='/privacypolicy' element={<PrivacyPolicy />} />
              </Routes>
            </div>
          <Footer isSpecial={isContactsPath}/>
        </div>
     
    );
  }

  export default AppContent;