import { t } from "i18next";
import ServicesBlock from "../Home/HomeComponents/ServicesBlock/ServicesBlock";
import './Services.css';

function Services() {
    return (
        <div className="services-wrapper">
            <h2>{t('services_title')}</h2>
            <ServicesBlock />
        </div>
    )
}

export default Services;