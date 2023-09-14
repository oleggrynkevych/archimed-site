import { useLocation } from 'react-router-dom';
import useScrollToTop from '../hooks/useScrollToTop';
import { useEffect, useRef } from 'react';
import usePreviousURL from '../hooks/usePreviousURL';

function ScrollToTopOnPageChange() {
    const location = useLocation();
    const scrollToTop = useScrollToTop();
    const prevLocation = usePreviousURL(location);
  
    useEffect(() => {
        if (prevLocation && getLanguageFromPath(prevLocation.pathname) === getLanguageFromPath(location.pathname)) {
            scrollToTop({ block: 'start' });
        }
    }, [location.pathname, prevLocation]);

    return null;
}



function getLanguageFromPath(path) {
    const match = path.match(/^\/([a-z]{2})\//);
    return match ? match[1] : null;
}

export default ScrollToTopOnPageChange;
