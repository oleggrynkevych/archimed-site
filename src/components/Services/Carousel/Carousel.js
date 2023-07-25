import './Carousel.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Slider from 'react-slick';
import CarouselItem from './CarouselItem.js';

const SERVICES = gql`
    query GetServices {
        services {
            data {
                id
                attributes {
                    Title,
                    TextForCarouselItem,
                    Order
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

    const {loading, error, data} = useQuery(SERVICES);
    const idFromUrl = props.id;

    if(loading) return <p></p>
    if(error) return <p></p>

    const sortedData = [...data.services.data].sort((a, b) => {
      return a.attributes.Order - b.attributes.Order;
    });

    return(
        <div className='carousel'>
            <div className='carousel-container'>
              <h5>{props.textTitle}</h5>
              <Slider {...settings}>
              {sortedData.map(service =>
                service.id !== idFromUrl ? (
                  <CarouselItem 
                    key={service.id} 
                    title={service.attributes.Title} 
                    subtitle={service.attributes.TextForCarouselItem} 
                    id={service.id}
                  />
                ) : null
              )}
              </Slider>
            </div>
        </div>
    )
}

export default Carousel;