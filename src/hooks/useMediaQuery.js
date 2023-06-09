import {useState, useEffect} from 'react';

export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
  
    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      if (media.addListener) {
        media.addListener(listener);
      } else {
        media.addEventListener("change", listener);
      }
      return () => {
        if (media.removeListener) {
          media.removeListener(listener);
        } else {
          media.removeEventListener("change", listener);
        }
      };
    }, [matches, query]);
  
    return matches;
  };