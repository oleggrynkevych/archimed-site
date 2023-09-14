import { useRef, useEffect} from 'react';

function usePreviousURL(value) {
    const ref = useRef();
    
    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

export default usePreviousURL;