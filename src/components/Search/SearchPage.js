import './SearchPage.css';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import SearchItem from './SearchItem'
import { useTranslation } from 'react-i18next';
import { useQuery, gql } from '@apollo/client';
import classnames from 'classnames';

const SERVICES = gql`
    query GetServices ($locale: I18NLocaleCode) {
        services (locale: $locale) {
            data {
                id
                attributes {
                    Title,
                    Order,
                    Description 
                    slug
                }
            }
        }
    }
`

function SearchPage () {
    const [inputValue, setInputValue] = useState('');
    const [displayedValue, setDisplayedValue] = useState('');
    const [filteredServices, setFilteredServices] = useState([]);

    const { t, i18n } = useTranslation();
    const locale = i18n.language === 'ua' ? 'uk' : i18n.language;

    const location = useLocation();
    const navigate = useNavigate();

    const {loading, error, data} = useQuery(SERVICES, {
        variables: { locale: locale }
    });

    const modifySearchTerm = (term) => {
        if (term.length >= 6) {
            return term.slice(0, -3);
        }
        return term;
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const newInputValue = searchParams.get('search') || '';
        setInputValue(newInputValue);
        setDisplayedValue(newInputValue);

        if (data && data.services && data.services.data) {
            const searchTerms = displayedValue.trim().toLowerCase().split(' ');

            const filtered = data.services.data.filter(service => {
                const title = service.attributes.Title.toLowerCase();
                console.log(data);
                const description = service.attributes.Description.toLowerCase();

                const modifiedSearchTerms = searchTerms.map(modifySearchTerm);

                return modifiedSearchTerms.every(modifiedTerm =>
                    title.includes(modifiedTerm) || description.includes(modifiedTerm)
                );
            });

            setFilteredServices(filtered);
        }
    }, [location.search, data, displayedValue])

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearchClick = () => {
        navigate(`?search=${inputValue}`);
        setDisplayedValue(inputValue);
    };

    if(loading) return <p></p>
    if(error) return <p></p>

    const containerClasses = classnames('search-page', {
        empty: displayedValue.trim() !== '' && filteredServices.length === 0
    });

    return(
        <div className={containerClasses}>
            <div className='search-page-container'>
                <div className='search-page-input'>
                    <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21L15 15M17 10C17 10.9193 16.8189 11.8295 16.4672 12.6788C16.1154 13.5281 15.5998 14.2997 14.9497 14.9497C14.2997 15.5998 13.5281 16.1154 12.6788 16.4672C11.8295 16.8189 10.9193 17 10 17C9.08075 17 8.1705 16.8189 7.32122 16.4672C6.47194 16.1154 5.70026 15.5998 5.05025 14.9497C4.40024 14.2997 3.88463 13.5281 3.53284 12.6788C3.18106 11.8295 3 10.9193 3 10C3 8.14348 3.7375 6.36301 5.05025 5.05025C6.36301 3.7375 8.14348 3 10 3C11.8565 3 13.637 3.7375 14.9497 5.05025C16.2625 6.36301 17 8.14348 17 10Z" stroke="#042336" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <input 
                            value={inputValue}
                            onChange={handleInputChange}
                            type='text'
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleSearchClick();
                                }
                            }}
                        >
                        </input>
                    </div>
                    <button className='search-button' onClick={handleSearchClick}><span>{t('search-button')}</span></button>
                </div>

                <div className='search-result-text'>
                    {displayedValue.trim() !== '' && filteredServices.length > 0 ? (
                        <>
                            <h2>{t('search_results')}</h2>
                            <span>"{displayedValue}"</span>
                        </>
                    ) : (
                        <>
                            <h2>{t('empty_search_p1')} “{displayedValue}”{t('empty_search_p2')}</h2>
                        </>
                    )}
                </div>

                <div className='search-results'>
                    {displayedValue.trim() !== '' && filteredServices.length > 0 ? (
                        filteredServices.map(service => (
                            <SearchItem 
                                key={service.id}
                                title={service.attributes.Title}
                                description={service.attributes.Description}
                                slug={service.attributes.slug}
                            />
                        ))
                    ) : (
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
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchPage;