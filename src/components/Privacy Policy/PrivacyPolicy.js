import Iframe from 'react-iframe';
import './PrivacyPolicy.css'

function PrivacyPolicy(){
    return(
        <div className='privacy-policy'>
            <Iframe url="https://docs.google.com/document/d/17qLvF2JpQj4czj81UNIe0GKISQyvFP6K2FSK8mAS998/preview" />        
        </div>
    )
}

export default PrivacyPolicy;