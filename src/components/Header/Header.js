import mainLogo from '../../images/logo.svg';
import searchIcon from '../../images/search-icon.svg';
import downIcon from '../../images/down-icon.svg';
import globeIcon from '../../images/globe-icon.svg';
import closeIcon from '../../images/close-icon.svg';
import menuIcon from '../../images/menu-icon.svg';
import './Header.css';
import React, {useState, useEffect, useRef} from 'react';
import { Link, useMatch, useResolvedPath} from 'react-router-dom';


function Header () {
    const servicePagePath = '/servicepage';
    const secondNavItem = useRef();
    let path = window.location.pathname;

    useEffect(() => {
        if (path === servicePagePath) {
          secondNavItem.current.classList.add('active');
        }
    }, [path, servicePagePath]);

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

    return (
        <header>
            <div className='header-container'>
                <div className='logo-wrapper'>
                    <img src={mainLogo} alt="Archimed Logo" />
                </div>
                <nav className={`nav ${openMenu? 'active' : 'inactive'}`}>
                    <ul>
                        <CustomLink to='/archimed-site' onClick={() => {setOpenMenu(!openMenu)}}>Головна</CustomLink>
                        <CustomLink ref={secondNavItem} to='/services' onClick={() => {setOpenMenu(!openMenu)}}>Послуги</CustomLink>
                        <CustomLink to='/about' onClick={() => {setOpenMenu(!openMenu)}}>Про нас</CustomLink>
                        <CustomLink to='/contacts' onClick={() => {setOpenMenu(!openMenu)}}>Контакти</CustomLink>
                    </ul>
                    <div className='language-switch'> 
                        <span>UA</span>
                        <div className='line'></div>
                        <span>EN</span>
                        <div className='line'></div>
                        <span>RU</span>
                    </div>
                </nav>
                <div className='right-menu'>
                    <img src={searchIcon} alt="Search Icon" />
                    <div className='dropdown-container' ref={dropdownRef}>
                        <div className={`dropdown-trigger ${open? 'active' : 'inactive'}`} onClick={() => {setOpen(!open)}}>
                            <img src={globeIcon} alt="Globe Icon"/>
                            <span>UA</span>
                            <img className={`down-arrow ${open? 'active' : 'inactive'}`} src={downIcon} alt="Down Arrow"/>
                        </div>
                        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
                            <ul>
                                <DropdownItem text={'UA'}/>
                                <DropdownItem text={'EN'}/>
                                <DropdownItem text={'RU'}/>
                            </ul>
                        </div>
                    </div>
                </div>
                <img className={`menu-icon ${openMenu? 'active' : 'inactive'}`} src={menuIcon} alt="Menu Icon" onClick={() => {setOpenMenu(!openMenu)}}></img>
                <img className={`close-icon ${openMenu? 'active' : 'inactive'}`} src={closeIcon} alt="Close Icon" onClick={() => {setOpenMenu(!openMenu)}}></img>
            </div>
        </header>
    )
}

const CustomLink = React.forwardRef(({ to, children, ...props }, ref) => {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
  
    return (
      <li ref={ref} className={isActive ? 'active' : ''}>
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