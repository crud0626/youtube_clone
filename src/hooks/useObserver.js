import { useRef } from 'react';

const useObserver = (callbackFn) => {
    const targetRef = useRef();
    let observer;

    const setObserver = () => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
    
        observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                catchObserver();
            }
        }, options);

        observer.observe(targetRef.current);
    }

    const catchObserver = () => {
        observer.disconnect();
        callbackFn();
    }

    return [targetRef, setObserver];
};

export default useObserver;