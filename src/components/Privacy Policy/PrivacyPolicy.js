import Iframe from 'react-iframe';
import './PrivacyPolicy.css'

function PrivacyPolicy(){
    return(
        <div className='privacy-policy'>
            <Iframe url="https://docs.google.com/document/d/e/2PACX-1vRNBfd4SYVzBmHOqdGbIoaWsCqxHulzvI805EhdHvCq0gXaAghv6ODUgQ63mqooeOIYCWYWqZ-bbm9t/pub?embedded=true" />        
        </div>
    )
}

export default PrivacyPolicy;