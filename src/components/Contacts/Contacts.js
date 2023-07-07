import ContactsBlock from "../Home/HomeComponents/ContactsBlock/ContactsBlock";
import './Contacts.css';

function Contacts() {
    const commonStyle = {
        backgroundColor: '#f5f5f5',
    }

    return (
        <div className='contacts-page'>
            <ContactsBlock commonStyle={commonStyle}/>
        </div>
    )
}

export default Contacts;