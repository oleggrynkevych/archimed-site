import { useState } from "react";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ServiceItem({...props}){
    const [isHovered, setIsHovered] = useState(false);

    const { i18n , t } = useTranslation();


    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <Link 
            to={`/${i18n.language}/services/${props.id}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={`service-item ${isHovered ? 'hovered' : ''}`}>
                <div className='service-item-info'>
                    <span>{props.number}</span>
                    <h4>{props.name}</h4>
                </div>
                <div className='service-item-link'>
                    <span >{t('learn_more')}</span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.89791 13.5218L4.54436 13.8754L5.25146 14.5825L5.60502 14.2289L4.89791 13.5218ZM13.105 6.72892C13.3003 6.53366 13.3003 6.21707 13.105 6.02181C12.9098 5.82655 12.5932 5.82655 12.3979 6.02181L13.105 6.72892ZM5.60502 14.2289L13.105 6.72892L12.3979 6.02181L4.89791 13.5218L5.60502 14.2289Z" fill="currentColor"/>
                        <path d="M5.25146 6.37537H12.7515V13.8754" stroke="currentColor" strokeLinecap="square"/>
                    </svg>
                </div>
            </div>
        </Link>
    )
}

export default ServiceItem;