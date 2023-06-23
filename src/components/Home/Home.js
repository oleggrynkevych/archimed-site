import React, { useRef } from 'react';
import FirstSection from "./HomeComponents/FirstSection/FirstSection";
import ServicesBlock from "./HomeComponents/ServicesBlock/ServicesBlock";
import ContactsBlock from './HomeComponents/ContactsBlock/ContactsBlock';
import Partners from './HomeComponents/Partners/Partners';

function Home() {
    const secondComponentRef = useRef(null);

    const scrollToNextComponent = () => {
        secondComponentRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const commonStyle = {
        backgroundColor: '#042336',
        color: '#F5F5F5'
    }

    return (
        <div style={{marginTop: '-64px'}}>
            <FirstSection scrollToNextComponent={scrollToNextComponent}/>
            <ServicesBlock innerRef={secondComponentRef}/>
            <Partners/>
            <ContactsBlock commonStyle={commonStyle}/>
        </div>
    )
}

export default Home;