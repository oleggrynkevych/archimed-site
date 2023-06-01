import './App.css';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Services from './components/Services/Services';
import About from './components/About/About';
import Contacts from './components/Contacts/Contacts';
import Footer from './components/Footer/Footer';
import ServicePage from './components/Services/ServicePage';


function App() {

  let component
  switch (window.location.pathname) {
    case '/':
      component = <Home/>
      break
    case '/services':
      component = <Services/>
      break
    case '/about':
      component = <About/>
      break
    case '/contacts':
      component = <Contacts/>
      break
    case '/servicepage':
      component = <ServicePage/>
      break
  }
   
  return (
    <div>
      <Header/>
      {component}
      <Footer/>
    </div>
  );
}

export default App;
