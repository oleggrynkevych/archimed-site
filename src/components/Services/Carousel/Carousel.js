import './Carousel.css';
import mainLogo from '../../../images/logo.svg';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Slider from 'react-slick';
import CarouselItem from './CarouselItem.js';
import { useTranslation } from 'react-i18next';

const SERVICES = gql`
    query GetServices ($locale: I18NLocaleCode) {
        services (locale: $locale, pagination: { start: 0, limit: 20 }) {
            data {
                id
                attributes {
                    Title,
                    TextForCarouselItem,
                    Order,
                    slug
                }
            }
        }
    }
`

function Carousel (props) {
    
   let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        initialSlide: 0,
        draggable: true,
        responsive: [
          {
            breakpoint: 1120,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: false,
              dots: false,
              draggable: true,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 2,
              draggable: true,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              draggable: true,
            }
          }
        ]
    };

    const { t, i18n } = useTranslation();
    const locale = i18n.language === 'ua' ? 'uk' : i18n.language;

    const {loading, error, data} = useQuery(SERVICES, {
      variables: { locale: locale }
    });
    
    const slugFromUrl = props.slug;

    if(loading) return <div style={{backgroundColor: '#F5F5F5', width: '100%', height: '200vh', position: 'relative'}}>
        <img src={mainLogo} alt={'Main Logo'} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50vh)'}}/>
      </div>
    if(error) return <p>{JSON.stringify(error)}</p>

    const sortedData = [...data.services.data].sort((a, b) => {
      return a.attributes.Order - b.attributes.Order;
    });

    return(
        <div className='carousel'>
            <div className='carousel-container'>
              <h5>{props.textTitle}</h5>
              <Slider {...settings}>
                {sortedData.map(service =>
                  service.attributes.slug !== slugFromUrl ? (
                    <CarouselItem 
                      key={service.id} 
                      title={service.attributes.Title} 
                      subtitle={service.attributes.TextForCarouselItem} 
                      slug={service.attributes.slug}
                    />
                  ) : null
                )}
              </Slider>
            </div>
        </div>
    )
}

export default Carousel;