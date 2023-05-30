import mapIcon from '../../images/map-icon.svg';

import './Footer.css';

function Footer () {
    const scrollToTop = () =>{
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
        });
      };

    return (
        <footer>
            <div className='footer-container'>
                <div className='footer-head'>
                    <span>Архімед — ваш торговий представник</span>
                    <div onClick={scrollToTop}>
                    <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.25 24.25V25H14.75V24.25H16.25ZM14.75 6.75C14.75 6.33579 15.0858 6 15.5 6C15.9142 6 16.25 6.33579 16.25 6.75H14.75ZM14.75 24.25V6.75H16.25V24.25H14.75Z" fill="currentColor"/>
                        <path d="M20.5 11.75L15.5 6.75L10.5 11.75" stroke='currentColor' strokeWidth="1.5" strokeLinecap="square"/>
                    </svg>
                    </div>
                </div>
                <div className='footer-main'>
                    <div className='footer-site-info'>
                        <SiteInfoItem href={'mailto:mail@archimed.in.ua'} target={"_blank"} firstText={'пошта'} secondText={'mail@archimed.in.ua'}/>
                        <SiteInfoItem href={'tel:380442325252'} target={"_blank"} firstText={'телефон'} secondText={'+380 (44) 232-52-52'}/>
                        <SiteInfoItem 
                            href={'https://www.google.com/maps/place/%D0%A2%D0%9E%D0%92+%22%D0%90%D1%80%D1%85%D1%96%D0%BC%D0%B5%D0%B4+%D0%9C%D0%B5%D0%B4%D1%96%D0%BA%D0%B0%D0%BB%22/@50.4705986,30.5185406,18z/data=!4m6!3m5!1s0x40d4d3f7f5a65159:0x337c2360967c3ed3!8m2!3d50.470532!4d30.519643!16s%2Fg%2F11h4qrnrfh?entry=ttu'} 
                            target={"_blank"}
                            firstText={'адреса'} 
                            secondText={'04071, м. Київ, вул. Верхній Вал, 64'}/>
                        <div className='footer-map'>
                            <img src={mapIcon} alt="Map Icon"></img>
                            <a 
                                href={'https://www.google.com/maps/place/%D0%A2%D0%9E%D0%92+%22%D0%90%D1%80%D1%85%D1%96%D0%BC%D0%B5%D0%B4+%D0%9C%D0%B5%D0%B4%D1%96%D0%BA%D0%B0%D0%BB%22/@50.4705986,30.5185406,18z/data=!4m6!3m5!1s0x40d4d3f7f5a65159:0x337c2360967c3ed3!8m2!3d50.470532!4d30.519643!16s%2Fg%2F11h4qrnrfh?entry=ttu'}
                                target="_blank"
                            >Дивитись в картах Google</a>
                        </div>
                    </div>

                    <div className='footer-nav-and-socmedia'>
                        <div className='footer-nav'>
                            <span className='footer-subtitle'>Навігація</span>
                            <ul>
                                <CustomLink href='/'>Головна</CustomLink>
                                <CustomLink href='/services'>Послуги</CustomLink>
                                <CustomLink href='/about'>Про нас</CustomLink>
                                <CustomLink href='/contacts'>Контакти</CustomLink>
                                <CustomLink href='https://archimed.in.ua/uk/vakansii/' target="_blank">Вакансії</CustomLink>
                                <CustomLink href='https://hartmann24.com.ua/' target="_blank">Інтернет-магазин</CustomLink>
                            </ul>
                        </div>
                        <div className='footer-socmedia'>
                            <span className='footer-subtitle'>соціальні мережі</span>
                            <ul>
                                <SocialIcon href='/'>Twitter</SocialIcon>
                                <SocialIcon href='/'>Facebook</SocialIcon>
                                <SocialIcon href='/'>Instagram</SocialIcon>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='footer-bottom'>
                    <span>© Архімед 2018. Всі права захищені</span>
                    <a href='/'>Політика конфіденційності</a>
                </div>
                <div></div>
            </div>
        </footer>
    )
}

function SiteInfoItem (props) {
    return(
       <div>
            <span>{props.firstText}</span>
            <a href={props.href} target={props.target}>{props.secondText}</a>
       </div>
    )
}

function CustomLink({href, children, ...props}){

    return (
        <li>
            <a href={href} {...props}>{children}</a>
        </li>
    )
}

function SocialIcon({href, children, ...props}){

    return (
        <li>
            <a href={href} {...props}>{children}</a>
        </li>
    )
}

export default Footer;