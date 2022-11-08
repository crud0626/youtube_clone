import { useEffect, useRef, useState } from 'react';

const useTextOver = () => {
    // 해당 컨텐츠의 라인 수를 측정하기 위한 ref
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