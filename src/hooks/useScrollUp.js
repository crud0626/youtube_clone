import { useEffect } from 'react';

const useScrollUp = (deps) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, deps);
};

export default useScrollUp;