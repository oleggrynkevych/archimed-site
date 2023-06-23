import mainLogo from '../../images/logo.svg';
import searchIcon from '../../images/search-icon.svg';
import downIcon from '../../images/down-icon.svg';
import globeIcon from '../../images/globe-icon.svg';
import closeIcon from '../../images/close-icon.svg';
import menuIcon from '../../images/menu-icon.svg';
import './Header.css';
import React, {useState, useEffect, useRef} from 'react';
import { Link, useMatch, useResolvedPath, useLocation} from 'react-router-dom';
import useScrollDirection from '../../hooks/useScrollDirection';
import classNames from 'classnames';




function Header () {
    const scrollDirection = useScrollDirection();



    const servicePagePath = '/servicepage';
    const servicesPath = '/services';
    const secondNavItem = useRef();
    const location = useLocation();
    const isServicePagePath = location.pathname === servicePagePath;
    const isServicesPath = location.pathname === servicesPath;
   
    useEffect(() => {
        if (isServicePagePath) {
          secondNavItem.current.classList.add('active');
        } else if (isServicesPath){
          secondNavItem.current.classList.add('active');
        } else {
          secondNavItem.current.classList.remove('active');
        }
    
        return () => {
          secondNavItem.current.classList.remove('active');
        };
      }, [isServicePagePath, isServicesPath]);
    

    const [open, setOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

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
            <CustomLink to="/" onClick={() => setOpenMenu(!openMenu)}>
              Головна
            </CustomLink>
            <CustomLink
              ref={secondNavItem}
              to="/services"
              onClick={() => setOpenMenu(!openMenu)}
            >
              Послуги
            </CustomLink>
            <CustomLink to="/about" onClick={() => setOpenMenu(!openMenu)}>
              Про нас
            </CustomLink>
            <CustomLink to="/contacts" onClick={() => setOpenMenu(!openMenu)}>
              Контакти
            </CustomLink>
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
              onClick={() => setOpen(!open)}
            >
              <img src={globeIcon} alt="Globe Icon" />
              <span>UA</span>
              <img
                className={classNames('down-arrow', { active: open })}
                src={downIcon}
                alt="Down Arrow"
              />
            </div>
            <div className={dropdownMenuClass}>
              <ul>
                <DropdownItem text={'UA'} />
                <DropdownItem text={'EN'} />
                <DropdownItem text={'RU'} />
              </ul>
            </div>
          </div>
        </div>
        <img
          className={menuIconClass}
          src={menuIcon}
          alt="Menu Icon"
          onClick={() => setOpenMenu(!openMenu)}
        ></img>
        <img
          className={closeIconClass}
          src={closeIcon}
          alt="Close Icon"
          onClick={() => setOpenMenu(!openMenu)}
        ></img>
      </div>
    </header>
    )
}

const CustomLink = React.forwardRef(({ to, children, ...props }, ref) => {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true})

    const liClass = classNames({ active: isActive });
  
    return (
      <li ref={ref} className={liClass}>
        <Link to={to} {...props}>{children}</Link>
      </li>
    );
  });

function DropdownItem (props) {
    return(
        <li className='dropdown-item'>
            <a>{props.text}</a>
        </li>
    )
}

export default Header;