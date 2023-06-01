 import './ServicesBlock.css';
 import React, { useRef, useEffect, useState } from 'react';
 import third3d from '../../../../images/3D-object-3.png';

 const ServicesBlock = function ({ innerRef }) {

  const containerRef = useRef(null);
  const elementRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const containerRect = containerRef.current.getBoundingClientRect();

      if (
        containerRect.top <= 0 &&
        containerRect.bottom >= elementRef.current.offsetHeight
      ) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

    return (
        <section className='services-block' ref={innerRef}>
            <div className={`services-block-container ${isFixed? 'end-flex' : ''}`} ref={containerRef}>
                <div className='third-3d-second'>
                    <img src={third3d}></img>
                </div>
                <h3 className={isFixed ? 'fixed' : ''} ref={elementRef}>Наші послуги</h3>
                <div className='services-wrapper'>
                    <ServiceItem number={'01'} name={'Оцінка відповідності медичних виробів'}/>
                    <ServiceItem number={'01'} name={'Оцінка відповідності медичних виробів'}/>
                    <ServiceItem number={'01'} name={'Оцінка відповідності медичних виробів'}/>
                    <ServiceItem number={'01'} name={'Оцінка відповідності медичних виробів'}/>
                    <ServiceItem number={'01'} name={'Оцінка відповідності медичних виробів'}/>
                    <ServiceItem number={'01'} name={'Оцінка відповідності медичних виробів'}/>
                    <ServiceItem number={'01'} name={'Оцінка відповідності медичних виробів'}/>
                    <ServiceItem number={'01'} name={'Оцінка відповідності медичних виробів'}/>
                    <ServiceItem number={'01'} name={'Оцінка відповідності медичних виробів'}/>
                    <ServiceItem number={'01'} name={'Оцінка відповідності медичних виробів'}/>
                </div>
            </div>
        </section>
    )  
 }

 function ServiceItem({...props}){
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <a 
            href='/servicepage'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={`service-item ${isHovered ? 'hovered' : ''}`}>
                <span>{props.number}</span>
                <h4>{props.name}</h4>
                <div className='service-item-link'>
                    <span >дізнатись більше</span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.89791 13.5218L4.54436 13.8754L5.25146 14.5825L5.60502 14.2289L4.89791 13.5218ZM13.105 6.72892C13.3003 6.53366 13.3003 6.21707 13.105 6.02181C12.9098 5.82655 12.5932 5.82655 12.3979 6.02181L13.105 6.72892ZM5.60502 14.2289L13.105 6.72892L12.3979 6.02181L4.89791 13.5218L5.60502 14.2289Z" fill="currentColor"/>
                        <path d="M5.25146 6.37537H12.7515V13.8754" stroke="currentColor" strokeLinecap="square"/>
                    </svg>
                </div>
            </div>
        </a>
    )
}

 export default ServicesBlock;