import './Header.css';
import closeSearch from '../../images/close-icon.svg'
import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const SearchInput = forwardRef(({ active, setActive }, ref) => {
    const handleSearchActiveClick = () => {
        setActive(false);
        ref.current.value = '';
    };

    const searchInputClasses = classNames('search-input', { active });
    const searchInputContainerClasses = classNames('search-input-container', { active });

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const handleSearchClick = () => {
        const inputValue = document.getElementById('search-input').value;
        const url = `/${i18n.language}/search-page?search=${encodeURIComponent(inputValue)}`;
        navigate(url);
        setActive(false);
        ref.current.value = '';
    };

    return(
        <div className={searchInputClasses} onClick={handleSearchActiveClick}>
            <div className={searchInputContainerClasses} onClick={e => e.stopPropagation()}>
                <div className='input-container'>
                    <input
                        ref={ref}
                        id='search-input'
                        type='text'
                        placeholder={t('search-question')}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSearchClick();
                            }
                        }}
                    ></input>

                    {/* <Link to={`/${i18n.language}/search-page`}> */}
                        <button className='search-button' onClick={handleSearchClick}>
                            <span>{t('search-button')}</span>
                        </button>
                    {/* </Link> */}

                    <button className='search-close-button' onClick={handleSearchActiveClick}>
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.96582 3.7334L12.9814 12.2187" stroke="#042336" strokeLinecap="square" strokeLinejoin="round"/>
                            <path d="M3.96582 12.2666L12.9814 3.78132" stroke="#042336" strokeLinecap="square" strokeLinejoin="round"/>
                            <path d="M3.96582 12.2666L12.9814 3.78132" stroke="#042336" strokeLinecap="square" strokeLinejoin="round"/>
                        </svg>
                        <span>{t('search-close')}</span>
                    </button>

                    <img
                        className='search-close-icon'
                        src={closeSearch}
                        alt="Close Search"
                        onClick={handleSearchActiveClick}
                    ></img>
                </div>
            </div>
        </div>
    )
});

export default SearchInput