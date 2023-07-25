import { useLocation } from 'react-router-dom';
import useScrollToTop from '../hooks/useScrollToTop';
import { useEffect } from 'react';

function ScrollToTopOnPageChange() {
    const location = useLocation();
    const scrollToTop = useScrollToTop();
  
    useEffect(() => {
      scrollToTop({ block: 'start' });
    }, [location.pathname]);
  
    return null;
  }

  export default ScrollToTopOnPageChange;