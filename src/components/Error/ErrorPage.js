import './ErrorPage.css'
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ErrorPage() {
    const { t, i18n } = useTranslation();

    return(
        <div className='error-page'>
            <h2>404</h2>
            <div className='search-no-results'>
                <Link to={`/${i18n.language}/`}>
                    <button>
                        <span>{t('to_main')}</span>
                    </button>
                </Link>
                <Link to={`/${i18n.language}/contacts`}>
                    <button>
                        <span>{t('contacts_page')}</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ErrorPage;