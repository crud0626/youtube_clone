import { useState } from "react";

const useResizeObserver = (conditionSize) => {
    const [isSmall, setIsSmall] = useState(false);
    const body = document.querySelector("body");
    let timer;
    
    const observer = new ResizeObserver((entries) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            for (let entry of entries) {
                entry.contentRect.width > conditionSize 
                ? setIsSmall(false) 
                : setIsSmall(true);
            }
        }, 200);
    });

    observer.observe(body);

    return isSmall;
};

export default useResizeObserver;