import React, { memo } from 'react';

const Icon = memo(({ def, w=24, h=24 }) => {
    return (
        <div style={{width: w, height: h}} className="icon_container">
            <svg>
                <path d={def}></path>
            </svg>
        </div>
    );
});

export default Icon;