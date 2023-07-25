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
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';
import { languages } from '../../languages';




function Header () {
    const { t } = useTranslation();
    const scrollDirection = useScrollDirection();

    const secondNavItem = useRef();
    const location = useLocation();
    const isActiveServicePage = location.pathname.startsWith('/services/');

    const currentLanguageCode = cookies.get('i18next') || 'ua';
    const currentLanguage = languages.find(l => l.code === currentLanguageCode);

    useEffect(()=> {
      document.title = t('app_title')
    },[currentLanguage, t])

    useEffect(() => {
      if (isActiveServicePage) {
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
    

    const [open, setOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const handleLinkClick = () => {
      setOpenMenu(!openMenu);
    };

    const handleDropdownClick = () => {
      setOpen(!open);
    };

    let dropdownRef = useRef();

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
      <header className={`header ${ scrollDirection === "down" ? "hide" : "show"}`}>
        <div className="header-container">
          <Link to="/">
            <div className="logo-wrapper">
              <img src={mainLogo} alt="Archimed Logo" />
            </div>
          </Link>
        <nav className={navClass}>
        <ul>
          {dataNav.map((item, index) => (
            <CustomLink
              key={index}
              to={item.to}
              ref={index === 1 ? secondNavItem : null}
              onClick={handleLinkClick}
            >
              {t(item.text)}
            </CustomLink>
          ))}
        </ul>
          <div className="language-switch">
            <span>UA</span>
            <div className="line"></div>
            <span>EN</span>
            <div className="line"></div>
            <span>RU</span>
          </div>
        </nav>
        <div className="right-menu">
          <img src={searchIcon} alt="Search Icon" />
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
                    onClick={() => i18next.changeLanguage(code)}
                    key={country_code} 
                    text={code} />
                ))}
              </div>
            </div>
          </div>
        </div>
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
    </header>
    )
}


export default Header;