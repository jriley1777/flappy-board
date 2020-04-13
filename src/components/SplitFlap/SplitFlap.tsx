import React from 'react';
import SplitFlapItem from '../SplitFlapItem/SplitFlapItem';
import SplitFlapGrid from '../SplitFlapGrid/SplitFlapGrid';

interface SFProps {
    text: string
}

const SplitFlap: React.FC<SFProps> = ({ text }) => {
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