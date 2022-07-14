import { useEffect, useRef, useState } from 'react';

const useTextOver = () => {
    const targetRef = useRef();
    const [isTextOver, setIsTextOver] = useState(false);

    useEffect(() => {
        if (targetRef.current && targetRef.current.clientHeight < targetRef.current.scrollHeight) {
            setIsTextOver(true);
        }
    }, []);
    
    return [isTextOver, targetRef];
};

export default useTextOver;