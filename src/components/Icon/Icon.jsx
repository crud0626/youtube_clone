import React, { memo } from 'react';

const Icon = memo(({ def, w=24, h=24 }) => {
    return (
        <svg width={w} height={h}>
            <path d={def}></path>
        </svg>
    );
});

export default Icon;