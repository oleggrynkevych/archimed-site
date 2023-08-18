import mainLogo from '../../images/logo.svg';
import searchIcon from '../../images/search-icon.svg';
import downIcon from '../../images/down-icon.svg';
import globeIcon from '../../images/globe-icon.svg';
import closeIcon from '../../images/close-icon.svg';
import menuIcon from '../../images/menu-icon.svg';
import './Header.css';
import React, {useState, useEffect, useRef} from 'react';
import { Link, useLocation} from 'react-router-dom';
import useScrollDirection from '../../hooks/useScrollDirection';
import classNames from 'classnames';
import {dataNav} from './header-data.js';
import DropdownItem from './DropdownItem.js';
import CustomLink from './CustomLink.js';
import SearchInput from './SearchInput';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';
import { languages } from '../../languages';

function Header ({ i18n, navigate }) {

    const [open, setOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [searchInputActive, setSearchInputActive] = useState(false);
    
    const { t } = useTranslation();
    const scrollDirection = useScrollDirection();

    const secondNavItem = useRef();
    const inputRef = useRef();
    const location = useLocation();
    const isActiveServicePage = location.pathname.startsWith(`/${i18n.language}/services/`);
    const isActiveServices = location.pathname.startsWith(`/${i18n.language}/services`);

    const currentLanguageCode = cookies.get('i18next') || 'ua';
    const currentLanguage = languages.find(l => l.code === currentLanguageCode);

    useEffect(()=> {
      document.title = t('app_title')
    },[currentLanguage, t])


    const handleLanguageChange = (code) => {
      i18n.changeLanguage(code);
      const currentPath = location.pathname;
      const newPath = `/${code}${currentPath.substring(3)}`;
      navigate(newPath);
      setOpenMenu(!openMenu);
    };

    useEffect(() => {
      if (isActiveServicePage) {
        secondNavItem.current.classList.add('active');
      } else if (isActiveServices){
        secondNavItem.current.classList.add('active');
      } else {
        secondNavItem.current.classList.remove('active');
      }
        
      return () => {
        if (secondNavItem.current) {
          secondNavItem.current.classList.remove('active');
        }
      };
    }, [isActiveServicePage]);

    const handleLinkClick = () => {
      setOpenMenu(!openMenu);
    };

    const handleDropdownClick = () => {
      setOpen(!open);
    };

    const handleSearchClick = () => {
      setSearchInputActive(!searchInputActive);
      inputRef.current.value = '';
    };

    const handleSearchClickClose = () => {
      if(searchInputActive) {
        setSearchInputActive(false);
        inputRef.current.value = '';
      }
    };

    let dropdownRef = useRef();

    useEffect(() => {
      if (searchInputActive || openMenu) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
  
      return () => {
        document.body.style.overflow = 'unset';
      };
  }, [searchInputActive, openMenu]);

    useEffect(() => {
        let handler = (e) => {
            if(!dropdownRef.current.contains(e.target)){
                setOpen(false);        
            }
        };

        document.addEventListener('mousedown', handler); 

        return() => {
            document.removeEventListener('mousedown', handler); 
        }
    });

    const navClass = classNames('nav', {
        active: openMenu,
        inactive: !openMenu,
      });
    
      const dropdownTriggerClass = classNames('dropdown-trigger', {
        active: open,
        inactive: !open,
      });
    
      const dropdownMenuClass = classNames('dropdown-menu', {
        active: open,
        inactive: !open,
      });
    
      const menuIconClass = classNames('menu-icon', {
        active: openMenu,
        inactive: !openMenu,
      });
    
      const closeIconClass = classNames('close-icon', {
        active: openMenu,
        inactive: !openMenu,
      });

    return (
      <header className={`header ${ scrollDirection === "down" ? "hide" : "show"}`} onClick={handleSearchClickClose}>
        <div className="header-container">
          <Link to={`/${i18n.language}/`}>
            <div className="logo-wrapper">
              <img src={mainLogo} alt="Archimed Logo" />
            </div>
          </Link>
        <nav className={navClass}>
          <ul>
            {dataNav.map((item, index) => (
              <CustomLink
                key={index}
                to={`/${i18n.language}${item.to}`}
                ref={index === 1 ? secondNavItem : null}
                onClick={openMenu ? handleLinkClick : null}
              >
                {t(item.text)}
              </CustomLink>
            ))}
          </ul>
            <div className="language-switch">
              <span onClick={() => handleLanguageChange('ua')}>UA</span>
              <div className="line"></div>
              <span onClick={() => handleLanguageChange('en')}>EN</span>
              <div className="line"></div>
              <span onClick={() => handleLanguageChange('ru')}>RU</span>
            </div>
        </nav>
        <div className="right-menu">
          <img className='search-icon' src={searchIcon} alt="Search Icon" onClick={handleSearchClick}/>
          <div className="dropdown-container" ref={dropdownRef}>
            <div
              className={dropdownTriggerClass}
              onClick={handleDropdownClick}
            >
              <img src={globeIcon} alt="Globe Icon" />
              <span>{t('language_switcher')}</span>
              <img
                className={classNames('down-arrow', { active: open })}
                src={downIcon}
                alt="Down Arrow"
              />
            </div>
            <div className={dropdownMenuClass}>
              <div>
                {languages.map(({code, country_code}) => (
                  <DropdownItem 
                    onClick={() => handleLanguageChange(code)}
                    key={country_code} 
                    text={code} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='header-icons'>
            <img className='search-icon' src={searchIcon} alt="Search Icon" onClick={handleSearchClick}/>
            <img
              className={menuIconClass}
              src={menuIcon}
              alt="Menu Icon"
              onClick={handleLinkClick}
            ></img>
            <img
              className={closeIconClass}
              src={closeIcon}
              alt="Close Icon"
              onClick={handleLinkClick}
            ></img>
        </div>
      </div>

      <SearchInput ref={inputRef} active={searchInputActive} setActive={setSearchInputActive}/>
    </header>
    )
}


export default Header;