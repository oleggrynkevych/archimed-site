import './App.css';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Services from './components/Services/Services';
import About from './components/About/About';
import Contacts from './components/Contacts/Contacts';
import Footer from './components/Footer/Footer';
import { Route, Routes, useLocation, BrowserRouter } from 'react-router-dom';



function App() {
  const location = useLocation();
  const isContactsPath = location.pathname === '/contacts';
   
  return (
    <div>
      <Header/>
      <BrowserRouter basename='/archimed-site'>
        <Routes>
          <Route exact path='/archimed-site' element={<Home/>}></Route>
          <Route path='/services' element={<Services/>}></Route>
          <Route path='/contacts' element={<Contacts/>}></Route>
          <Route path='/about' element={<About/>}></Route>
        </Routes>
      </BrowserRouter>
      <div className={isContactsPath ? 'special-footer' : ''}>
        <Footer/>
      </div>
      
    </div>
  );
}

export default App;
