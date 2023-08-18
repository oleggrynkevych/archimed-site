import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SearchItem (props) {
    const { i18n , t } = useTranslation();

    return(
        <Link to={`/${i18n.language}/services/${props.id}`}>
            <div className='search-item'>
                <span>{t('single_service')}</span>
                <h3>{props.title}</h3>
                <p>{props.description.substring(0, 160)}...</p>
            </div>
        </Link>
    )
}

export default SearchItem;