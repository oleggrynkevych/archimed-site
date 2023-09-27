import { t } from "i18next";
import ServicesBlock from "../Home/HomeComponents/ServicesBlock/ServicesBlock";
import './Services.css';

function Services(props) {

    return (
        <div className="services-wrapper">
            <h2>{t('services_title_p1')} {props.services.length} {t('services_title_p2')}</h2>
            <ServicesBlock/>
        </div>
    )
}

export default Services;