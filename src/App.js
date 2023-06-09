import './App.css';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Services from './components/Services/Services';
import About from './components/About/About';
import Contacts from './components/Contacts/Contacts';
import Footer from './components/Footer/Footer';
import { Route, Routes, useLocation, BrowserRouter } from 'react-router-dom';
import ServicePage from './components/Services/ServicePage';

function App() {
  return (
    <BrowserRouter basename="/archimed-site">
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const isContactsPath = location.pathname === '/contacts';

  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
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
