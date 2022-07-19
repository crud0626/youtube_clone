import { useState } from "react";

const useResizeObserver = (conditionSize) => {
    const [isSmall, setIsSmall] = useState(false);
    const body = document.querySelector("body");
    
    const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
            entry.contentRect.width > conditionSize 
            ? setIsSmall(false) 
            : setIsSmall(true);
        }
    });

    observer.observe(body);

    return isSmall;
};

export default useResizeObserver;