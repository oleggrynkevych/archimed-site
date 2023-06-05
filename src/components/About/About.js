import './About.css';
import teamPhoto from '../../images/team-photo.png';
import Slider from "react-slick";
import firstMember from '../../images/first-member.png';
import secondMember from '../../images/second-member.png';
import quotesIcon from '../../images/quotes-icon.svg';
import Carousel from '../Services/Carousel/Carousel';
import whiteOne from '../../images/white-1.png';
import whiteTwo from '../../images/white-2.png';
import whiteThree from '../../images/white-3.png';

function About() {

    const settings = {
        dots: false,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return (
        <div className="about-page">
            <div className="about-page-container">
                <div className="about-page-header">
                    <div className="about-page-header-text">
                        <span>Руйнуємо пострадянські стереотипи і демонструємо всьому світу, що наша країна має величезний потенціал</span>
                        <span>мета</span>
                        <span>відкриваєм двері в Україну міжнародним виробникам товарів для охорони здоров'я</span>
                    </div>
                    <div className="about-page-header-photo">
                        <img src={teamPhoto} alt='Team Photo'></img>
                    </div>
                </div>

                <div className="about-page-main">
                    <span className="about-page-main-first-text">Архімед не є класичним дистрибутором, що претендує на маржинальність</span>
                    <div className="about-page-main-second-text">
                        <span>Ми – сервісна компанія, яка реалізує представницькі функції і здійснює експертну допомогу для іноземних виробників ліків, медичних виробів і косметичних засобів, забезпечуючи супровід повного життєвого циклу товару на ринку.</span>
                        <div>кодекс ділової етики</div>
                    </div>
                    <div className="about-page-main-special">
                        <div className="about-page-special-first-text">
                            <span>команда</span>
                            <span>Нами рухає інтерес до всього, що ми робимо</span>
                        </div>
                        <span className="about-page-special-second-text">Ми прагнемо формувати команду виключно з захоплених людей, упереджених до спільної справи і вміють досягати мети</span>
                    </div>
                    <div className='white-one'>
                        <img src={whiteOne}/>
                    </div>
                    <div className='white-two'>
                        <img src={whiteTwo}/>
                    </div>
                    <div className='white-three'>
                        <img src={whiteThree}/>
                    </div>

                </div>
                
                <div className='about-page-slider'>
                    <Slider {...settings}>
                        <SliderTeamMember
                            src={firstMember}
                            quote={'Вища освіта в сфері метрології, стандартизації і сертифікації та другу вищу фінансово-економічну освіту. Активна участь в міжнародних конгресах, семінарах, підготовка тематичних публікацій для спеціалізованих видань. Досвід роботи в даній сфері більше 8 років. Знання регуляторного законодавства України і ЄС.'}
                            name={'Євгенія\nАндрущенко'}
                            position = {'Директор з розвитку бізнесу'}
                        />

                        <SliderTeamMember
                            src={secondMember}
                            quote={'Голова робочої групи виробників медичних виробів і обладнання Американської торгової палати в Україні. 11 років досвіду в сфері фармацевтичного і медичного права. Постійний учасник і голова експертних і робочих груп при Міністерсві та відомствах України в питаннях регуляторних особливостей обігу лікарських засобів та медичних виробів в Україні. Більше 50 публікацій у профільних медіа.'}
                            name={'Микола\nРоманьок'}
                            position = {'Директор'}
                        />
                    </Slider>  
                </div>  

                <div className='about-page-carousel'>
                    <Carousel textTitle={'наші послуги'}/> 
                </div>           
            </div>
        </div>
    )
}

function SliderTeamMember (props) {
    return(
        <div className='slider-team-member'>
            <div className='slider-team-member-photo'>
                <img src={props.src}/>
            </div>
            <div className='slider-team-member-content'>
                <div className='slider-team-member-comment'>
                    <img src={quotesIcon}/>
                    <span>{props.quote}</span>
                </div>
                <div className='slider-team-member-person'>
                    <span>{props.name}</span>
                    <span>{props.position}</span>
                </div>
            </div>
        </div>
    )
}

export default About;