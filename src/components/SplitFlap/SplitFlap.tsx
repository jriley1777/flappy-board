import React from 'react';
import SplitFlapGrid from '../SplitFlapGrid/SplitFlapGrid';

const SplitFlap: React.FC = () => {
    // const renderText = () => text.split("").map(letter => {
    //     return <SplitFlapItem item={letter} />
    // })
    return (
        <SplitFlapGrid>
            {/* { renderText() } */}
        </SplitFlapGrid>
    )
};

export default SplitFlap;