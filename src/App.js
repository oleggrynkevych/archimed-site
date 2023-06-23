import './App.css';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Services from './components/Services/Services';
import About from './components/About/About';
import Contacts from './components/Contacts/Contacts';
import Footer from './components/Footer/Footer';
import { Route, Routes, useLocation, BrowserRouter } from 'react-router-dom';
import ServicePage from './components/Services/ServicePage';
import React, { useEffect} from 'react';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function ScrollToTopOnPageChange() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({top: 0, behavior: "instant"});
  }, [location.pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isContactsPath = location.pathname === '/contacts';

  return (
    <div>
      <Header />
      <ScrollToTopOnPageChange/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/about" element={<About />} />
        <Route path="/servicepage" element={<ServicePage />} />
      </Routes>
      <div className={isContactsPath ? 'special-footer' : ''}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
